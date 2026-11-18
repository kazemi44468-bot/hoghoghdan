#!/usr/bin/env python3
# Trigger update: download the 14 local legal-site images through GitHub Actions.
"""
دانلود ۱۱ تصویر مرتبط با موضوعات حقوقی برای وب‌سایت شبکه حقوق‌دانان
اجرا: python scripts/download_legal_images.py
نیازمندی: Python 3.9+ (بدون نصب کتابخانه جانبی)
"""
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.error import URLError, HTTPError
import time

ROOT = Path(__file__).resolve().parent.parent
DEST = ROOT / "assets" / "images" / "legal"

# تصاویر از مجموعه Unsplash؛ فایل‌ها به‌صورت محلی در مخزن ذخیره می‌شوند.
PHOTOS = [
    ("01-justice-scales.jpg", "photo-1589829085413-56de8ae18c73"),
    ("02-law-books.jpg", "photo-1505664194779-8beaceb93744"),
    ("03-courthouse.jpg", "photo-1589216532372-1c2a367900d9"),
    ("05-law-library.jpg", "photo-1521587760476-6c12a4b040da"),
    ("06-justice-statue.jpg", "photo-1575505586569-646b2ca898fc"),
    ("07-contract-signing.jpg", "photo-1450101499163-c8848c66ca85"),
    ("08-business-meeting.jpg", "photo-1517048676732-d65bc937f952"),
    ("11-handshake.jpg", "photo-1521791136064-7986c2920216"),
    ("12-constitution.jpg", "photo-1586339949216-35c2747cc36d"),
    ("13-office-law.jpg", "photo-1497366754035-f200968a6e72"),
    ("14-city-architecture.jpg", "photo-1486406146926-c627a92ad1ab"),
]

def download(filename: str, photo_id: str) -> bool:
    url = f"https://images.unsplash.com/{photo_id}?auto=format&fit=crop&w=1800&q=82"
    request = Request(url, headers={"User-Agent": "HoghoghDan-LegalSite-ImageFetcher/1.0"})
    target = DEST / filename
    try:
        with urlopen(request, timeout=35) as response:
            data = response.read()
            content_type = response.headers.get("Content-Type", "")
        if not content_type.startswith("image/") or len(data) < 12_000:
            raise ValueError(f"پاسخ تصویر معتبر نیست ({content_type}, {len(data)} bytes)")
        target.write_bytes(data)
        print(f"[OK] {filename} ({len(data) // 1024} KB)")
        return True
    except (HTTPError, URLError, TimeoutError, ValueError, OSError) as exc:
        print(f"[خطا] {filename}: {exc}")
        if target.exists():
            target.unlink()
        return False

def main() -> int:
    DEST.mkdir(parents=True, exist_ok=True)
    print(f"محل ذخیره: {DEST}")
    success = 0
    for filename, photo_id in PHOTOS:
        if download(filename, photo_id):
            success += 1
        time.sleep(0.4)
    print(f"\nنتیجه: {success} از {len(PHOTOS)} تصویر دانلود شد.")
    print("در صورت خطای شبکه، اسکریپت را دوباره اجرا کنید؛ فایل‌های موفق بازنویسی می‌شوند.")
    return 0 if success > 0 else 1

if __name__ == "__main__":
    raise SystemExit(main())
