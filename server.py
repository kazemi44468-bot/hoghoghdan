#!/usr/bin/env python3
# Local-first backend for Iranian Legal Network. Python standard library only.
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
from urllib.parse import urlparse, parse_qs
import sqlite3, json, uuid, datetime, os, mimetypes, threading, webbrowser
from contextlib import contextmanager

ROOT = Path(__file__).resolve().parent
DATA = ROOT / "data"
DATA.mkdir(exist_ok=True)
DB = DATA / "legal_network.sqlite3"
HOST, PORT = "127.0.0.1", 8765

def connect():
    con = sqlite3.connect(DB)
    con.row_factory = sqlite3.Row
    con.execute("PRAGMA foreign_keys=ON")
    con.execute("PRAGMA journal_mode=WAL")
    return con

@contextmanager
def db():
    con = connect()
    try:
        yield con
        con.commit()
    except Exception:
        con.rollback()
        raise
    finally:
        con.close()

def init_db():
    with db() as con:
        con.executescript("""
        CREATE TABLE IF NOT EXISTS requests (
          id TEXT PRIMARY KEY,
          reference TEXT NOT NULL UNIQUE,
          role TEXT NOT NULL,
          role_label TEXT NOT NULL,
          name TEXT NOT NULL,
          contact TEXT NOT NULL,
          category TEXT NOT NULL,
          urgency TEXT NOT NULL DEFAULT 'عادی',
          subject TEXT NOT NULL,
          details TEXT NOT NULL,
          status TEXT NOT NULL DEFAULT 'جدید',
          assigned_to TEXT NOT NULL DEFAULT '',
          internal_note TEXT NOT NULL DEFAULT '',
          created_at TEXT NOT NULL,
          updated_at TEXT NOT NULL
        );
        CREATE INDEX IF NOT EXISTS idx_requests_created ON requests(created_at DESC);
        CREATE INDEX IF NOT EXISTS idx_requests_status ON requests(status);
        CREATE TABLE IF NOT EXISTS activity_log (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          request_id TEXT NOT NULL,
          action TEXT NOT NULL,
          description TEXT NOT NULL DEFAULT '',
          created_at TEXT NOT NULL,
          FOREIGN KEY(request_id) REFERENCES requests(id) ON DELETE CASCADE
        );
        """)

def now():
    return datetime.datetime.now().astimezone().isoformat(timespec="seconds")

