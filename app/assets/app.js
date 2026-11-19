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
if(!data||typeof data!=='object'||Array.isArray(data))data=JSON.parse(JSON.stringify(seed));
['requests','experts','projects','tasks','activities'].forEach(key=>{if(!Array.isArray(data[key]))data[key]=JSON.parse(JSON.stringify(seed[key]));else data[key]=data[key].filter(item=>item&&typeof item==='object');});
data.experts=data.experts.map(x=>({...x,education:x.education||'ثبت نشده',experience:x.experience||'ثبت نشده',bio:x.bio||'اطلاعات تکمیلی این پروفایل هنوز وارد نشده است.',contact:x.contact||'ثبت نشده',email:x.email||'ثبت نشده',credential:x.credential||'ثبت نشده',documents:Array.isArray(x.documents)?x.documents:[],verification:x.verification||(x.status==='در حال ارزیابی'?'در حال بررسی':x.status||'در حال بررسی')}));
function save(){try{localStorage.setItem(storeKey,JSON.stringify(data))}catch(e){toast('ذخیره‌سازی مرورگر در دسترس نیست.')}}
const titles={overview:'نمای کلی',requests:'درخواست‌ها و پرونده‌ها',consultation:'درخواست مشاوره حقوقی',projects:'پروژه‌ها و وظایف',experts:'اعضا و متخصصان',groups:'کارگروه‌ها و مراکز',knowledge:'بانک دانش حقوقی',documents:'قراردادها و اسناد',academy:'آکادمی و رویدادها',messages:'پیام‌ها و جلسات',market:'بازار خدمات',finance:'امور مالی',assistant:'دستیار حقوقی',reports:'گزارش‌ها و تحلیل',admin:'مدیریت شبکه'};
let current='overview',role='manager',searchTerm='';
const roleNames={manager:'مدیر شبکه',lawyer:'عضو متخصص',client:'متقاضی خدمات'};
const sample='<div class="sample-banner"><span>◇</span><div><b>محیط آزمایشی داتار</b> · اطلاعات این صفحه نمونه است و در مرورگر همین دستگاه ذخیره می‌شود؛ هنوز به پایگاه داده یا سامانه پرداخت آنلاین متصل نیست.</div></div>';
function esc(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>t.classList.remove('show'),2600)}
function heading(kicker,title,desc,action){return '<div class="page-heading"><div><span class="eyebrow">'+kicker+'</span><h1>'+title+'</h1><p>'+desc+'</p></div><div class="heading-actions">'+(action||'')+'</div></div>'}
function stat(label,value,icon,foot){return '<div class="stat-card"><div class="stat-top"><span>'+label+'</span><span class="stat-icon">'+icon+'</span></div><div class="stat-value">'+value+'</div><div class="stat-foot">'+foot+'</div></div>'}
function panel(title,body,link){return '<section class="panel"><div class="panel-head"><h2>'+title+'</h2>'+(link||'')+'</div>'+body+'</section>'}
function statusClass(s){return s==='جدید'?'new':(s==='تکمیل‌شده'||s==='مختومه'?'done':'progress')}
function requestRows(list){return list.map(r=>'<tr><td><strong>'+esc(r.id)+'</strong><small>'+esc(r.date)+'</small></td><td><strong>'+esc(r.name)+'</strong><small>'+esc(r.type)+'</small></td><td><strong>'+esc(r.subject)+'</strong><small>'+esc(r.category)+'</small></td><td>'+esc(r.assignee)+'</td><td><span class="status '+statusClass(r.status)+'">'+esc(r.status)+'</span></td><td><div class="request-row-actions"><button class="btn soft small" data-action="view-request" data-id="'+esc(r.id)+'">جزئیات</button><button class="btn ghost small" data-action="cycle-request" data-id="'+esc(r.id)+'">تغییر وضعیت</button></div></td></tr>').join('')}
function chartSegments(counts){
const colors=['#4e91b8','#f0b45e','#7b77c8','#55b6a0','#e47e78','#8da4b7'];
const total=counts.reduce((n,x)=>n+x.value,0)||1;let cursor=0;
const stops=counts.map((x,i)=>{const from=cursor;cursor+=x.value/total*360;return colors[i%colors.length]+' '+from.toFixed(1)+'deg '+cursor.toFixed(1)+'deg'}).join(',');
return {gradient:'conic-gradient('+stops+')',colors,total};
}
function overview(){
const requests=Array.isArray(data.requests)?data.requests:[];
const experts=Array.isArray(data.experts)?data.experts:[];
const tasks=Array.isArray(data.tasks)?data.tasks:[];
const projects=Array.isArray(data.projects)?data.projects:[];
const activities=Array.isArray(data.activities)?data.activities:[];
const active=requests.filter(x=>!['مختومه','ردشده'].includes(x.status)).length;
const done=requests.filter(x=>x.status==='مختومه').length;
const urgent=requests.filter(x=>['فوری','زمان‌دار'].includes(x.urgency||x.priority)).length;
const openTasks=tasks.filter(x=>!x.done).length;
const statuses=['جدید','در حال بررسی','نیازمند تکمیل اطلاعات','ارجاع‌شده','پذیرفته‌شده','مختومه','ردشده'];
const statusCounts=statuses.map(label=>({label,value:requests.filter(x=>x.status===label).length})).filter(x=>x.value);
const donut=chartSegments(statusCounts.length?statusCounts:[{label:'هنوز داده‌ای ثبت نشده',value:1}]);
const cats={};requests.forEach(x=>{const k=x.category||'سایر';cats[k]=(cats[k]||0)+1});
const categoryRows=Object.entries(cats).sort((a,b)=>b[1]-a[1]).slice(0,5);
const maxCategory=Math.max(1,...categoryRows.map(x=>x[1]));
const categoryBars=categoryRows.length?categoryRows.map((x,i)=>'<div class="metric-bar-row"><div class="metric-bar-label"><span>'+esc(x[0])+'</span><b>'+x[1]+'</b></div><div class="metric-bar-track"><i style="width:'+(x[1]/maxCategory*100)+'%;--bar-color:'+['#4e91b8','#f0b45e','#7b77c8','#55b6a0','#e47e78'][i]+'"></i></div></div>').join(''):'<div class="empty-state">با ثبت درخواست‌ها، نمودار حوزه‌های خدمات تکمیل می‌شود.</div>';
const statusLegend=statusCounts.map((x,i)=>'<div class="chart-legend-item"><i style="background:'+donut.colors[i%donut.colors.length]+'"></i><span>'+esc(x.label)+'</span><b>'+x.value+'</b></div>').join('');
const projectBars=projects.slice(0,4).map((p,i)=>'<div class="project-progress-row"><div><b>'+esc(p.title)+'</b><small>'+esc(p.owner||'واحد مسئول')+'</small></div><strong>'+Number(p.progress||0)+'٪</strong><div class="progress"><i style="width:'+Math.max(0,Math.min(100,Number(p.progress)||0))+'%;background:'+['#4e91b8','#55b6a0','#f0b45e','#8b83c9'][i]+'"></i></div></div>').join('');
const activityHtml=activities.slice(0,4).map(a=>'<div class="activity-item"><span class="activity-mark">'+esc(a.icon||'•')+'</span><div><b>'+esc(a.title)+'</b><small>'+esc(a.meta)+'</small></div><span class="activity-time">'+esc(a.time||'')+'</span></div>').join('')||'<div class="empty-state">فعالیتی ثبت نشده است.</div>';
const taskHtml=tasks.slice(0,4).map((t,i)=>'<div class="task-row"><span style="background:'+(t.done?'#55b6a0':'#f0b45e')+'"></span><div><b>'+esc(t.title)+'</b><small>'+esc(t.meta||'')+'</small></div><button type="button" class="btn soft small" data-action="toggle-task" data-index="'+i+'">'+(t.done?'انجام شد':'انجام')+'</button></div>').join('')||'<div class="empty-state">وظیفه‌ای برای نمایش وجود ندارد.</div>';
const recent=requests.slice(0,4).map(r=>'<tr><td><strong>'+esc(r.id)+'</strong><small>'+esc(r.date||'')+'</small></td><td><strong>'+esc(r.name)+'</strong><small>'+esc(r.category||'')+'</small></td><td>'+esc(r.subject)+'</td><td><span class="status '+statusClass(r.status)+'">'+esc(r.status)+'</span></td><td><button type="button" class="btn soft small" data-action="view-request" data-id="'+esc(r.id)+'">جزئیات</button></td></tr>').join('');
const now=new Date();
const dateLabel=now.toLocaleDateString('fa-IR',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
return sample+
'<section class="dashboard-hero"><div class="hero-copy"><span class="eyebrow">DĀTAR WORKSPACE</span><h1>سلام، به فضای کاری داتار خوش آمدید</h1><p>خدمات حقوقی، اعضای متخصص و فعالیت‌های شبکه را از یک میزکار دنبال کنید.</p><div class="hero-actions"><button type="button" class="btn primary" data-open="request">＋ ثبت درخواست حقوقی</button><button type="button" class="btn light" data-view="experts">مشاهده متخصصان</button></div></div><div class="hero-date"><span class="hero-date-icon">✦</span><b>'+dateLabel+'</b><small>میزکار مدیریت شبکه</small></div><div class="hero-orbit"></div></section>'+
'<div class="grid stats-grid dashboard-stats">'+stat('درخواست‌های در جریان',active,'▤','نیازمند بررسی یا پیگیری')+stat('درخواست‌های مختومه',done,'✓','در داده‌های ثبت‌شده')+stat('اعضای متخصص',experts.length,'♙','پروفایل‌های ثبت‌شده')+stat('اقدامات باز',openTasks,'◷',urgent+' مورد درخواست فوری یا زمان‌دار')+'</div>'+
'<div class="grid dashboard-visual-grid">'+
panel('وضعیت درخواست‌ها','<div class="donut-layout"><div class="donut-chart" style="background:'+donut.gradient+'"><div><b>'+requests.length+'</b><small>کل درخواست‌ها</small></div></div><div class="chart-legend">'+(statusLegend||'<div class="chart-legend-item">هنوز درخواستی ثبت نشده است.</div>')+'</div></div><div class="chart-footnote">نمودار بر اساس وضعیت فعلی درخواست‌های ذخیره‌شده در این مرورگر است.</div>')+
panel('حوزه‌های پرتکرار خدمات','<div class="category-chart">'+categoryBars+'</div><div class="chart-footnote">توزیع موضوعی درخواست‌های ثبت‌شده</div>')+
'</div>'+
'<div class="grid dashboard-lower-grid">'+
panel('فعالیت‌های اخیر','<div class="activity-list">'+activityHtml+'</div>','<button type="button" class="text-link" data-view="requests">همه درخواست‌ها ←</button>')+
panel('پروژه‌ها و پیشرفت','<div class="project-progress-list">'+(projectBars||'<div class="empty-state">پروژه‌ای ثبت نشده است.</div>')+'</div>','<button type="button" class="text-link" data-view="projects">مدیریت پروژه‌ها ←</button>')+
'</div>'+
'<div class="grid dashboard-lower-grid dashboard-lower-second">'+
panel('اقدامات نزدیک','<div class="task-list">'+taskHtml+'</div>')+
panel('آخرین درخواست‌ها','<div class="table-wrap"><table class="data-table"><thead><tr><th>شناسه</th><th>متقاضی</th><th>موضوع</th><th>وضعیت</th><th>عملیات</th></tr></thead><tbody>'+recent+'</tbody></table></div>','<button type="button" class="text-link" data-view="requests">ورود به میز درخواست‌ها ←</button>')+
'</div>'+
'<div class="grid quick-grid"><button type="button" class="quick-action" data-view="consultation"><span>＋</span><div><b>درخواست مشاوره</b><small>ثبت نیاز حقوقی</small></div></button><button type="button" class="quick-action" data-view="experts"><span>♙</span><div><b>یافتن متخصص</b><small>جست‌وجوی اعضای شبکه</small></div></button><button type="button" class="quick-action" data-view="knowledge"><span>▥</span><div><b>بانک دانش</b><small>منابع و محتوای حقوقی</small></div></button><button type="button" class="quick-action" data-view="projects"><span>◫</span><div><b>پروژه‌ها</b><small>مدیریت فعالیت‌ها</small></div></button></div>';
}
function consultation(){
const mine=data.requests.filter(r=>r.source==='public-intake');
const history=mine.length?mine.map(r=>'<article class="intake-history-item"><div><b>'+esc(r.subject)+'</b><small>'+esc(r.id)+' · '+esc(r.date)+' · '+esc(r.category)+'</small></div><span class="status '+statusClass(r.status)+'">'+esc(r.status)+'</span><button class="btn soft small" data-action="view-request" data-id="'+esc(r.id)+'">جزئیات</button></article>').join(''):'<div class="empty-state">هنوز درخواستی از این مسیر در این مرورگر ثبت نشده است.</div>';
return sample+heading('دریافت خدمات حقوقی','درخواست مشاوره و بررسی حقوقی','نیاز حقوقی خود را ثبت کنید تا دبیرخانه آن را از نظر موضوع، فوریت و نوع خدمت بررسی و برای اقدام مناسب ارجاع کند.','')+
'<div class="intake-intro-grid"><article class="intake-intro-card"><span>۱</span><div><b>ثبت مسئله</b><small>موضوع و شرح مختصر را وارد کنید.</small></div></article><article class="intake-intro-card"><span>۲</span><div><b>بررسی و ارجاع</b><small>درخواست از نظر تخصص و فوریت ارزیابی می‌شود.</small></div></article><article class="intake-intro-card"><span>۳</span><div><b>پاسخ و مسیر خدمت</b><small>برای تکمیل اطلاعات یا ارائه خدمت با شما ارتباط می‌گیریم.</small></div></article></div>'+
'<div class="intake-layout"><section class="panel intake-form-panel"><div class="panel-head"><h2>فرم درخواست خدمات حقوقی</h2><span class="required-note">فیلدهای ستاره‌دار الزامی‌اند</span></div><form id="consultation-form" class="intake-form">'+
'<div class="intake-section-title"><b>اطلاعات متقاضی</b><small>اطلاعات تماس را دقیق وارد کنید تا امکان پیگیری وجود داشته باشد.</small></div><div class="intake-fields">'+
'<label class="field">نوع متقاضی <select name="applicantType" required><option value="شخص حقیقی">شخص حقیقی</option><option value="شرکت یا سازمان">شرکت یا سازمان</option><option value="نهاد عمومی">نهاد عمومی</option></select></label>'+
'<label class="field">نام و نام خانوادگی / نام سازمان * <input name="name" required maxlength="120" placeholder="نام کامل یا نام مجموعه"></label>'+
'<label class="field">شماره همراه * <input name="phone" required inputmode="tel" maxlength="20" placeholder="شماره تماس در دسترس"></label>'+
'<label class="field">رایانامه <input name="email" type="email" maxlength="150" placeholder="example@email.com"></label>'+
'<label class="field">شهر محل اقامت یا فعالیت <input name="city" maxlength="80" placeholder="مثلاً تهران"></label>'+
'</div><div class="intake-section-title"><b>شرح نیاز حقوقی</b><small>از درج اطلاعات محرمانه یا اطلاعات هویتی اشخاص ثالث تا حد امکان خودداری کنید.</small></div><div class="intake-fields">'+
'<label class="field">نوع خدمت موردنیاز * <select name="category" required><option value="">انتخاب کنید</option><option>مشاوره حقوقی اولیه</option><option>بررسی قرارداد یا سند</option><option>تنظیم قرارداد و توافق‌نامه</option><option>اختلاف ملکی و ثبتی</option><option>حقوق خانواده و امور حسبی</option><option>حقوق کار و تأمین اجتماعی</option><option>حقوق شرکت‌ها و کسب‌وکار</option><option>مطالبات و دعاوی مالی</option><option>کیفری و جرایم</option><option>داوری، میانجیگری و حل اختلاف</option><option>حقوق اداری و شهرداری</option><option>مالکیت فکری و فناوری</option><option>خدمات حقوقی سازمانی</option><option>سایر موضوعات</option></select></label>'+
'<label class="field">موضوع یا عنوان درخواست * <input name="subject" required maxlength="180" placeholder="مثلاً بررسی اختلاف در قرارداد مشارکت"></label>'+
'<label class="field">وضعیت فعلی موضوع <select name="stage"><option>در مرحله بررسی و تصمیم‌گیری</option><option>در حال مذاکره یا مکاتبه</option><option>اخطار یا اظهارنامه دریافت کرده‌ام</option><option>پرونده در مرجع قضایی یا اداری مطرح است</option><option>رأی یا تصمیم صادر شده است</option><option>موضوع هنوز به اختلاف نرسیده است</option><option>سایر موارد</option></select></label>'+
'<label class="field">میزان فوریت <select name="urgency"><option value="عادی">عادی</option><option value="زمان‌دار">دارای مهلت یا زمان‌بندی</option><option value="فوری">فوری</option></select></label>'+
'<label class="field wide">شرح مسئله و اتفاقات مهم * <textarea name="details" required minlength="20" maxlength="5000" rows="6" placeholder="چه اتفاقی افتاده؟ طرف‌های موضوع چه کسانی هستند؟ چه اقداماتی تاکنون انجام شده؟"></textarea><small class="field-help">شرح روشن و زمان‌بندی‌شده به ارزیابی دقیق‌تر کمک می‌کند.</small></label>'+
'<label class="field wide">نتیجه یا خدمتی که انتظار دارید <textarea name="desired" maxlength="1500" rows="3" placeholder="برای مثال: بررسی قرارداد، اعلام مسیر قانونی، تنظیم پاسخ یا ارجاع به متخصص"></textarea></label>'+
'<label class="field wide">مهلت مهم یا تاریخ جلسه (در صورت وجود) <input name="deadline" maxlength="80" placeholder="مثلاً مهلت پاسخ تا تاریخ ..."></label>'+
'<label class="field wide">مدارک مرتبط <input name="attachments" type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"><small class="field-help">در این نسخه آزمایشی فقط نام فایل‌ها ثبت می‌شود و فایل به دبیرخانه ارسال نمی‌شود. از بارگذاری مدارک محرمانه خودداری کنید.</small></label>'+
'</div><label class="intake-consent"><input type="checkbox" name="consent" required><span>تأیید می‌کنم اطلاعات واردشده تا حد اطلاع من صحیح است و با استفاده از آن برای بررسی و تماس درباره همین درخواست موافقم.</span></label>'+
'<div class="intake-warning"><b>توجه حقوقی</b><p>ثبت درخواست به‌معنای پذیرش وکالت، ایجاد رابطه وکیل و موکل یا تضمین نتیجه نیست. تا زمان بررسی و اعلام رسمی، مهلت‌های قانونی و قضایی را شخصاً رعایت کنید. در موارد اضطراری یا نزدیک به پایان مهلت، به مرجع صالح یا وکیل دارای صلاحیت مراجعه کنید.</p></div>'+
'<div class="intake-submit-row"><button class="btn primary" type="submit">ثبت درخواست و دریافت شماره پیگیری</button><span>ثبت در این پیش‌نمایش روی همین مرورگر انجام می‌شود.</span></div></form></section>'+
'<aside class="intake-side"><section class="panel"><div class="panel-head"><h2>چه خدمات اولیه‌ای دریافت می‌کنید؟</h2></div><ul class="intake-service-list"><li><b>تشخیص اولیه موضوع</b><small>شناسایی حوزه حقوقی و اطلاعات تکمیلی موردنیاز</small></li><li><b>تعیین مسیر اقدام</b><small>پیشنهاد مسیر مناسب برای بررسی یا پیگیری</small></li><li><b>ارجاع به متخصص</b><small>بررسی امکان ارجاع به وکیل یا کارشناس مرتبط</small></li><li><b>بررسی اولیه اسناد</b><small>پس از فراهم‌شدن امکان دریافت امن مدارک</small></li></ul></section><section class="panel"><div class="panel-head"><h2>پیگیری درخواست‌های این دستگاه</h2></div><div class="intake-history">'+history+'</div></section></aside></div>';
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
const requests=Array.isArray(data.requests)?data.requests:[];
const projects=Array.isArray(data.projects)?data.projects:[];
const active=requests.filter(x=>!['مختومه','ردشده'].includes(x.status)).length;
const closed=requests.filter(x=>x.status==='مختومه').length;
const urgent=requests.filter(x=>['فوری','زمان‌دار'].includes(x.urgency||x.priority)).length;
const statusList=['جدید','در حال بررسی','نیازمند تکمیل اطلاعات','ارجاع‌شده','پذیرفته‌شده','مختومه','ردشده'];
const statusCounts=statusList.map(x=>({label:x,value:requests.filter(r=>r.status===x).length})).filter(x=>x.value);
const donut=chartSegments(statusCounts.length?statusCounts:[{label:'بدون داده',value:1}]);
const statusBars=statusCounts.map((x,i)=>'<div class="metric-bar-row"><div class="metric-bar-label"><span>'+esc(x.label)+'</span><b>'+x.value+'</b></div><div class="metric-bar-track"><i style="width:'+(x.value/Math.max(1,...statusCounts.map(y=>y.value))*100)+'%;--bar-color:'+donut.colors[i]+'"></i></div></div>').join('')||'<div class="empty-state">هنوز درخواستی ثبت نشده است.</div>';
const categories={};requests.forEach(x=>{const k=x.category||'سایر';categories[k]=(categories[k]||0)+1});
const catRows=Object.entries(categories).sort((x,y)=>y[1]-x[1]).slice(0,6);
const catMax=Math.max(1,...catRows.map(x=>x[1]));
const catHtml=catRows.map((x,i)=>'<div class="metric-bar-row"><div class="metric-bar-label"><span>'+esc(x[0])+'</span><b>'+x[1]+'</b></div><div class="metric-bar-track"><i style="width:'+(x[1]/catMax*100)+'%;--bar-color:'+['#4e91b8','#f0b45e','#7b77c8','#55b6a0','#e47e78','#8da4b7'][i]+'"></i></div></div>').join('')||'<div class="empty-state">داده‌ای برای تحلیل موضوعی وجود ندارد.</div>';
const projectHtml=projects.map((x,i)=>'<div class="project-progress-row"><div><b>'+esc(x.title)+'</b><small>'+esc(x.owner||'واحد مسئول')+'</small></div><strong>'+Math.max(0,Math.min(100,Number(x.progress)||0))+'٪</strong><div class="progress"><i style="width:'+Math.max(0,Math.min(100,Number(x.progress)||0))+'%;background:'+['#4e91b8','#55b6a0','#f0b45e','#8b83c9'][i%4]+'"></i></div></div>').join('')||'<div class="empty-state">پروژه‌ای برای گزارش وجود ندارد.</div>';
return sample+heading('پایش و ارزیابی','گزارش‌ها و تحلیل عملکرد','شاخص‌ها و نمودارها از داده‌های ثبت‌شده در همین محیط محاسبه می‌شوند.','<button type="button" class="btn ghost" data-action="export-requests">دریافت گزارش درخواست‌ها</button>')+
'<div class="grid stats-grid">'+stat('کل درخواست‌ها',requests.length,'▤','تمام درخواست‌های ثبت‌شده')+stat('در حال پیگیری',active,'◷','درخواست‌های باز')+stat('مختومه',closed,'✓','درخواست‌های بسته‌شده')+stat('فوری یا زمان‌دار',urgent,'⚑','نیازمند توجه')+'</div>'+
'<div class="grid dashboard-visual-grid">'+panel('ترکیب وضعیت درخواست‌ها','<div class="donut-layout"><div class="donut-chart" style="background:'+donut.gradient+'"><div><b>'+requests.length+'</b><small>کل درخواست‌ها</small></div></div><div class="chart-legend">'+statusCounts.map((x,i)=>'<div class="chart-legend-item"><i style="background:'+donut.colors[i]+'"></i><span>'+esc(x.label)+'</span><b>'+x.value+'</b></div>').join('')+'</div></div><div class="chart-footnote">توزیع وضعیت پرونده‌ها بر اساس داده‌های جاری</div>')+
panel('تحلیل حوزه‌های خدمات','<div class="category-chart">'+catHtml+'</div><div class="chart-footnote">موضوعات پرتکرار در درخواست‌های ثبت‌شده</div>')+'</div>'+
'<div class="grid dashboard-lower-grid">'+panel('پیشرفت پروژه‌ها','<div class="project-progress-list">'+projectHtml+'</div>')+
panel('خلاصه عملیاتی','<div class="task-list"><div class="task-row"><span style="background:#4e91b8"></span><div><b>تعداد متخصصان شبکه</b><small>پروفایل‌های ثبت‌شده</small></div><strong>'+data.experts.length+'</strong></div><div class="task-row"><span style="background:#55b6a0"></span><div><b>وظایف انجام‌شده</b><small>از مجموع وظایف</small></div><strong>'+data.tasks.filter(x=>x.done).length+' از '+data.tasks.length+'</strong></div><div class="task-row"><span style="background:#f0b45e"></span><div><b>پروژه‌های فعال</b><small>پروژه‌های در حال اجرا</small></div><strong>'+projects.filter(x=>x.status!=='تکمیل‌شده').length+'</strong></div></div>')+'</div>'+
'<p class="chart-footnote" style="margin-top:13px">این گزارش‌ها صرفاً داده‌های نمونه و محلی این مرورگر را تحلیل می‌کنند و گزارش رسمی عملکرد شبکه محسوب نمی‌شوند.</p>';
}
function admin(){
return sample+heading('راهبری','مدیریت شبکه','مدیریت کاربران، نقش‌ها، مراکز، فرایندها و تنظیمات سامانه.','<button class="btn primary" data-open="user">＋ کاربر جدید</button>')+'<div class="grid feature-grid">'+[['کاربران و نقش‌ها','تعریف نقش متقاضی، متخصص، مدیر مرکز و مدیر شبکه'],['اعتبارسنجی و صلاحیت','ثبت مدارک، بررسی سوابق و تمدید وضعیت عضویت'],['ساختار سازمانی','مدیریت مراکز، کارگروه‌ها و شعب استانی'],['فرایندها و استانداردها','تعریف گردش کار، فرم‌ها و معیارهای کیفیت'],['امنیت و دسترسی','ثبت رویداد، کنترل دسترسی و سیاست نگهداری داده'],['تنظیمات سامانه','نام، نشان، اطلاعات تماس و پیکربندی عمومی']].map(x=>'<article class="feature-card"><span>⚙</span><h3>'+x[0]+'</h3><p>'+x[1]+'</p><a class="text-link" href="#" data-action="notify" data-message="مدیریت این بخش در نسخه عملیاتی فعال خواهد شد.">مدیریت بخش ←</a></article>').join('')+'</div>';
}
const renderers={overview,requests,consultation,projects,experts,groups,knowledge,documents,academy,messages,market,finance,assistant,reports,admin};
function render(view=current,resetSearch=true){
try{
if(view==='project')view='projects';if(view==='request')view='consultation';
if(!renderers[view])view='overview';
if(resetSearch)searchTerm='';current=view;page.innerHTML=renderers[view]();
$('#crumb-title').textContent=titles[view]||titles.overview;
document.querySelectorAll('.nav-link,.mobile-bottom button').forEach(b=>b.classList.toggle('active',b.dataset.view===view));
document.querySelectorAll('.nav-link').forEach(b=>{const restricted=role==='client'&&['projects','groups','finance','reports','admin'].includes(b.dataset.view);b.hidden=restricted;});
if(role==='client'&&['projects','groups','finance','reports','admin'].includes(view)){render('overview',false);return;}
const badge=$('#request-badge');if(badge)badge.textContent=String(data.requests.filter(r=>r.status==='جدید').length);
page.focus({preventScroll:true});
}catch(err){console.error('Datar render error:',err);page.innerHTML='<section class="panel app-error-panel"><h2>بارگذاری این بخش با خطا مواجه شد</h2><p>اطلاعات نمایشی مرورگر را بررسی یا صفحه را تازه‌سازی کنید.</p><button type="button" class="btn primary" onclick="location.reload()">بارگذاری مجدد</button></section>';}
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
title.textContent=t;box.innerHTML=body;box.querySelectorAll('button:not([type])').forEach(button=>button.type='button');dlg.dataset.type=type;if(type==='expert'&&Number.isInteger(extra)){const p=data.experts[extra];if(p){dlg.dataset.editIndex=String(extra);for(const [k,val] of Object.entries({name:p.name,city:p.city,field:p.field,level:p.level,education:p.education,experience:p.experience,credential:p.credential,contact:p.contact,email:p.email,tags:(p.tags||[]).join('، '),bio:p.bio,documents:(p.documents||[]).join('، ')})){const el=box.querySelector('[name="'+k+'"]');if(el)el.value=val}}}else{delete dlg.dataset.editIndex}dlg.showModal();
}
function showExpertProfile(index){
const x=data.experts[index];if(!x)return;
const dlg=$('#action-dialog'),box=$('#dialog-content');
$('#dialog-title').textContent='پروفایل تخصصی عضو';
const docs=(x.documents||[]).length?(x.documents||[]).map(d=>'<span class="doc-chip">▧ '+esc(d)+'</span>').join(''):'مدرکی در نسخه نمایشی ثبت نشده است';
let controls='';
if(role==='manager'&&x.verification!=='تأییدشده')controls='<div class="verify-actions"><button type="button" class="btn primary" data-action="verify-expert" data-index="'+index+'" data-status="تأییدشده">تأیید صلاحیت</button ><button type="button" class="btn soft" data-action="verify-expert" data-index="'+index+'" data-status="نیازمند تکمیل">درخواست تکمیل مدارک</button ><button type="button" class="btn ghost" data-action="verify-expert" data-index="'+index+'" data-status="ردشده">رد درخواست</button></div>';
else if(role!=='manager'&&x.verification!=='تأییدشده')controls='<div class="verify-actions"><button type="button" class="btn primary" data-action="verify-expert" data-index="'+index+'" data-status="در حال بررسی">ارسال مجدد برای بررسی</button></div>';
box.innerHTML='<div class="profile-sheet"><div class="profile-hero"><span class="profile-avatar">'+esc(x.name.slice(0,1))+'</span><div><h3>'+esc(x.name)+'</h3><p>'+esc(x.level)+' · '+esc(x.city)+'</p><span class="status '+(x.verification==='تأییدشده'?'done':x.verification==='ردشده'?'new':'progress')+'">'+esc(x.verification)+'</span></div></div><div class="profile-facts"><div><small>حوزه تخصص اصلی</small><b>'+esc(x.field)+'</b></div><div><small>تحصیلات</small><b>'+esc(x.education)+'</b></div><div><small>سابقه حرفه‌ای</small><b>'+esc(x.experience)+'</b></div><div><small>شماره پروانه / شناسه حرفه‌ای</small><b>'+esc(x.credential)+'</b></div><div><small>راه ارتباطی</small><b>'+esc(x.contact)+'</b></div><div><small>رایانامه</small><b>'+esc(x.email)+'</b></div></div><div class="profile-section"><b>معرفی حرفه‌ای</b><p>'+esc(x.bio)+'</p></div><div class="profile-section"><b>تخصص‌های تکمیلی</b><div class="expert-tags">'+(x.tags||[]).map(t=>'<span>'+esc(t)+'</span>').join('')+'</div></div><div class="profile-section"><b>مدارک و مستندات ثبت‌شده</b><div class="doc-list">'+docs+'</div></div><p class="muted">وضعیت این پروفایل صرفاً در مرورگر شما ذخیره می‌شود. تأیید نمایشی به معنای احراز واقعی صلاحیت یا اصالت مدارک نیست.</p>'+controls+'</div>';
box.querySelectorAll('button:not([type])').forEach(button=>button.type='button');dlg.dataset.type='profile';dlg.showModal();
}
function submitDialog(e){
const form=e.target;if(e.submitter&&e.submitter.value==='cancel'){$('#action-dialog').close();return;}
const type=$('#action-dialog').dataset.type;const fd=new FormData(form);const v=Object.fromEntries(fd.entries());
if(type==='request-detail'){const item=data.requests.find(x=>x.id===$('#action-dialog').dataset.requestId);if(item){item.status=v.status;item.assignee=v.assignee||'تعیین نشده';item.internalNote=v.internalNote||'';item.reviewedAt=new Date().toLocaleString('fa-IR');toast('اطلاعات بررسی درخواست به‌روزرسانی شد.')}}
else if(type==='request'){
const id='DT-1405-'+String(data.requests.length+1).padStart(3,'0');
data.requests.unshift({id,name:v.name,type:roleNames[role],subject:v.subject,category:v.category,status:'جدید',date:'۱۴۰۵/۰۸/۲۸',assignee:'تعیین نشده',priority:v.priority});
data.activities.unshift({icon:'▤',title:'درخواست جدید ثبت شد',meta:v.name+' · '+id,time:'اکنون'});toast('درخواست در محیط آزمایشی ثبت شد: '+id);
}else if(type==='expert'){const profile={name:v.name,field:v.field,level:v.level,city:v.city,tags:(v.tags||'').split(/[،,]/).map(x=>x.trim()).filter(Boolean),education:v.education,experience:v.experience,credential:v.credential,contact:v.contact,email:v.email,bio:v.bio||'اطلاعات تکمیلی ثبت نشده است.',documents:(v.documents||'').split(/[،,]/).map(x=>x.trim()).filter(Boolean),status:'در حال بررسی',verification:'در حال بررسی'};const editIndex=$('#action-dialog').dataset.editIndex;if(editIndex!==undefined&&data.experts[Number(editIndex)]){Object.assign(data.experts[Number(editIndex)],profile);toast('پروفایل ویرایش شد و برای بررسی مجدد قرار گرفت.')}else{data.experts.unshift(profile);data.activities.unshift({icon:'♙',title:'پروفایل تخصصی جدید ثبت شد',meta:v.name+' · در انتظار اعتبارسنجی',time:'اکنون'});toast('پروفایل ثبت شد و در صف اعتبارسنجی قرار گرفت.')}}
else if(type==='project'){data.projects.unshift({title:v.title,owner:v.owner,progress:Math.max(0,Math.min(100,Number(v.progress)||0)),due:v.due,status:'در حال اجرا'});toast('پروژه جدید ایجاد شد.')}
else{toast('اطلاعات در این نسخه نمایشی ثبت شد؛ برای ذخیره ساختاریافته در نسخه عملیاتی به سرویس مرکزی نیاز است.')}
save();$('#action-dialog').close();render(current);
}
function submitConsultation(form){
const fd=new FormData(form);const files=Array.from(form.querySelector('[name="attachments"]').files||[]);
if(files.length>5){toast('حداکثر ۵ فایل را انتخاب کنید.');return}
if(files.some(f=>f.size>10*1024*1024)){toast('حجم هر فایل باید کمتر از ۱۰ مگابایت باشد.');return}
const now=new Date();const id='DT-'+new Intl.DateTimeFormat('fa-IR',{year:'numeric'}).format(now)+'-'+String(Math.floor(100000+Math.random()*900000)).replace(/[0-9]/g,d=>'۰۱۲۳۴۵۶۷۸۹'[Number(d)]);
const item={id,name:String(fd.get('name')||'').trim(),type:fd.get('applicantType'),phone:String(fd.get('phone')||'').trim(),contact:String(fd.get('phone')||'').trim(),email:String(fd.get('email')||'').trim(),city:String(fd.get('city')||'').trim(),category:fd.get('category'),subject:String(fd.get('subject')||'').trim(),stage:fd.get('stage'),urgency:fd.get('urgency'),priority:fd.get('urgency'),details:String(fd.get('details')||'').trim(),desired:String(fd.get('desired')||'').trim(),deadline:String(fd.get('deadline')||'').trim(),attachments:files.map(f=>f.name),status:'جدید',date:now.toLocaleDateString('fa-IR'),createdAt:now.getTime(),assignee:'تعیین نشده',source:'public-intake'};
data.requests.unshift(item);data.activities.unshift({icon:'✚',title:'درخواست مشاوره حقوقی جدید ثبت شد',meta:item.name+' · '+item.id,time:now.toLocaleTimeString('fa-IR',{hour:'2-digit',minute:'2-digit'})});
save();
page.innerHTML=sample+heading('درخواست ثبت شد','درخواست شما در این مرورگر ثبت شد','شماره پیگیری زیر را برای مراجعه بعدی نگهداری کنید.','')+'<section class="panel intake-success"><div class="success-mark">✓</div><h2>شماره پیگیری درخواست</h2><strong class="tracking-code">'+esc(id)+'</strong><p>موضوع: '+esc(item.subject)+'</p><p>وضعیت فعلی: <span class="status new">جدید</span></p><div class="intake-warning"><b>محدودیت نسخه آزمایشی</b><p>این ثبت فقط در حافظه مرورگر همین دستگاه ذخیره شده و هنوز به دبیرخانه شبکه ارسال نشده است. برای ارسال و بررسی واقعی، باید سرویس مرکزی و محل امن بارگذاری مدارک راه‌اندازی شود.</p></div><div class="dialog-actions"><button class="btn primary" data-view="consultation">ثبت درخواست دیگر</button><button class="btn ghost" data-view="requests">مشاهده فهرست درخواست‌ها</button></div></section>';
page.focus({preventScroll:true});
}
function exportCsv(){
const rows=[['شناسه','متقاضی','نوع','موضوع','حوزه','وضعیت','تاریخ'],...data.requests.map(r=>[r.id,r.name,r.type,r.subject,r.category,r.status,r.date])];
const csv='\uFEFF'+rows.map(row=>row.map(v=>'"'+String(v??'').replace(/"/g,'""')+'"').join(',')).join('\n');
const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));a.download='datar-requests.csv';a.click();URL.revokeObjectURL(a.href);toast('فایل خروجی آماده شد.');
}
document.addEventListener('click',e=>{
const nav=e.target.closest('[data-view]');if(nav){render(nav.dataset.view,true);$('#sidebar').classList.remove('mobile-menu-open');return}
const open=e.target.closest('[data-open]');if(open){if(open.dataset.open==='request'){render('consultation');return}openDialog(open.dataset.open);return}
const action=e.target.closest('[data-action]');if(!action)return;
const kind=action.dataset.action;
if(kind==='notify')toast(action.dataset.message||'این قابلیت در نسخه عملیاتی فعال می‌شود.');
if(kind==='view-request'){const item=data.requests.find(x=>x.id===action.dataset.id);if(item){if(role!=='manager'){$('#dialog-title').textContent='وضعیت درخواست '+item.id;$('#dialog-content').innerHTML='<div class="request-detail-sheet"><div class="profile-facts"><div><small>شماره پیگیری</small><b>'+esc(item.id)+'</b></div><div><small>وضعیت</small><b>'+esc(item.status)+'</b></div><div><small>موضوع</small><b>'+esc(item.subject)+'</b></div><div><small>تاریخ ثبت</small><b>'+esc(item.date)+'</b></div></div><p class="muted">برای پیگیری واقعی از طریق دبیرخانه، نسخه عملیاتی سامانه باید به سرویس مرکزی متصل شود.</p></div>';$('#action-dialog').dataset.type='readonly';$('#action-dialog').showModal();return}const box=$('#dialog-content');$('#dialog-title').textContent='جزئیات درخواست '+item.id;box.innerHTML='<div class="request-detail-sheet"><div class="profile-facts"><div><small>متقاضی</small><b>'+esc(item.name)+'</b></div><div><small>راه تماس</small><b>'+esc(item.phone||item.contact||'ثبت نشده')+'</b></div><div><small>نوع خدمت</small><b>'+esc(item.category)+'</b></div><div><small>فوریت</small><b>'+esc(item.urgency||item.priority||'عادی')+'</b></div><div><small>تاریخ ثبت</small><b>'+esc(item.date)+'</b></div><div><small>وضعیت</small><b>'+esc(item.status)+'</b></div></div><div class="profile-section"><b>شرح مسئله</b><p>'+esc(item.details||'شرح تفصیلی ثبت نشده است.')+'</p></div><div class="profile-section"><b>نتیجه مورد انتظار</b><p>'+esc(item.desired||'ثبت نشده')+'</p></div><div class="profile-section"><b>فایل‌های انتخاب‌شده</b><p>'+esc((item.attachments||[]).join('، ')||'فایلی ثبت نشده')+'</p></div><div class="intake-form" id="request-review-fields"><label class="field">وضعیت رسیدگی<select name="status">'+['جدید','در حال بررسی','نیازمند تکمیل اطلاعات','ارجاع‌شده','پذیرفته‌شده','مختومه','ردشده'].map(s=>'<option '+(s===item.status?'selected':'')+'>'+s+'</option>').join('')+'</select></label><label class="field">مسئول یا واحد رسیدگی<input name="assignee" value="'+esc(item.assignee||'')+'"></label><label class="field wide">یادداشت داخلی دبیرخانه<textarea name="internalNote" rows="3">'+esc(item.internalNote||'')+'</textarea></label><button class="btn primary" type="submit">ذخیره نتیجه بررسی</button></div></div>';$('#action-dialog').dataset.type='request-detail';$('#action-dialog').dataset.requestId=item.id;$('#action-dialog').showModal()}}
if(kind==='view-expert')showExpertProfile(Number(action.dataset.index));
if(kind==='edit-expert'){const idx=Number(action.dataset.index);$('#action-dialog').close();openDialog('expert',idx)}
if(kind==='verify-expert'){const p=data.experts[Number(action.dataset.index)];if(p){p.verification=action.dataset.status;p.status=action.dataset.status;save();showExpertProfile(Number(action.dataset.index));toast('وضعیت اعتبارسنجی تغییر کرد.')}}
if(kind==='toggle-task'){const t=data.tasks[Number(action.dataset.index)];if(t){t.done=!t.done;save();render(current)}}
if(kind==='cycle-request'){const r=data.requests.find(x=>x.id===action.dataset.id);if(r){const states=['جدید','در حال بررسی','نیازمند تکمیل اطلاعات','ارجاع‌شده','پذیرفته‌شده','مختومه'];r.status=states[(states.indexOf(r.status)+1)%states.length];save();render(current);toast('وضعیت درخواست به‌روزرسانی شد.')}}
if(kind==='export-requests')exportCsv();
if(kind==='order-service'){render('consultation');setTimeout(()=>{const s=$('#consultation-form input[name="subject"]');if(s)s.value='درخواست خدمت: '+action.dataset.service},0)}
if(kind==='assistant-demo'){const q=$('#assistant-question').value.trim();$('#assistant-result').textContent=q?'درخواست شما آماده ثبت در صف تحلیل است. در نسخه فعلی پاسخی تولید نمی‌شود؛ پس از اتصال مدل و منابع رسمی، خروجی مستند و قابل ارجاع ارائه خواهد شد.':'ابتدا موضوع یا پرسش را وارد کنید.'}
});
document.addEventListener('submit',e=>{if(e.target.id==='dialog-form'){e.preventDefault();submitDialog(e);return}if(e.target.id==='consultation-form'){e.preventDefault();submitConsultation(e.target);return}if(e.target.id==='request-review-form'){e.preventDefault();const f=e.target;const fd=new FormData(f);const item=data.requests.find(x=>x.id===$('#action-dialog').dataset.requestId);if(item){item.status=fd.get('status');item.assignee=fd.get('assignee')||'تعیین نشده';item.internalNote=fd.get('internalNote')||'';item.reviewedAt=new Date().toLocaleString('fa-IR');save();$('#action-dialog').close();render('requests');toast('نتیجه بررسی ذخیره شد.')}return}});
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
window.addEventListener('error',event=>{console.error('Datar runtime error:',event.error||event.message);document.documentElement.classList.add('app-runtime-error');});
window.addEventListener('unhandledrejection',event=>{console.error('Datar async error:',event.reason);});
if('serviceWorker' in navigator && location.protocol.startsWith('http'))navigator.serviceWorker.register('./sw.js',{updateViaCache:'none'}).then(reg=>reg.update()).catch(err=>console.warn('Datar service worker:',err));
render('overview');
})();