(()=>{
'use strict';
const $=s=>document.querySelector(s);
const page=$('#page-content');
const storeKey='datar-demo-v1';
const seed={
requests:[
{id:'DT-1405-001',name:'شرکت توسعه آریا',type:'سازمان',subject:'بررسی و بازنگری قرارداد پیمانکاری',category:'قراردادها',status:'در حال بررسی',date:'۱۴۰۵/۰۸/۲۷',assignee:'مرکز قراردادها',priority:'عادی'},
{id:'DT-1405-002',name:'مریم رضایی',type:'متقاضی خدمات',subject:'مشاوره حقوقی در اختلاف ملکی',category:'املاک و مستغلات',status:'جدید',date:'۱۴۰۵/۰۸/۲۸',assignee:'تعیین نشده',priority:'فوری'},
{id:'DT-1405-003',name:'مؤسسه پژوهش و فناوری',type:'سازمان',subject:'ارزیابی الزامات حقوقی محصول دیجیتال',category:'فناوری و مالکیت فکری',status:'ارجاع‌شده',date:'۱۴۰۵/۰۸/۲۶',assignee:'کارگروه فناوری',priority:'عادی'}
],
experts:[
{name:'دکتر ناهید فرهمند',field:'حقوق تجارت و شرکت‌ها',level:'عضو علمی',city:'تهران',tags:['قراردادهای تجاری','داوری','حاکمیت شرکتی'],status:'تأییدشده'},
{name:'آرش کیانی',field:'حقوق فناوری و داده',level:'متخصص همکار',city:'اصفهان',tags:['حریم خصوصی','فناوری','مالکیت فکری'],status:'تأییدشده'},
{name:'سارا مهرآیین',field:'حقوق کار و تأمین اجتماعی',level:'وکیل همکار',city:'شیراز',tags:['روابط کار','بیمه','حل اختلاف'],status:'در حال ارزیابی'},
{name:'دکتر بهزاد راد',field:'حقوق عمومی و اداری',level:'عضو علمی',city:'مشهد',tags:['مقررات','حقوق اداری','پژوهش'],status:'تأییدشده'},
{name:'نگار دادخواه',field:'حقوق املاک و قراردادها',level:'کارشناس همکار',city:'تبریز',tags:['املاک','پیمانکاری','تنظیم سند'],status:'تأییدشده'},
{name:'پیمان نیک‌روش',field:'داوری و حل اختلاف',level:'متخصص همکار',city:'تهران',tags:['میانجیگری','داوری','مذاکره'],status:'تأییدشده'}
],
projects:[
{title:'بازنگری قراردادهای سازمانی',owner:'مرکز قراردادها',progress:72,due:'۱۴۰۵/۰۹/۰۵',status:'در حال اجرا'},
{title:'پژوهش تطبیقی حقوق داده',owner:'کارگروه فناوری',progress:48,due:'۱۴۰۵/۰۹/۱۲',status:'در حال اجرا'},
{title:'تدوین راهنمای حقوق کسب‌وکار',owner:'مرکز آموزش و پژوهش',progress:100,due:'۱۴۰۵/۰۸/۲۵',status:'تکمیل‌شده'}
],
tasks:[
{title:'بررسی اولیه درخواست ملکی',meta:'درخواست DT-1405-002 · امروز',done:false},
{title:'تکمیل گزارش قرارداد پیمانکاری',meta:'پروژه بازنگری قراردادها · فردا',done:false},
{title:'جلسه کارگروه فناوری',meta:'نشست تخصصی · ۲ آذر',done:true}
],
activities:[
{icon:'▤',title:'درخواست بررسی قرارداد ثبت شد',meta:'شرکت توسعه آریا · DT-1405-001',time:'۱۰:۲۵'},
{icon:'♙',title:'پروفایل متخصص جدید تأیید شد',meta:'شبکه متخصصان · حقوق تجارت',time:'دیروز'},
{icon:'▥',title:'گزارش پژوهشی به‌روزرسانی شد',meta:'کارگروه فناوری و داده',time:'دیروز'}
]
};
let data;
try{data=JSON.parse(localStorage.getItem(storeKey))||structuredClone(seed)}catch(e){data=JSON.parse(JSON.stringify(seed))}
data.experts=(data.experts||[]).map(x=>({...x,education:x.education||'ثبت نشده',experience:x.experience||'ثبت نشده',bio:x.bio||'اطلاعات تکمیلی این پروفایل هنوز وارد نشده است.',contact:x.contact||'ثبت نشده',email:x.email||'ثبت نشده',credential:x.credential||'ثبت نشده',documents:x.documents||[],verification:x.verification||(x.status==='در حال ارزیابی'?'در حال بررسی':x.status||'در حال بررسی')}));
function save(){try{localStorage.setItem(storeKey,JSON.stringify(data))}catch(e){toast('ذخیره‌سازی مرورگر در دسترس نیست.')}}
const titles={overview:'نمای کلی',requests:'درخواست‌ها و پرونده‌ها',projects:'پروژه‌ها و وظایف',experts:'اعضا و متخصصان',groups:'کارگروه‌ها و مراکز',knowledge:'بانک دانش حقوقی',documents:'قراردادها و اسناد',academy:'آکادمی و رویدادها',messages:'پیام‌ها و جلسات',market:'بازار خدمات',finance:'امور مالی',assistant:'دستیار حقوقی',reports:'گزارش‌ها و تحلیل',admin:'مدیریت شبکه'};
let current='overview',role='manager',searchTerm='';
const roleNames={manager:'مدیر شبکه',lawyer:'عضو متخصص',client:'متقاضی خدمات'};
const sample='<div class="sample-banner"><span>◇</span><div><b>محیط آزمایشی داتار</b> · اطلاعات این صفحه نمونه است و در مرورگر همین دستگاه ذخیره می‌شود؛ هنوز به پایگاه داده یا سامانه پرداخت آنلاین متصل نیست.</div></div>';
function esc(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>t.classList.remove('show'),2600)}
function heading(kicker,title,desc,action){return '<div class="page-heading"><div><span class="eyebrow">'+kicker+'</span><h1>'+title+'</h1><p>'+desc+'</p></div><div class="heading-actions">'+(action||'')+'</div></div>'}
function stat(label,value,icon,foot){return '<div class="stat-card"><div class="stat-top"><span>'+label+'</span><span class="stat-icon">'+icon+'</span></div><div class="stat-value">'+value+'</div><div class="stat-foot">'+foot+'</div></div>'}
function panel(title,body,link){return '<section class="panel"><div class="panel-head"><h2>'+title+'</h2>'+(link||'')+'</div>'+body+'</section>'}
function statusClass(s){return s==='جدید'?'new':(s==='تکمیل‌شده'||s==='مختومه'?'done':'progress')}
function requestRows(list){return list.map(r=>'<tr><td><strong>'+esc(r.id)+'</strong><small>'+esc(r.date)+'</small></td><td><strong>'+esc(r.name)+'</strong><small>'+esc(r.type)+'</small></td><td><strong>'+esc(r.subject)+'</strong><small>'+esc(r.category)+'</small></td><td>'+esc(r.assignee)+'</td><td><span class="status '+statusClass(r.status)+'">'+esc(r.status)+'</span></td><td><button class="btn soft small" data-action="cycle-request" data-id="'+esc(r.id)+'">تغییر وضعیت</button></td></tr>').join('')}
function overview(){
const open=data.requests.filter(x=>x.status!=='مختومه'&&x.status!=='ردشده').length;
const done=data.requests.filter(x=>x.status==='مختومه').length;
const todo=data.tasks.filter(x=>!x.done).length;
const activities=data.activities.map(a=>'<div class="activity-item"><span class="activity-mark">'+a.icon+'</span><div><b>'+esc(a.title)+'</b><small>'+esc(a.meta)+'</small></div><span class="activity-time">'+esc(a.time)+'</span></div>').join('');
const tasks=data.tasks.map((t,i)=>'<div class="task-row"><span style="background:'+(t.done?'#6d9b7b':'#b18b55')+'"></span><div><b>'+esc(t.title)+'</b><small>'+esc(t.meta)+'</small></div><button class="btn soft small" data-action="toggle-task" data-index="'+i+'">'+(t.done?'انجام شد':'انجام')+'</button></div>').join('');
const quick=[['＋','ثبت درخواست','ایجاد درخواست جدید','request'],['♙','یافتن متخصص','جست‌وجوی اعضای شبکه','experts'],['▥','بانک دانش','قوانین و منابع حقوقی','knowledge'],['◫','ایجاد پروژه','تعریف پروژه تخصصی','project']];
return sample+heading('میزکار شما','سلام، به داتار خوش آمدید','نمایی از فعالیت‌ها، خدمات و همکاری‌های شبکه در یک فضای کاری یکپارچه.','<button class="btn primary" data-open="request">＋ ثبت درخواست جدید</button>')+
'<div class="grid stats-grid">'+stat('درخواست‌های فعال',open,'▤','در حال پیگیری در شبکه')+stat('پرونده‌های مختومه',done,'✓','ثبت‌شده در محیط آزمایشی')+stat('متخصصان نمونه',data.experts.length,'♙','در فهرست نمایشی شبکه')+stat('وظایف باز',todo,'◷','نیازمند اقدام')+'</div>'+
'<div class="grid dashboard-grid">'+panel('آخرین فعالیت‌ها','<div class="activity-list">'+activities+'</div>','<button class="text-link" data-view="requests">همه درخواست‌ها ←</button>')+
panel('پیگیری‌های نزدیک','<div class="task-list">'+tasks+'</div>','<button class="text-link" data-view="projects">مشاهده وظایف ←</button>')+'</div>'+
'<div class="grid quick-grid">'+quick.map(q=>'<button class="quick-action" '+(q[3]==='request'?'data-open="request"':'data-view="'+q[3]+'"')+'><span>'+q[0]+'</span><div><b>'+q[1]+'</b><small>'+q[2]+'</small></div></button>').join('')+'</div>'+
'<div class="grid split-grid" style="margin-top:14px">'+panel('نمای کلی درخواست‌ها','<div class="table-wrap"><table class="data-table"><thead><tr><th>شناسه</th><th>متقاضی</th><th>موضوع</th><th>وضعیت</th></tr></thead><tbody>'+data.requests.slice(0,3).map(r=>'<tr><td>'+esc(r.id)+'</td><td>'+esc(r.name)+'</td><td>'+esc(r.subject)+'</td><td><span class="status '+statusClass(r.status)+'">'+esc(r.status)+'</span></td></tr>').join('')+'</tbody></table></div>','<button class="text-link" data-view="requests">ورود به میز درخواست‌ها ←</button>')+
panel('پایداری شبکه','<div class="task-list"><div class="task-row"><span></span><div><b>خدمات تخصصی</b><div class="progress"><i style="width:76%"></i></div></div><small>۷۶٪</small></div><div class="task-row"><span></span><div><b>پژوهش و آموزش</b><div class="progress"><i style="width:58%"></i></div></div><small>۵۸٪</small></div><div class="task-row"><span></span><div><b>توسعه زیرساخت</b><div class="progress"><i style="width:42%"></i></div></div><small>۴۲٪</small></div></div><p class="muted">شاخص‌های نمایشی برای نمایش نحوه گزارش‌گیری هستند.</p>')+'</div>';
}
function requests(){
let list=data.requests.filter(r=>(!searchTerm||[r.id,r.name,r.subject,r.category].join(' ').toLowerCase().includes(searchTerm.toLowerCase())));
return sample+heading('خدمات حقوقی','درخواست‌ها و پرونده‌ها','ثبت، دسته‌بندی، ارزیابی اولیه، ارجاع و پیگیری درخواست‌های خدماتی.','<button class="btn primary" data-open="request">＋ درخواست جدید</button>')+
'<div class="toolbar"><div><b style="font-size:11px;color:#40586c">فهرست درخواست‌ها</b><span class="muted"> · '+list.length+' مورد</span></div><div class="left-tools"><input id="request-search" placeholder="جست‌وجوی متقاضی یا موضوع" value="'+esc(searchTerm)+'"><select id="request-filter"><option value="">همه وضعیت‌ها</option>'+['جدید','در حال بررسی','نیازمند تکمیل اطلاعات','ارجاع‌شده','پذیرفته‌شده','مختومه','ردشده'].map(x=>'<option>'+x+'</option>').join('')+'</select><button class="btn ghost" data-action="export-requests">خروجی CSV</button></div></div>'+
'<div class="table-wrap"><table class="data-table"><thead><tr><th>شماره پیگیری</th><th>متقاضی</th><th>موضوع و حوزه</th><th>مسئول رسیدگی</th><th>وضعیت</th><th>عملیات</th></tr></thead><tbody id="request-rows">'+requestRows(list)+'</tbody></table></div>'+
'<p class="muted" style="margin-top:12px">برای تغییر وضعیت هر درخواست، گزینه «تغییر وضعیت» را انتخاب کنید. در نسخه عملیاتی، ارجاع و ثبت رویدادها با سطح دسترسی انجام می‌شود.</p>';
}
function experts(){
const list=data.experts.map((x,i)=>({...x,_index:i})).filter(x=>!searchTerm||[x.name,x.field,x.city,x.tags.join(' '),x.education].join(' ').toLowerCase().includes(searchTerm.toLowerCase()));
const pending=data.experts.filter(x=>x.verification==='در حال بررسی').length;
return sample+heading('سرمایه انسانی','اعضا و متخصصان شبکه','پروفایل حرفه‌ای، سوابق، مدارک و فرایند ارزیابی صلاحیت اعضا.','<button class="btn primary" data-open="expert">＋ ثبت پروفایل تخصصی</button>')+
'<div class="grid stats-grid">'+stat('اعضای ثبت‌شده',data.experts.length,'♙','پروفایل‌های نمونه')+stat('اعتبارسنجی‌شده',data.experts.filter(x=>x.verification==='تأییدشده').length,'✓','دارای وضعیت تأیید')+stat('در صف بررسی',pending,'◷','نیازمند ارزیابی')+stat('حوزه‌های تخصصی',new Set(data.experts.map(x=>x.field)).size,'⌘','حوزه‌های ثبت‌شده')+'</div>'+
'<div class="toolbar"><b style="font-size:11px;color:#40586c">فهرست متخصصان <span class="muted">('+list.length+')</span></b><div class="left-tools"><input id="expert-search" placeholder="نام، تخصص یا شهر" value="'+esc(searchTerm)+'"><select id="expert-filter"><option value="">همه وضعیت‌ها</option><option>تأییدشده</option><option>در حال بررسی</option><option>نیازمند تکمیل</option><option>ردشده</option></select></div></div>'+
'<div class="grid cards-grid">'+list.map(x=>'<article class="expert-card"><div class="expert-head"><span class="expert-avatar">'+esc(x.name.slice(0,1))+'</span><div><h3>'+esc(x.name)+'</h3><p>'+esc(x.level)+' · '+esc(x.city)+'</p></div></div><p style="font-size:9px;color:#536b7f;margin-top:11px">'+esc(x.field)+'</p><div class="expert-tags">'+x.tags.map(t=>'<span>'+esc(t)+'</span>').join('')+'</div><div class="expert-foot"><span class="status '+(x.verification==='تأییدشده'?'done':x.verification==='ردشده'?'new':'progress')+'">'+esc(x.verification)+'</span><button class="text-link" data-action="view-expert" data-index="'+x._index+'">پروفایل و مدارک ←</button></div></article>').join('')+'</div>'+
'<div class="role-note" style="margin-top:14px">اعتبارسنجی در این نسخه نمایشی صرفاً گردش کار آزمایشی است. بررسی اصالت پروانه، مدارک تحصیلی و سوابق حرفه‌ای باید در نسخه عملیاتی توسط مرجع مجاز و با ثبت مستندات انجام شود.</div>';
}

function projects(){
return sample+heading('مدیریت اجرا','پروژه‌ها و وظایف','تعریف پروژه، تعیین مسئول، زمان‌بندی، پایش پیشرفت و تحویل خروجی.','<button class="btn primary" data-open="project">＋ پروژه جدید</button>')+
'<div class="grid cards-grid">'+data.projects.map((p,i)=>'<article class="feature-card"><span>◫</span><h3>'+esc(p.title)+'</h3><p>مسئول: '+esc(p.owner)+'<br>موعد: '+esc(p.due)+'<br>وضعیت: '+esc(p.status)+'</p><div class="progress"><i style="width:'+p.progress+'%"></i></div><div class="expert-foot"><span>پیشرفت</span><b>'+p.progress+'٪</b></div></article>').join('')+'</div>'+
'<div class="panel" style="margin-top:14px"><div class="panel-head"><h2>فهرست وظایف</h2><span class="muted">تغییر وضعیت با انتخاب دکمه</span></div><div class="task-list">'+data.tasks.map((t,i)=>'<div class="task-row"><span style="background:'+(t.done?'#6d9b7b':'#b18b55')+'"></span><div><b>'+esc(t.title)+'</b><small>'+esc(t.meta)+'</small></div><button class="btn soft small" data-action="toggle-task" data-index="'+i+'">'+(t.done?'بازگشایی':'تکمیل وظیفه')+'</button></div>').join('')+'</div></div>';
}
function groups(){
const items=[['مرکز خدمات حقوقی سازمانی','پشتیبانی حقوقی مستمر، ارزیابی ریسک و مدیریت قراردادها'],['مرکز قراردادها و اسناد','تنظیم، بازبینی و مدیریت چرخه عمر قرارداد'],['مرکز داوری و حل اختلاف','داوری، میانجیگری و طراحی مسیر حل اختلاف'],['مرکز پژوهش و سیاست‌گذاری','مطالعات حقوقی، تحلیل مقررات و گزارش‌های تخصصی'],['مرکز فناوری و حقوق دیجیتال','حریم خصوصی، داده، تجارت الکترونیکی و فناوری'],['مرکز آموزش و توسعه حرفه‌ای','دوره‌ها، کارگاه‌ها و برنامه‌های توانمندسازی'],['کارگروه حقوق املاک و ساخت‌وساز','قراردادهای پیمانکاری، املاک و پروژه‌های عمرانی'],['کارگروه حقوق کار و تأمین اجتماعی','روابط کار، بیمه و اختلافات کارگری و کارفرمایی']];
return sample+heading('ساختار تخصصی','کارگروه‌ها و مراکز','مراکز تخصصی، هسته‌های پژوهشی و تیم‌های پروژه‌ای شبکه.','<button class="btn primary" data-open="group">＋ پیشنهاد کارگروه</button>')+'<div class="grid feature-grid">'+items.map((x,i)=>'<article class="feature-card"><span>'+(i<6?'◈':'⌘')+'</span><h3>'+x[0]+'</h3><p>'+x[1]+'</p><a class="text-link" href="#" data-action="notify" data-message="صفحه جزئیات این مرکز در مرحله توسعه است.">مشاهده ساختار ←</a></article>').join('')+'</div>';
}
function knowledge(){
const items=[['قوانین و مقررات','قانون مدنی، قانون تجارت، قانون کار و مقررات تخصصی','قانون'],['آرای قضایی و نظریات','آرای وحدت رویه، آرای منتخب و نظریات مشورتی','رأی'],['پژوهش و تحلیل','مقالات، یادداشت‌های تحلیلی و گزارش‌های موضوعی','پژوهش'],['رویه و دستورالعمل‌ها','دستورالعمل‌ها، بخشنامه‌ها و رویه‌های اجرایی','رویه'],['دانش تخصصی سازمانی','راهنماهای حقوقی برای شرکت‌ها و کسب‌وکارها','سازمان'],['واژه‌نامه و مفاهیم حقوقی','تعاریف، اصطلاحات و معادل‌های تخصصی','واژه']];
return sample+heading('مرکز دانش','بانک دانش حقوقی','درگاه یکپارچه برای جست‌وجو و سامان‌دهی منابع معتبر حقوقی.','<button class="btn primary" data-open="resource">＋ ثبت منبع</button>')+'<div class="role-note">در نسخه عملیاتی، هر منبع باید دارای مشخصات انتشار، مرجع رسمی، تاریخ اعتبار و پیوند قابل بررسی باشد. عنوان‌های زیر صرفاً نمونه ساختار هستند.</div><div class="grid feature-grid">'+items.map((x,i)=>'<article class="feature-card"><span>▥</span><h3>'+x[0]+'</h3><p>'+x[1]+'</p><a class="text-link" href="#" data-action="notify" data-message="مخزن '+x[0]+' در حال آماده‌سازی است.">ورود به مخزن ←</a></article>').join('')+'</div>';
}
function documents(){
return sample+heading('مدیریت اسناد','قراردادها و اسناد','کتابخانه الگوها، اسناد نمونه، گردش بررسی و نسخه‌بندی مستندات.','<button class="btn primary" data-open="document">＋ افزودن سند</button>')+'<div class="grid feature-grid">'+[['الگوهای قراردادی','قرارداد خدمات، پیمانکاری، محرمانگی و مشارکت'],['فرم‌ها و مکاتبات','درخواست‌ها، صورت‌جلسات و مکاتبات سازمانی'],['اسناد ثبتی و شرکتی','اساسنامه، صورت‌جلسه و تغییرات شرکت'],['مدیریت نسخه‌ها','تاریخچه اصلاحات، تأیید و گردش بررسی'],['کنترل دسترسی','سطح مشاهده، ویرایش و اشتراک‌گذاری'],['بایگانی امن','طبقه‌بندی، نگهداری و بازیابی اسناد']].map(x=>'<article class="feature-card"><span>▧</span><h3>'+x[0]+'</h3><p>'+x[1]+'</p><a class="text-link" href="#" data-action="notify" data-message="این بخش در نسخه عملیاتی به مخزن اسناد متصل می‌شود.">بازکردن بخش ←</a></article>').join('')+'</div>';
}
function academy(){
return sample+heading('یادگیری مستمر','آکادمی و رویدادها','دوره‌های تخصصی، نشست‌ها، کارگاه‌ها و برنامه‌های توسعه حرفه‌ای.','<button class="btn primary" data-open="event">＋ ثبت رویداد</button>')+'<div class="grid cards-grid">'+[['کارگاه تنظیم قراردادهای تجاری','کارگاه تخصصی','۲ آذر ۱۴۰۵','ثبت‌نام در حال آماده‌سازی'],['نشست حقوق فناوری و داده','نشست علمی','۶ آذر ۱۴۰۵','ظرفیت محدود'],['دوره کاربردی حقوق شرکت‌ها','دوره آموزشی','۱۲ آذر ۱۴۰۵','به‌زودی']].map((x,i)=>'<article class="feature-card"><span>▦</span><h3>'+x[0]+'</h3><p>'+x[1]+' · '+x[2]+'<br>'+x[3]+'</p><a class="text-link" href="#" data-action="notify" data-message="فرایند ثبت‌نام آنلاین پس از اتصال سامانه آموزشی فعال می‌شود.">جزئیات رویداد ←</a></article>').join('')+'</div>';
}
function messages(){
return sample+heading('ارتباطات حرفه‌ای','پیام‌ها و جلسات','هماهنگی اعضا، گفت‌وگوهای کاری، جلسات و صورت‌جلسه‌ها.','<button class="btn primary" data-open="meeting">＋ جلسه جدید</button>')+'<div class="grid split-grid">'+panel('گفت‌وگوهای اخیر','<div class="message-preview"><span class="expert-avatar">ق</span><div><b>کارگروه قراردادها</b><small>نسخه بازنگری‌شده پیش‌نویس برای بررسی ارسال شد.</small></div><span class="muted">۱۰:۴۰</span></div><div class="message-preview"><span class="expert-avatar">ف</span><div><b>مرکز فناوری و داده</b><small>زمان نشست تخصصی نهایی شد.</small></div><span class="muted">دیروز</span></div><div class="message-preview"><span class="expert-avatar">پ</span><div><b>دبیرخانه شبکه</b><small>درخواست همکاری شما دریافت شد.</small></div><span class="muted">۲ روز قبل</span></div>','<button class="text-link" data-action="notify" data-message="سامانه پیام‌رسان داخلی در مرحله طراحی است.">همه پیام‌ها ←</button>')+panel('جلسات پیش‌رو','<div class="list-row"><span class="row-icon">◷</span><div><b>نشست کارگروه قراردادها</b><small>۲ آذر · ساعت ۱۰:۰۰ · آنلاین</small></div></div><div class="list-row"><span class="row-icon">◷</span><div><b>جلسه هماهنگی مراکز تخصصی</b><small>۴ آذر · ساعت ۱۲:۰۰</small></div></div><div class="list-row"><span class="row-icon">◷</span><div><b>نشست پژوهش حقوق فناوری</b><small>۶ آذر · ساعت ۱۵:۰۰</small></div></div>')+'</div>';
}
function market(){
const services=[['بررسی و بازبینی قرارداد','مرکز قراردادها','از ارزیابی اولیه تا گزارش اصلاحات'],['مشاوره حقوقی کسب‌وکار','حقوق شرکت‌ها','پاسخ‌گویی تخصصی به مسائل حقوقی بنگاه'],['ارزیابی ریسک و انطباق','حقوق سازمانی','شناسایی ریسک و طراحی برنامه انطباق'],['داوری و میانجیگری','حل اختلاف','طراحی مسیر توافق و حل‌وفصل اختلاف'],['خدمات حقوق فناوری','حقوق دیجیتال','قرارداد فناوری، داده و مالکیت فکری'],['پژوهش حقوقی سفارشی','پژوهش و سیاست‌گذاری','گزارش تحلیلی و مطالعه تطبیقی']];
return sample+heading('اقتصاد خدمات','بازار خدمات تخصصی','معرفی سبد خدمات، ثبت سفارش و اتصال متقاضی به مرکز یا متخصص واجد صلاحیت.','<button class="btn primary" data-open="service">＋ تعریف خدمت</button>')+'<div class="grid feature-grid">'+services.map((x,i)=>'<article class="feature-card"><span>◈</span><h3>'+x[0]+'</h3><p>'+x[1]+'<br>'+x[2]+'</p><button class="btn soft small" style="margin-top:12px" data-action="order-service" data-service="'+x[0]+'">ثبت درخواست این خدمت</button></article>').join('')+'</div>';
}
function finance(){
return sample+heading('مدیریت مالی','امور مالی و تسویه','نمای مفهومی جریان مالی خدمات، صورتحساب‌ها، سهم همکاران و گزارش درآمد.','<button class="btn primary" data-open="invoice">＋ ثبت صورتحساب</button>')+'<div class="role-note">ارقام این صفحه نمونه نمایشی و غیرواقعی هستند. دریافت وجه، اتصال بانکی، صدور فاکتور رسمی و تسویه واقعی در این نسخه فعال نیست.</div><div class="grid stats-grid">'+stat('درآمد خدماتی نمونه','۸۴۰ م','◈','مبلغ فرضی دوره')+stat('صورتحساب باز','۱۲','▤','نمونه در انتظار تسویه')+stat('سهم همکاران','۵۶۰ م','♙','محاسبه آزمایشی')+stat('تسویه‌شده','۶۸۰ م','✓','عدد نمایشی')+'</div><div class="grid split-grid">'+panel('ترکیب درآمدی','<div class="bar-chart"><div class="bar-col"><i style="--h:75%"></i><small>سازمانی</small></div><div class="bar-col"><i style="--h:52%"></i><small>قرارداد</small></div><div class="bar-col"><i style="--h:39%"></i><small>آموزش</small></div><div class="bar-col"><i style="--h:65%"></i><small>پژوهش</small></div><div class="bar-col"><i style="--h:28%"></i><small>سایر</small></div></div><div class="bar-legend"><span>گزارش نمونه</span><span>قابل تنظیم در نسخه عملیاتی</span></div>')+panel('کنترل‌های مالی ضروری','<div class="task-list"><div class="task-row"><span></span><div><b>تفکیک وجوه مشتریان از درآمد شبکه</b><small>الزام کنترلی</small></div></div><div class="task-row"><span></span><div><b>ثبت سهم مرکز و متخصص</b><small>توافق شفاف پیش از ارائه خدمت</small></div></div><div class="task-row"><span></span><div><b>ثبت هزینه و مالیات</b><small>گزارش‌پذیری و قابلیت حسابرسی</small></div></div></div>')+'</div>';
}
function assistant(){
return sample+heading('فناوری و هوشمندسازی','دستیار حقوقی داتار','رابط پیشنهادی برای جست‌وجو، خلاصه‌سازی و تحلیل اسناد با ارجاع به منابع معتبر.','')+'<div class="assistant-box"><div class="assistant-intro"><span class="eyebrow" style="color:#e7d2ae">DĀTAR LEGAL ASSISTANT</span><h2>دستیار پژوهش و تحلیل حقوقی</h2><p>پرسش حقوقی، موضوع پژوهش یا متن مورد بررسی را وارد کنید. در نسخه عملیاتی، پاسخ‌ها باید با منابع رسمی، تاریخ اعتبار و ارجاع دقیق همراه شوند.</p></div><div class="panel"><div class="field"><label for="assistant-question">موضوع یا پرسش</label><textarea id="assistant-question" placeholder="مثلاً تفاوت فسخ و انفساخ قرارداد را برای یک گزارش پژوهشی بررسی کن..."></textarea></div><button class="btn primary" data-action="assistant-demo">آماده‌سازی درخواست</button><p class="muted" id="assistant-result" style="margin-top:12px">اتصال به مدل هوش مصنوعی و پایگاه قوانین هنوز فعال نشده است. این بخش فعلاً رابط و گردش کار پیشنهادی را نمایش می‌دهد.</p></div><div class="grid feature-grid" style="margin-top:14px"><article class="feature-card"><span>⌕</span><h3>جست‌وجوی مستند</h3><p>بازیابی قوانین و مقررات با تاریخ اعتبار و مرجع انتشار.</p></article><article class="feature-card"><span>▧</span><h3>تحلیل سند</h3><p>استخراج بندها، ریسک‌ها و موارد نیازمند بررسی انسانی.</p></article><article class="feature-card"><span>✧</span><h3>پژوهش و نگارش</h3><p>ساختاردهی یادداشت و گزارش با ارجاع قابل کنترل.</p></article></div></div>';
}
function reports(){
return sample+heading('پایش و ارزیابی','گزارش‌ها و تحلیل عملکرد','شاخص‌های عملکردی برای تصمیم‌گیری مدیریتی، کیفیت خدمات و توسعه شبکه.','<button class="btn ghost" data-action="export-requests">دریافت گزارش درخواست‌ها</button>')+'<div class="grid stats-grid">'+stat('نرخ پاسخ اولیه','۹۲٪','◷','شاخص نمونه')+stat('میانگین زمان ارجاع','۱٫۸ روز','⇄','شاخص نمونه')+stat('رضایت متقاضیان','۸۸٪','☆','نیازمند داده واقعی')+stat('همکاری فعال','۶۴٪','♙','شاخص نمونه')+'</div><div class="grid split-grid">'+panel('روند حجم خدمات','<div class="bar-chart"><div class="bar-col"><i style="--h:35%"></i><small>مرداد</small></div><div class="bar-col"><i style="--h:50%"></i><small>شهریور</small></div><div class="bar-col"><i style="--h:44%"></i><small>مهر</small></div><div class="bar-col"><i style="--h:68%"></i><small>آبان</small></div><div class="bar-col"><i style="--h:78%"></i><small>آذر</small></div></div>')+panel('شاخص‌های قابل توسعه','<div class="list-row"><span class="row-icon">✓</span><div><b>کیفیت و زمان پاسخ‌گویی</b><small>زمان ثبت تا ارجاع و پاسخ اولیه</small></div></div><div class="list-row"><span class="row-icon">♙</span><div><b>عملکرد متخصصان و مراکز</b><small>حجم کار، کیفیت و رضایت</small></div></div><div class="list-row"><span class="row-icon">◈</span><div><b>پایداری اقتصادی</b><small>درآمد، هزینه، حاشیه و تسویه</small></div></div>')+'</div>';
}
function admin(){
return sample+heading('راهبری','مدیریت شبکه','مدیریت کاربران، نقش‌ها، مراکز، فرایندها و تنظیمات سامانه.','<button class="btn primary" data-open="user">＋ کاربر جدید</button>')+'<div class="grid feature-grid">'+[['کاربران و نقش‌ها','تعریف نقش متقاضی، متخصص، مدیر مرکز و مدیر شبکه'],['اعتبارسنجی و صلاحیت','ثبت مدارک، بررسی سوابق و تمدید وضعیت عضویت'],['ساختار سازمانی','مدیریت مراکز، کارگروه‌ها و شعب استانی'],['فرایندها و استانداردها','تعریف گردش کار، فرم‌ها و معیارهای کیفیت'],['امنیت و دسترسی','ثبت رویداد، کنترل دسترسی و سیاست نگهداری داده'],['تنظیمات سامانه','نام، نشان، اطلاعات تماس و پیکربندی عمومی']].map(x=>'<article class="feature-card"><span>⚙</span><h3>'+x[0]+'</h3><p>'+x[1]+'</p><a class="text-link" href="#" data-action="notify" data-message="مدیریت این بخش در نسخه عملیاتی فعال خواهد شد.">مدیریت بخش ←</a></article>').join('')+'</div>';
}
const renderers={overview,requests,projects,experts,groups,knowledge,documents,academy,messages,market,finance,assistant,reports,admin};
function render(view=current,resetSearch=true){
if(resetSearch)searchTerm='';current=view;page.innerHTML=(renderers[view]||overview)();
$('#crumb-title').textContent=titles[view]||titles.overview;
document.querySelectorAll('.nav-link,.mobile-bottom button').forEach(b=>b.classList.toggle('active',b.dataset.view===view));
document.querySelectorAll('.nav-link').forEach(b=>{const restricted=role==='client'&&['projects','groups','finance','reports','admin'].includes(b.dataset.view);b.hidden=restricted;});
if(role==='client'&&['projects','groups','finance','reports','admin'].includes(view))render('overview');
if(view==='requests')$('#request-badge').textContent=String(data.requests.filter(r=>r.status==='جدید').length);
page.focus({preventScroll:true});
}
function openDialog(type,extra){
const dlg=$('#action-dialog'),box=$('#dialog-content'),title=$('#dialog-title');
const field=(label,name,placeholder,type='text',wide=false)=>'<label class="field '+(wide?'wide':'')+'">'+label+'<input name="'+name+'" type="'+type+'" placeholder="'+(placeholder||'')+'" required></label>';
let body='',t='ثبت اطلاعات';
if(type==='request'){t='ثبت درخواست خدمات حقوقی';body='<div class="dialog-grid">'+field('نام متقاضی / سازمان','name','نام کامل یا نام سازمان')+field('راه ارتباطی','contact','شماره تماس یا ایمیل')+'<label class="field">نوع درخواست<select name="category"><option>مشاوره حقوقی</option><option>تنظیم و بررسی قرارداد</option><option>خدمات حقوقی سازمانی</option><option>داوری و حل اختلاف</option><option>پژوهش حقوقی</option><option>حقوق فناوری</option><option>حمایت عام‌المنفعه</option></select></label><label class="field">فوریت<select name="priority"><option>عادی</option><option>فوری</option></select></label>'+field('عنوان درخواست','subject','شرح کوتاه موضوع','text',true)+'<label class="field wide">توضیحات<textarea name="details" placeholder="شرح اولیه و خروجی مورد انتظار" required></textarea></label></div>'}
else if(type==='expert'){t='ثبت پروفایل تخصصی عضو';body='<div class="dialog-grid">'+field('نام و نام خانوادگی','name','نام کامل')+field('شهر محل فعالیت','city','شهر')+field('حوزه تخصص اصلی','field','مثلاً حقوق تجارت و شرکت‌ها')+field('نوع عضویت / همکاری','level','عضو علمی / وکیل همکار / متخصص')+field('مدرک و رشته تحصیلی','education','مثلاً کارشناسی ارشد حقوق خصوصی')+field('سابقه حرفه‌ای','experience','مثلاً ۱۲ سال')+field('شماره پروانه یا شناسه حرفه‌ای (در صورت وجود)','credential','شناسه حرفه‌ای','text',true)+field('راه ارتباطی','contact','شماره تماس کاری')+field('رایانامه','email','name@example.com','email')+'<label class="field wide">تخصص‌های تکمیلی <input name="tags" placeholder="قراردادها، داوری، حاکمیت شرکتی"></label><label class="field wide">معرفی حرفه‌ای <textarea name="bio" placeholder="سوابق، زمینه‌های فعالیت و تجربه‌های شاخص"></textarea></label><label class="field wide">نام فایل مدارک (صرفاً نمایشی) <input name="documents" placeholder="مثلاً پروانه-وکالت.pdf، مدرک-تحصیلی.pdf"></label></div><p class="muted">در این نسخه فقط نام فایل ثبت می‌شود و مدرکی بارگذاری یا به سرور ارسال نمی‌شود. از ورود اطلاعات هویتی حساس خودداری کنید.</p>'}
else if(type==='project'){t='تعریف پروژه جدید';body='<div class="dialog-grid">'+field('عنوان پروژه','title','عنوان پروژه')+field('مرکز یا مسئول','owner','واحد مسئول')+field('تاریخ هدف','due','۱۴۰۵/۰۹/۲۰')+field('درصد پیشرفت','progress','۰ تا ۱۰۰','number')+'</div>'}
else if(type==='meeting'){t='ثبت جلسه جدید';body='<div class="dialog-grid">'+field('عنوان جلسه','title','عنوان جلسه')+field('تاریخ و ساعت','date','تاریخ و ساعت')+field('مسئول جلسه','owner','نام مسئول')+field('محل / پیوند','place','محل یا پیوند جلسه')+'</div>'}
else if(type==='group'){t='پیشنهاد کارگروه جدید';body='<div class="dialog-grid">'+field('عنوان کارگروه','title','عنوان')+field('حوزه فعالیت','field','حوزه تخصص')+'<label class="field wide">شرح مأموریت<textarea name="details" required></textarea></label></div>'}
else if(type==='resource'||type==='document'){t=type==='resource'?'ثبت منبع حقوقی':'افزودن سند';body='<div class="dialog-grid">'+field('عنوان','title','عنوان منبع یا سند')+field('نوع / دسته‌بندی','category','نوع محتوا')+field('مرجع / توضیحات','source','مرجع یا توضیح')+'</div>'}
else if(type==='event'){t='ثبت رویداد آموزشی';body='<div class="dialog-grid">'+field('عنوان رویداد','title','عنوان دوره یا نشست')+field('تاریخ','date','تاریخ برگزاری')+field('نوع برنامه','kind','دوره / کارگاه / نشست')+field('مسئول برگزاری','owner','نام مرکز یا مسئول')+'</div>'}
else if(type==='service'){t='تعریف خدمت جدید';body='<div class="dialog-grid">'+field('عنوان خدمت','title','عنوان خدمت')+field('مرکز ارائه‌دهنده','owner','نام مرکز')+'<label class="field wide">شرح خدمت<textarea name="details" required></textarea></label></div>'}
else if(type==='invoice'){t='ثبت صورتحساب آزمایشی';body='<div class="dialog-grid">'+field('شرح صورتحساب','title','عنوان خدمت')+field('مبلغ (تومان)','amount','مبلغ','number')+field('شناسه درخواست','ref','شماره پیگیری')+'</div>'}
else if(type==='user'){t='افزودن کاربر نمایشی';body='<div class="dialog-grid">'+field('نام کاربر','name','نام')+field('نقش','level','نقش سازمانی')+field('راه ارتباطی','contact','ایمیل یا شماره')+'</div>'}
title.textContent=t;box.innerHTML=body;dlg.dataset.type=type;if(type==='expert'&&Number.isInteger(extra)){const p=data.experts[extra];if(p){dlg.dataset.editIndex=String(extra);for(const [k,val] of Object.entries({name:p.name,city:p.city,field:p.field,level:p.level,education:p.education,experience:p.experience,credential:p.credential,contact:p.contact,email:p.email,tags:(p.tags||[]).join('، '),bio:p.bio,documents:(p.documents||[]).join('، ')})){const el=box.querySelector('[name="'+k+'"]');if(el)el.value=val}}}else{delete dlg.dataset.editIndex}dlg.showModal();
}
function showExpertProfile(index){
const x=data.experts[index];if(!x)return;
const dlg=$('#action-dialog'),box=$('#dialog-content');
$('#dialog-title').textContent='پروفایل تخصصی عضو';
const docs=(x.documents||[]).length?(x.documents||[]).map(d=>'<span class="doc-chip">▧ '+esc(d)+'</span>').join(''):'مدرکی در نسخه نمایشی ثبت نشده است';
let controls='';
if(role==='manager'&&x.verification!=='تأییدشده')controls='<div class="verify-actions"><button class="btn primary" data-action="verify-expert" data-index="'+index+'" data-status="تأییدشده">تأیید صلاحیت</button><button class="btn soft" data-action="verify-expert" data-index="'+index+'" data-status="نیازمند تکمیل">درخواست تکمیل مدارک</button><button class="btn ghost" data-action="verify-expert" data-index="'+index+'" data-status="ردشده">رد درخواست</button></div>';
else if(role!=='manager'&&x.verification!=='تأییدشده')controls='<div class="verify-actions"><button class="btn primary" data-action="verify-expert" data-index="'+index+'" data-status="در حال بررسی">ارسال مجدد برای بررسی</button></div>';
box.innerHTML='<div class="profile-sheet"><div class="profile-hero"><span class="profile-avatar">'+esc(x.name.slice(0,1))+'</span><div><h3>'+esc(x.name)+'</h3><p>'+esc(x.level)+' · '+esc(x.city)+'</p><span class="status '+(x.verification==='تأییدشده'?'done':x.verification==='ردشده'?'new':'progress')+'">'+esc(x.verification)+'</span></div></div><div class="profile-facts"><div><small>حوزه تخصص اصلی</small><b>'+esc(x.field)+'</b></div><div><small>تحصیلات</small><b>'+esc(x.education)+'</b></div><div><small>سابقه حرفه‌ای</small><b>'+esc(x.experience)+'</b></div><div><small>شماره پروانه / شناسه حرفه‌ای</small><b>'+esc(x.credential)+'</b></div><div><small>راه ارتباطی</small><b>'+esc(x.contact)+'</b></div><div><small>رایانامه</small><b>'+esc(x.email)+'</b></div></div><div class="profile-section"><b>معرفی حرفه‌ای</b><p>'+esc(x.bio)+'</p></div><div class="profile-section"><b>تخصص‌های تکمیلی</b><div class="expert-tags">'+(x.tags||[]).map(t=>'<span>'+esc(t)+'</span>').join('')+'</div></div><div class="profile-section"><b>مدارک و مستندات ثبت‌شده</b><div class="doc-list">'+docs+'</div></div><p class="muted">وضعیت این پروفایل صرفاً در مرورگر شما ذخیره می‌شود. تأیید نمایشی به معنای احراز واقعی صلاحیت یا اصالت مدارک نیست.</p>'+controls+'</div>';
dlg.dataset.type='profile';dlg.showModal();
}
function submitDialog(e){
const form=e.target;if(e.submitter&&e.submitter.value==='cancel'){$('#action-dialog').close();return;}
const type=$('#action-dialog').dataset.type;const fd=new FormData(form);const v=Object.fromEntries(fd.entries());
if(type==='request'){
const id='DT-1405-'+String(data.requests.length+1).padStart(3,'0');
data.requests.unshift({id,name:v.name,type:roleNames[role],subject:v.subject,category:v.category,status:'جدید',date:'۱۴۰۵/۰۸/۲۸',assignee:'تعیین نشده',priority:v.priority});
data.activities.unshift({icon:'▤',title:'درخواست جدید ثبت شد',meta:v.name+' · '+id,time:'اکنون'});toast('درخواست در محیط آزمایشی ثبت شد: '+id);
}else if(type==='expert'){const profile={name:v.name,field:v.field,level:v.level,city:v.city,tags:(v.tags||'').split(/[،,]/).map(x=>x.trim()).filter(Boolean),education:v.education,experience:v.experience,credential:v.credential,contact:v.contact,email:v.email,bio:v.bio||'اطلاعات تکمیلی ثبت نشده است.',documents:(v.documents||'').split(/[،,]/).map(x=>x.trim()).filter(Boolean),status:'در حال بررسی',verification:'در حال بررسی'};const editIndex=$('#action-dialog').dataset.editIndex;if(editIndex!==undefined&&data.experts[Number(editIndex)]){Object.assign(data.experts[Number(editIndex)],profile);toast('پروفایل ویرایش شد و برای بررسی مجدد قرار گرفت.')}else{data.experts.unshift(profile);data.activities.unshift({icon:'♙',title:'پروفایل تخصصی جدید ثبت شد',meta:v.name+' · در انتظار اعتبارسنجی',time:'اکنون'});toast('پروفایل ثبت شد و در صف اعتبارسنجی قرار گرفت.')}}
else if(type==='project'){data.projects.unshift({title:v.title,owner:v.owner,progress:Math.max(0,Math.min(100,Number(v.progress)||0)),due:v.due,status:'در حال اجرا'});toast('پروژه جدید ایجاد شد.')}
else{toast('اطلاعات در این نسخه نمایشی ثبت شد؛ برای ذخیره ساختاریافته در نسخه عملیاتی به سرویس مرکزی نیاز است.')}
save();$('#action-dialog').close();render(current);
}
function exportCsv(){
const rows=[['شناسه','متقاضی','نوع','موضوع','حوزه','وضعیت','تاریخ'],...data.requests.map(r=>[r.id,r.name,r.type,r.subject,r.category,r.status,r.date])];
const csv='\uFEFF'+rows.map(row=>row.map(v=>'"'+String(v??'').replace(/"/g,'""')+'"').join(',')).join('\n');
const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));a.download='datar-requests.csv';a.click();URL.revokeObjectURL(a.href);toast('فایل خروجی آماده شد.');
}
document.addEventListener('click',e=>{
const nav=e.target.closest('[data-view]');if(nav){render(nav.dataset.view,true);$('#sidebar').classList.remove('mobile-menu-open');return}
const open=e.target.closest('[data-open]');if(open){openDialog(open.dataset.open);return}
const action=e.target.closest('[data-action]');if(!action)return;
const kind=action.dataset.action;
if(kind==='notify')toast(action.dataset.message||'این قابلیت در نسخه عملیاتی فعال می‌شود.');
if(kind==='view-expert')showExpertProfile(Number(action.dataset.index));
if(kind==='edit-expert'){const idx=Number(action.dataset.index);$('#action-dialog').close();openDialog('expert',idx)}
if(kind==='verify-expert'){const p=data.experts[Number(action.dataset.index)];if(p){p.verification=action.dataset.status;p.status=action.dataset.status;save();showExpertProfile(Number(action.dataset.index));toast('وضعیت اعتبارسنجی تغییر کرد.')}}
if(kind==='toggle-task'){const t=data.tasks[Number(action.dataset.index)];if(t){t.done=!t.done;save();render(current)}}
if(kind==='cycle-request'){const r=data.requests.find(x=>x.id===action.dataset.id);if(r){const states=['جدید','در حال بررسی','نیازمند تکمیل اطلاعات','ارجاع‌شده','پذیرفته‌شده','مختومه'];r.status=states[(states.indexOf(r.status)+1)%states.length];save();render(current);toast('وضعیت درخواست به‌روزرسانی شد.')}}
if(kind==='export-requests')exportCsv();
if(kind==='order-service'){openDialog('request');setTimeout(()=>{const s=$('#dialog-content input[name="subject"]');if(s)s.value='درخواست خدمت: '+action.dataset.service},0)}
if(kind==='assistant-demo'){const q=$('#assistant-question').value.trim();$('#assistant-result').textContent=q?'درخواست شما آماده ثبت در صف تحلیل است. در نسخه فعلی پاسخی تولید نمی‌شود؛ پس از اتصال مدل و منابع رسمی، خروجی مستند و قابل ارجاع ارائه خواهد شد.':'ابتدا موضوع یا پرسش را وارد کنید.'}
});
document.addEventListener('submit',e=>{if(e.target.id==='dialog-form'){e.preventDefault();submitDialog(e)}});
document.addEventListener('input',e=>{
if(e.target.id==='request-search'||e.target.id==='expert-search'){searchTerm=e.target.value;render(current,false);const id=current==='requests'?'request-search':'expert-search';const input=$('#'+id);if(input){input.focus();input.setSelectionRange(searchTerm.length,searchTerm.length)}}
if(e.target.id==='global-search'){const q=e.target.value.trim();if(q.length>1){searchTerm=q;render('requests',false);const input=$('#request-search');if(input)input.value=q}}
});
document.addEventListener('change',e=>{
if(e.target.id==='role-switch'){role=e.target.value;$('#profile-role').textContent=roleNames[role];render(current);toast('نمایش نقش '+roleNames[role]+' فعال شد.')}
if(e.target.id==='request-filter'){const val=e.target.value;const rows=data.requests.filter(r=>(!val||r.status===val)&&(!searchTerm||[r.id,r.name,r.subject,r.category].join(' ').toLowerCase().includes(searchTerm.toLowerCase())));$('#request-rows').innerHTML=requestRows(rows)}
if(e.target.id==='expert-filter'){const val=e.target.value;document.querySelectorAll('.expert-card').forEach(card=>{const status=card.querySelector('.status')?.textContent||'';card.hidden=!!val&&status!==val})}
});
$('#mobile-menu').addEventListener('click',()=>$('#sidebar').classList.toggle('mobile-menu-open'));
$('#notifications').addEventListener('click',()=>toast('اعلان تازه‌ای در محیط آزمایشی وجود ندارد.'));
$('#profile-button').addEventListener('click',()=>toast('برای تغییر نقش از فهرست بالای صفحه استفاده کنید.'));
$('#role-switch').addEventListener('change',()=>{});
$('#dialog-form').addEventListener('close',()=>{});
$('#dialog-form').addEventListener('submit',()=>{});
if('serviceWorker' in navigator && location.protocol.startsWith('http'))navigator.serviceWorker.register('./sw.js').catch(()=>{});
render('overview');
})();