def send_json(handler, data, status=200):
    raw = json.dumps(data, ensure_ascii=False).encode("utf-8")
    handler.send_response(status)
    handler.send_header("Content-Type", "application/json; charset=utf-8")
    handler.send_header("Content-Length", str(len(raw)))
    handler.send_header("Cache-Control", "no-store")
    handler.end_headers()
    handler.wfile.write(raw)

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def log_message(self, fmt, *args):
        print("[LOCAL]", fmt % args)

    def body(self):
        size = int(self.headers.get("Content-Length", "0"))
        if size > 1_000_000:
            raise ValueError("حجم درخواست بیش از حد مجاز است.")
        return json.loads(self.rfile.read(size).decode("utf-8") or "{}")

    def do_GET(self):
        path = urlparse(self.path).path
        if path == "/api/health":
            return send_json(self, {"ok": True, "database": str(DB.name), "mode": "local"})
        if path == "/api/requests":
            q = parse_qs(urlparse(self.path).query)
            status = q.get("status", [""])[0]
            search = q.get("q", [""])[0].strip()
            with db() as con:
                sql = "SELECT * FROM requests WHERE 1=1"
                args = []
                if status:
                    sql += " AND status=?"; args.append(status)
                if search:
                    sql += " AND (reference LIKE ? OR name LIKE ? OR subject LIKE ? OR contact LIKE ?)"
                    args.extend([f"%{search}%"]*4)
                sql += " ORDER BY created_at DESC"
                rows = [dict(x) for x in con.execute(sql, args).fetchall()]
                stats = {r["status"]: r["n"] for r in con.execute("SELECT status,COUNT(*) n FROM requests GROUP BY status")}
            return send_json(self, {"items": rows, "stats": stats, "total": len(rows)})
        if path.startswith("/api/requests/"):
            rid = path.rsplit("/", 1)[-1]
            with db() as con:
                row = con.execute("SELECT * FROM requests WHERE id=?", (rid,)).fetchone()
                if not row: return send_json(self, {"error":"درخواست پیدا نشد."},404)
                logs = [dict(x) for x in con.execute("SELECT * FROM activity_log WHERE request_id=? ORDER BY id DESC",(rid,))]
            return send_json(self, {"item":dict(row),"history":logs})
        return super().do_GET()

    def do_POST(self):
        path = urlparse(self.path).path
        try:
            data = self.body()
            if path == "/api/requests":
                required = ["role","roleLabel","name","contact","category","urgency","subject","details"]
                if any(not str(data.get(k,"")).strip() for k in required):
                    return send_json(self, {"error":"تکمیل همه فیلدهای ضروری الزامی است."},400)
                rid = str(uuid.uuid4())
                stamp = now()
                with db() as con:
                    count = con.execute("SELECT COUNT(*) FROM requests").fetchone()[0] + 1
                    ref = "HR-" + datetime.datetime.now().strftime("%y%m") + "-" + str(count).zfill(5)
                    con.execute("""INSERT INTO requests
                    (id,reference,role,role_label,name,contact,category,urgency,subject,details,status,created_at,updated_at)
                    VALUES(?,?,?,?,?,?,?,?,?,?, 'جدید',?,?)""",
                    (rid,ref,*[str(data[k]).strip() for k in required],stamp,stamp))
                    con.execute("INSERT INTO activity_log(request_id,action,description,created_at) VALUES(?,?,?,?)",
                                (rid,"ثبت درخواست","درخواست از درگاه عمومی ثبت شد.",stamp))
                return send_json(self, {"ok":True,"id":rid,"reference":ref,"message":"درخواست با موفقیت در پایگاه داده محلی ثبت شد."},201)
            if path.startswith("/api/requests/") and path.endswith("/update"):
                rid = path.split("/")[-2]
                allowed = {"status","assigned_to","internal_note"}
                updates = {k:str(v).strip() for k,v in data.items() if k in allowed}
                if not updates: return send_json(self,{"error":"موردی برای به‌روزرسانی ارسال نشده است."},400)
                if "status" in updates and updates["status"] not in ["جدید","در حال بررسی","نیازمند تکمیل اطلاعات","ارجاع‌شده","پذیرفته‌شده","مختومه","ردشده"]:
                    return send_json(self,{"error":"وضعیت انتخاب‌شده معتبر نیست."},400)
                stamp=now()
                with db() as con:
                    if not con.execute("SELECT 1 FROM requests WHERE id=?",(rid,)).fetchone():
                        return send_json(self,{"error":"درخواست پیدا نشد."},404)
                    updates["updated_at"]=stamp
                    sql="UPDATE requests SET "+", ".join(k+"=?" for k in updates)+" WHERE id=?"
                    con.execute(sql, list(updates.values())+[rid])
                    con.execute("INSERT INTO activity_log(request_id,action,description,created_at) VALUES(?,?,?,?)",
                                (rid,"به‌روزرسانی","اطلاعات درخواست توسط دبیرخانه تغییر کرد.",stamp))
                return send_json(self,{"ok":True})
            return send_json(self,{"error":"مسیر درخواست نامعتبر است."},404)
        except (ValueError, json.JSONDecodeError) as e:
            return send_json(self,{"error":str(e) or "داده ارسالی معتبر نیست."},400)
        except Exception as e:
            return send_json(self,{"error":"خطای داخلی: "+str(e)},500)

    def do_DELETE(self):
        path=urlparse(self.path).path
        if path.startswith("/api/requests/"):
            rid=path.rsplit("/",1)[-1]
            with db() as con:
                cur=con.execute("DELETE FROM requests WHERE id=?",(rid,))
                if not cur.rowcount:return send_json(self,{"error":"درخواست پیدا نشد."},404)
            return send_json(self,{"ok":True})
        return send_json(self,{"error":"مسیر نامعتبر است."},404)

if __name__ == "__main__":
    init_db()
    print("\nشبکه حقوق‌دانان ایران | سامانه محلی")
    print("نشانی: http://127.0.0.1:%s/pages/portal.html" % PORT)
    print("پایگاه داده:", DB)
    print("برای توقف، پنجره را ببندید یا Ctrl+C بزنید.\n")
    httpd = ThreadingHTTPServer((HOST,PORT),Handler)
    threading.Timer(1.0, lambda: webbrowser.open("http://127.0.0.1:%s/pages/portal.html" % PORT)).start()
    httpd.serve_forever()
