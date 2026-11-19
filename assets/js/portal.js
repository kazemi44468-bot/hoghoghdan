(()=>{
"use strict";
const KEY="hoghoghdan.portal.requests.v1";
const roles={client:"متقاضی خدمات حقوقی",lawyer:"وکیل و متخصص حقوقی",organization:"سازمان و کسب‌وکار",academic:"استاد و پژوهشگر",student:"دانشجو و کارآموز",beneficiary:"ذی‌نفع و متقاضی حمایت"};
const titles={client:"ثبت درخواست خدمات حقوقی",lawyer:"اعلام آمادگی همکاری تخصصی",organization:"درخواست همکاری سازمانی",academic:"پیشنهاد علمی و پژوهشی",student:"درخواست آموزشی و یادگیری",beneficiary:"درخواست حمایت و خدمات عام‌المنفعه"};
let activeRole="client";
const $=s=>document.querySelector(s);
const read=()=>{try{const value=JSON.parse(localStorage.getItem(KEY)||"[]");return Array.isArray(value)?value.filter(x=>x&&typeof x==="object"&&typeof x.reference==="string"):[]}catch{return[]}};
const write=x=>{try{localStorage.setItem(KEY,JSON.stringify(x));return true}catch{return false}};
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const dateOf=x=>x.created_at||x.createdAt||0;
const getServerItems=async()=>{
 const response=await fetch("/api/requests",{headers:{"Accept":"application/json","Cache-Control":"no-store"}});
 if(!response.ok)throw new Error("API "+response.status);
 const payload=await response.json();
 if(!payload||!Array.isArray(payload.items))throw new Error("پاسخ سرور معتبر نیست.");
 return payload.items;
};
const referenceOf=x=>x.reference||x.id||"";
function render(){
 const box=$("#saved-list");if(!box)return;
 const local=read();
 getServerItems().then(server=>{
  const refs=new Set(server.map(referenceOf));
  const items=[...server,...local.filter(x=>!refs.has(referenceOf(x)))];
  draw(items);
 }).catch(()=>draw(local));
 function draw(items){
  items.sort((a,b)=>new Date(dateOf(b)).getTime()-new Date(dateOf(a)).getTime());
  box.innerHTML=items.length?items.map(x=>{
   const date=dateOf(x)?new Date(dateOf(x)).toLocaleDateString("fa-IR"):"";
   const role=x.role_label||x.roleLabel||roles[x.role]||"";
   return '<article class="saved-item"><div><b>'+esc(x.subject)+'</b><small>'+esc(referenceOf(x))+' · '+esc(role)+' · '+esc(date)+' · '+esc(x.status)+'</small></div><button type="button" data-track="'+esc(referenceOf(x))+'">مشاهده وضعیت</button></article>';
  }).join(""):'<div class="empty-state">هنوز درخواستی در این مرورگر یا پایگاه داده محلی ثبت نشده است.</div>';
 }
}
async function track(ref){
 const out=$("#track-result");if(!out)return;
 const key=String(ref||"").trim().toLowerCase();
 if(!key){out.textContent="شماره پیگیری را وارد کنید.";out.classList.remove("success");return}
 let item=null;
 try{const items=await getServerItems();item=items.find(x=>referenceOf(x).toLowerCase()===key)||null}catch{}
 if(!item)item=read().find(x=>referenceOf(x).toLowerCase()===key)||null;
 if(!item){out.textContent="درخواستی با این شماره در پایگاه داده محلی یا حافظه این مرورگر پیدا نشد.";out.classList.remove("success");return}
 const date=dateOf(item)?new Date(dateOf(item)).toLocaleString("fa-IR"):"ثبت نشده";
 out.innerHTML='<strong>'+esc(referenceOf(item))+'</strong><span>وضعیت: '+esc(item.status)+'</span><span>تاریخ ثبت: '+esc(date)+'</span><span>موضوع: '+esc(item.subject)+'</span>';
 out.classList.add("success");
}
document.addEventListener("DOMContentLoaded",()=>{
 render();
 document.querySelectorAll("[data-role]").forEach(b=>b.addEventListener("click",()=>{
  activeRole=b.dataset.role;
  document.querySelectorAll("[data-role]").forEach(x=>x.classList.toggle("selected",x===b));
  $("#role-value").value=activeRole;
  $("#form-title").textContent=titles[activeRole]||titles.client;
  $("#request").scrollIntoView({behavior:"smooth",block:"start"});
 }));
 $("#portal-form").addEventListener("submit",async e=>{
  e.preventDefault();
  const f=e.currentTarget;if(!f.reportValidity())return;
  const d=new FormData(f);
  const payload={
   role:activeRole,roleLabel:roles[activeRole],
   name:String(d.get("name")||"").trim(),contact:String(d.get("contact")||"").trim(),
   category:String(d.get("category")||""),urgency:String(d.get("urgency")||"عادی"),
   subject:String(d.get("subject")||"").trim(),details:String(d.get("details")||"").trim()
  };
  let reference="",serverSaved=false;
  try{
   const response=await fetch("/api/requests",{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify(payload)});
   const result=await response.json().catch(()=>null);
   if(response.ok&&result&&result.reference){reference=result.reference;serverSaved=true}
   else if(response.status!==404&&response.status!==405){
    $("#form-status").textContent=(result&&result.error)||"ثبت درخواست در سرور محلی انجام نشد.";
    $("#form-status").classList.remove("success");return;
   }
  }catch{}
  if(!serverSaved){
   reference="DH-1405-"+String(Math.floor(100000+Math.random()*900000));
   const item={id:reference,reference,createdAt:Date.now(),...payload,roleLabel:roles[activeRole],status:"ثبت‌شده در این دستگاه",assignedTo:"",internalNote:""};
   const all=read();all.push(item);
   if(!write(all)){
    $("#form-status").textContent="ذخیره‌سازی انجام نشد. صفحه را از طریق سرور محلی اجرا کنید و مجوز ذخیره‌سازی مرورگر را بررسی کنید.";
    $("#form-status").classList.remove("success");return;
   }
  }
  f.reset();$("#role-value").value=activeRole;
  $("#form-status").textContent=serverSaved
   ?"درخواست با موفقیت در پایگاه داده محلی ثبت شد. شماره پیگیری: "+reference+"؛ این شماره را نگهداری کنید."
   :"سرور محلی در دسترس نبود؛ درخواست فقط در همین مرورگر ذخیره شد. شماره پیگیری: "+reference;
  $("#form-status").classList.add("success");
  render();$("#track-reference").value=reference;await track(reference);
 });
 $("#clear-form").addEventListener("click",()=>{
  $("#portal-form").reset();$("#role-value").value=activeRole;
  $("#form-status").textContent="فرم پاک شد.";$("#form-status").classList.remove("success");
 });
 $("#track-form").addEventListener("submit",e=>{e.preventDefault();track($("#track-reference").value)});
 $("#saved-list").addEventListener("click",e=>{
  const b=e.target.closest("[data-track]");if(!b)return;
  $("#track-reference").value=b.dataset.track;track(b.dataset.track);
 });
});
})();