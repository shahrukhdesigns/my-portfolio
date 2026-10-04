"use strict";

/* ============ SAFE STORAGE ============ */
var memStore={};
var store={
g:function(k){try{return localStorage.getItem(k)}catch(e){return (k in memStore)?memStore[k]:null}},
s:function(k,v){try{localStorage.setItem(k,v)}catch(e){memStore[k]=v}},
d:function(k){try{localStorage.removeItem(k)}catch(e){delete memStore[k]}}
};

/* ============ DEFAULTS ============ */
var DEFAULTS={
auth:{user:'admin',pass:'shahrukh123'},
theme:{accent:'#d7ff3f',bg:'#050505',card:'#121212'},
hero:{badge:'Available for Freelance Work',tag:'Graphic Designer',hBefore:'Design That',hAccent:'Defines',hAfter:'Brands.',desc:"Hey, I'm Shahrukh — I create bold, strategic, and memorable designs that help brands stand out and connect with their audience.",photo:'shahrukh.jpg'},
categories:[{key:'mascot',label:'Mascot Logos'},{key:'characters',label:'Characters'},{key:'lettering',label:'Lettering'},{key:'emblems',label:'Emblems'},{key:'designs',label:'Print Designs'}],
projects:[
{t:'Accountability Eagle',sub:'Mascot Logo',c:'mascot',img:'img/01 - Accountability Eagle Mascot Logo (4).png'},
{t:'Warriors Champion 2026',sub:'Spartan Mascot Logo',c:'mascot',img:'img/02 - Warriors Spartan Mascot Logo.png'},
{t:'Walkies with Jemma',sub:'Pet Care Mascot Logo',c:'mascot',img:'img/03 - Pet Care Cartoon Mascot Logo.png'},
{t:'Phoenix Rising',sub:'Vector Illustration',c:'characters',img:'img/04 - Phoenix Bird Vector Illustration.png'},
{t:'Royal Crown Event',sub:'Event Logo',c:'lettering',img:'img/05 - Royal Crown Event Logo.png'},
{t:'Tovar Family Reunion',sub:'Vintage Emblem',c:'emblems',img:'img/06 - Family Tree Vintage Emblem.png'},
{t:'Pink Ribbon Awareness',sub:'Awareness Design',c:'designs',img:'img/07 - Pink Ribbon Awareness Design (1).png'},
{t:'Sea Turtle Symphony',sub:'Music Mascot Logo',c:'mascot',img:'img/08 - Sea Turtle Music Mascot Logo.png'},
{t:'Ice Cold Customs',sub:'Gothic Custom Lettering',c:'lettering',img:'img/09 - Gothic Custom Lettering Logo.png'},
{t:"She's From Texas",sub:'Football Bling Design',c:'designs',img:'img/10 - Texas Football Bling Design.png'},
{t:'ICC Monogram',sub:'Gothic Letter Monogram',c:'lettering',img:'img/11 - Gothic Letter Monogram Logo.png'},
{t:'Stronger Together',sub:'Autism Awareness Logo',c:'mascot',img:'img/12 - Autism Awareness Superhero Logo.png'},
{t:'Custom Family Portrait',sub:'Vector Art',c:'characters',img:'img/13 - Custom Family Vector Portrait.png'},
{t:'Bad Mom Energy',sub:'Pin-Up Character',c:'characters',img:'img/14 - Bold Pin-Up Character Logo.png'},
{t:'Retro Cheer Squad',sub:'Cheerleading Design',c:'lettering',img:'img/15 - Retro Cheer Squad Logo.png'},
{t:'Boss Roofing',sub:'Ribbon Logo',c:'lettering',img:'img/16 - Roofing Company Ribbon Logo.png'},
{t:"Angie's Kitchen",sub:'Bakery Wreath Logo',c:'lettering',img:'img/17 - Bakery Wreath Logo Design.png'},
{t:'Vintage Nautical Poster',sub:'Poster Illustration',c:'designs',img:'img/18 - Vintage Nautical Poster Illustration.png'},
{t:'Pirate Heraldic Crest',sub:'Crest Logo',c:'emblems',img:'img/19 - Pirate Heraldic Crest Logo.png'},
{t:'Conant Football',sub:'Team Helmet Logo',c:'mascot',img:'img/20 - Football Team Helmet Logo.png'},
{t:'USN Anchors',sub:'Nautical Design',c:'emblems',img:'img/21 - USN Anchors Nautical Design.png'},
{t:'Best in the West 2026',sub:'Tire Design',c:'designs',img:'img/22 - Best in the West Tire Design.png'},
{t:'Alice Coyotes',sub:'Never Forget Design',c:'designs',img:'img/23 - Alice Coyotes Never Forget Design.png'}],
skills:[{n:'Mascot Logo Design',v:95},{n:'Vector Illustration',v:92},{n:'Custom Lettering',v:90},{n:'Emblems & Crests',v:88},{n:'Print Design',v:85},{n:'Typography',v:80}],
stats:[{n:120,label:'Projects Completed'},{n:80,label:'Happy Clients'},{n:3,label:'Years Experience'},{n:15,label:'Design Awards'}],
about:{text:"I'm Shahrukh, a graphic designer and the founder of Shahrukh's Designs. I specialize in mascot logos, vector characters, custom lettering, and print designs. I believe good design is more than aesthetics — it's about creating meaningful connections between brands and people.",sign:'Shahrukh',email:'shahrukhsdesigns@gmail.com'},
reviews:[{name:'Ali Raza',role:'Founder, Pet Care Plus',text:'Shahrukh understood our vision perfectly and delivered a mascot logo that truly represents our brand. Exceptional work!'},{name:'Bilal Khan',role:'Coach, Warriors FC',text:'Professional, creative, and highly reliable. The mascot design exceeded our expectations!'},{name:'Sara Malik',role:"Owner, Angie's Kitchen",text:'The logo was modern, elegant, and exactly what we needed to stand out. Highly recommended!'}],
socials:[{label:'Instagram',url:'#'},{label:'Behance',url:'#'},{label:'Dribbble',url:'#'},{label:'LinkedIn',url:'#'},{label:'WhatsApp',url:'#'}]
};

/* ============ HELPERS ============ */
function deepMerge(b,o){var r=JSON.parse(JSON.stringify(b));for(var k in o){if(o[k]&&typeof o[k]==='object'&&!Array.isArray(o[k])&&typeof r[k]==='object'&&!Array.isArray(r[k]))r[k]=deepMerge(r[k],o[k]);else r[k]=o[k];}return r;}
function loadCfg(){var s=store.g('sd_settings');if(s){try{return deepMerge(DEFAULTS,JSON.parse(s));}catch(e){}}return JSON.parse(JSON.stringify(DEFAULTS));}
function esc(s){var d=document.createElement('div');d.textContent=(s==null?'':String(s));return d.innerHTML;}
function initials(n){return (n||'?').split(' ').map(function(w){return w[0];}).slice(0,2).join('').toUpperCase();}
function hexRgb(h){h=String(h||'').replace('#','');if(h.length===3)h=h.split('').map(function(c){return c+c;}).join('');return[parseInt(h.slice(0,2),16)||0,parseInt(h.slice(2,4),16)||0,parseInt(h.slice(4,6),16)||0];}
function mix(h,t,a){return hexRgb(h).map(function(v){return Math.round(v+(t-v)*a);});}
function rgbStr(c){return 'rgb('+c.join(',')+')';}
function slug(s){return s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');}
var cfg=loadCfg(),currentFilter='all';

/* ============ USERS + SESSION + MESSAGES ============ */
function getUsers(){var s=store.g('sd_users');if(s){try{return JSON.parse(s)||[];}catch(e){}}return[];}
function saveUsers(u){store.s('sd_users',JSON.stringify(u));}
function getSession(){return store.g('sd_session');}
function setSession(v){if(v)store.s('sd_session',v);else store.d('sd_session');}
function isAdmin(){return getSession()==='ADMIN';}
function currentUser(){if(isAdmin())return{name:'Administrator',email:'admin',role:'admin'};var em=getSession();if(!em)return null;var u=getUsers().filter(function(x){return x.email===em;})[0];return u?{name:u.name,email:u.email,role:'user'}:null;}
function getMsgs(){var s=store.g('sd_messages');if(s){try{return JSON.parse(s)||[];}catch(e){}}return[];}
function saveMsgs(m){store.s('sd_messages',JSON.stringify(m));}

/* ============ TOAST + SAVE ============ */
var toastT;
function toast(m){var t=document.getElementById('toast');t.textContent=m;t.classList.add('show');clearTimeout(toastT);toastT=setTimeout(function(){t.classList.remove('show');},2400);}
function save(silent){try{store.s('sd_settings',JSON.stringify(cfg));if(!silent)toast('✓ Saved! Portfolio updated');}catch(e){alert('Storage is full! Delete some items or use smaller images.');}}
var saveT;function autoSave(){clearTimeout(saveT);saveT=setTimeout(function(){save(true);},700);}
function fileToDataURL(f,cb){var r=new FileReader();r.onload=function(){if(f.type==='image/svg+xml'){cb(r.result);return;}var img=new Image();img.onload=function(){var MAX=1000,w=img.width,h=img.height;if(w>MAX||h>MAX){var s=Math.min(MAX/w,MAX/h);w=Math.round(w*s);h=Math.round(h*s);}var c=document.createElement('canvas');c.width=w;c.height=h;c.getContext('2d').drawImage(img,0,0,w,h);cb(f.type==='image/png'?c.toDataURL('image/png'):c.toDataURL('image/jpeg',.85));};img.src=r.result;};r.readAsDataURL(f);}

/* ============ PORTFOLIO RENDER ============ */
function applyTheme(){var r=document.documentElement.style,a=cfg.theme.accent;r.setProperty('--accent',a);r.setProperty('--accent-rgb',hexRgb(a).join(','));r.setProperty('--accent-light',rgbStr(mix(a,255,.35)));r.setProperty('--accent-dark',rgbStr(mix(a,0,.18)));r.setProperty('--bg',cfg.theme.bg);r.setProperty('--card',cfg.theme.card);}
function applyHero(){document.getElementById('heroBadge').textContent=cfg.hero.badge;document.getElementById('heroTag').textContent=cfg.hero.tag;document.getElementById('heroH1').innerHTML=esc(cfg.hero.hBefore)+' <span class="serif">'+esc(cfg.hero.hAccent)+'</span> '+esc(cfg.hero.hAfter);document.getElementById('heroDesc').textContent=cfg.hero.desc;document.getElementById('heroPhoto').src=cfg.hero.photo;}
function applyMarquee(){var items=cfg.categories.map(function(c){return '<span>'+esc(c.label)+' ✦</span>';}).join('');document.getElementById('marqueeTrack').innerHTML='<div class="marquee-group">'+items+'</div><div class="marquee-group" aria-hidden="true">'+items+'</div>';}
function catLabel(k){var c=cfg.categories.filter(function(x){return x.key===k;})[0];return c?c.label:k;}
function renderFilters(){var h='<button class="filter-btn" data-cat="all">All Work</button>';cfg.categories.forEach(function(c){h+='<button class="filter-btn" data-cat="'+esc(c.key)+'">'+esc(c.label)+'</button>';});document.getElementById('filters').innerHTML=h;}
function renderProjectsFront(){var g=document.getElementById('grid');g.innerHTML='';cfg.projects.forEach(function(p){var card=document.createElement('div');card.className='card';card.setAttribute('data-category',p.c);card.innerHTML='<div class="card-img"><span class="card-arrow">↗</span></div><div class="card-body"><div><h3>'+esc(p.t)+'</h3><p>'+esc(p.sub||catLabel(p.c))+'</p></div></div>';if(p.img)card.querySelector('.card-img').style.backgroundImage='url("'+p.img+'")';g.appendChild(card);});setFilter(currentFilter);}
function setFilter(cat){currentFilter=cat;document.querySelectorAll('.filter-btn').forEach(function(b){b.classList.toggle('active',b.getAttribute('data-cat')===cat);});document.querySelectorAll('#grid .card').forEach(function(c){c.classList.toggle('hidden',cat!=='all'&&c.getAttribute('data-category')!==cat);});}
function renderStatsFront(){document.getElementById('statsGrid').innerHTML=cfg.stats.map(function(s){return '<div><div class="stat-num" data-target="'+(+s.n||0)+'">0</div><div class="stat-label">'+esc(s.label)+'</div></div>';}).join('');}
function renderSkillsFront(){document.getElementById('skillList').innerHTML=cfg.skills.map(function(s){return '<div class="skill"><div class="skill-top"><span>'+esc(s.n)+'</span><span>'+(+s.v||0)+'%</span></div><div class="bar"><div class="bar-fill" data-value="'+(+s.v||0)+'"></div></div></div>';}).join('');}
function renderReviewsFront(){document.getElementById('reviewsGrid').innerHTML=cfg.reviews.map(function(r){return '<div class="review reveal"><span class="quote">"</span><div class="review-top"><div class="avatar">'+esc(initials(r.name))+'</div><div><h4>'+esc(r.name)+'</h4><small>'+esc(r.role)+'</small></div></div><p>'+esc(r.text)+'</p><div class="stars">★★★★★</div></div>';}).join('');}
function renderAboutFront(){document.getElementById('aboutText').textContent=cfg.about.text;document.getElementById('aboutSign').textContent=cfg.about.sign;document.getElementById('mailLink').href='mailto:'+cfg.about.email;}
function renderSocialsFront(){document.getElementById('socials').innerHTML=cfg.socials.map(function(s){return '<a href="'+esc(s.url)+'" target="_blank">'+esc(s.label)+'</a>';}).join('');}

var statObs,skillObs,revObs;
function initAnims(){try{
if(statObs)statObs.disconnect();if(skillObs)skillObs.disconnect();if(revObs)revObs.disconnect();
statObs=new IntersectionObserver(function(es,o){es.forEach(function(e){if(!e.isIntersecting)return;o.unobserve(e.target);e.target.querySelectorAll('.stat-num').forEach(function(num){var t=+num.getAttribute('data-target'),d=1600,st=performance.now();(function tick(n){var p=Math.min((n-st)/d,1);num.textContent=Math.floor(t*(1-Math.pow(1-p,3)))+(p===1?'+':'');if(p<1)requestAnimationFrame(tick);})(st);});});},{threshold:.4});
statObs.observe(document.getElementById('statsGrid'));
skillObs=new IntersectionObserver(function(es,o){es.forEach(function(e){if(!e.isIntersecting)return;o.unobserve(e.target);e.target.querySelectorAll('.bar-fill').forEach(function(b){b.style.width=b.getAttribute('data-value')+'%';});});},{threshold:.25});
skillObs.observe(document.getElementById('skillList'));
revObs=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');revObs.unobserve(e.target);}});},{threshold:.12});
document.querySelectorAll('.reveal').forEach(function(el){revObs.observe(el);});
}catch(e){
document.querySelectorAll('.reveal').forEach(function(el){el.classList.add('in');});
document.querySelectorAll('.bar-fill').forEach(function(b){b.style.width=b.getAttribute('data-value')+'%';});
document.querySelectorAll('.stat-num').forEach(function(n){n.textContent=n.getAttribute('data-target')+'+';});
}}
function applyAll(){applyTheme();applyHero();applyMarquee();renderFilters();renderProjectsFront();renderStatsFront();renderSkillsFront();renderReviewsFront();renderAboutFront();renderSocialsFront();renderAccount();renderAuthArea();initAnims();}

/* ============ AUTH AREA ============ */
function renderAuthArea(){var area=document.getElementById('authArea');if(!area)return;var me=currentUser();
if(!me){area.innerHTML='<button type="button" class="auth-mini mi-login" id="btnLoginMini">Login</button><button type="button" class="auth-mini mi-signup" id="btnSignupMini">Sign Up</button>';
document.getElementById('btnLoginMini').onclick=function(){openAuth('login');};
document.getElementById('btnSignupMini').onclick=function(){openAuth('signup');};
}else{
var m=(me.role==='admin'?'<button type="button" id="umDash">🏠 Go to Dashboard</button>':'')+'<button type="button" class="danger" id="umLogout">↩ Logout</button>';
area.innerHTML='<div class="user-chip" id="userChip"><div class="av">'+esc(initials(me.name))+'</div><span class="un">'+esc(me.name)+'</span><span class="role-badge '+me.role+'">'+me.role+'</span><div id="userMenu">'+m+'</div></div>';
document.getElementById('userChip').onclick=function(e){if(e.target.closest('#userMenu'))return;document.getElementById('userMenu').classList.toggle('open');};
var d=document.getElementById('umDash');if(d)d.onclick=function(){openAdmin();};
document.getElementById('umLogout').onclick=doLogout;
}}
function doLogout(){setSession(null);applyAll();toast('✓ Logged out');}
document.addEventListener('click',function(e){var um=document.getElementById('userMenu');if(um&&!e.target.closest('.user-chip'))um.classList.remove('open');});

/* ============ ACCOUNT SECTION ============ */
function renderAccount(){var box=document.getElementById('accountBox');if(!box)return;var me=currentUser();
if(!me){
box.innerHTML='<p class="section-label center">07 — Account</p><h2>Login or <span class="serif">Sign Up.</span></h2><p>Create a free account to stay connected with new designs, or log in with admin credentials to manage the site.</p><div class="acc-btns"><button type="button" class="btn" id="accLogin">Login →</button><button type="button" class="btn btn-outline" id="accSignup">Create Account →</button></div>';
document.getElementById('accLogin').onclick=function(){openAuth('login');};
document.getElementById('accSignup').onclick=function(){openAuth('signup');};
}else if(me.role==='admin'){
box.innerHTML='<div class="acc-user"><div class="acc-av">'+esc(initials(me.name))+'</div><h3>'+esc(me.name)+'</h3><span class="role-badge admin">admin</span><p style="color:var(--muted);font-size:14px;margin-top:8px">You are logged in as the site administrator.</p><div class="acc-acts"><button type="button" class="btn" id="accDash">🏠 Go to Dashboard</button><button type="button" class="btn btn-outline" id="accOut">Logout ←</button></div></div>';
document.getElementById('accDash').onclick=function(){openAdmin();};
document.getElementById('accOut').onclick=doLogout;
}else{
box.innerHTML='<div class="acc-user"><div class="acc-av">'+esc(initials(me.name))+'</div><h3>'+esc(me.name)+'</h3><small>'+esc(me.email)+'</small><span class="role-badge user" style="margin-top:6px">user</span><div class="acc-acts"><button type="button" class="btn btn-outline" id="accOut">Logout ←</button></div></div>';
document.getElementById('accOut').onclick=doLogout;
}}

/* ============ LOGIN MODAL ============ */
var loginModal=document.getElementById('loginModal');
function openAuth(tab){loginModal.classList.add('open');document.getElementById('liErr').style.display='none';document.getElementById('suErr').style.display='none';switchTab(tab||'login');}
function closeAuth(){loginModal.classList.remove('open');}
function switchTab(t){document.querySelectorAll('.auth-tab').forEach(function(x){x.classList.toggle('active',x.getAttribute('data-tab')===t);});document.getElementById('formLogin').style.display=(t==='login')?'block':'none';document.getElementById('formSignup').style.display=(t==='signup')?'block':'none';}
document.querySelectorAll('.auth-tab').forEach(function(t){t.onclick=function(){switchTab(t.getAttribute('data-tab'));};});
document.getElementById('loginClose').onclick=closeAuth;
loginModal.addEventListener('click',function(e){if(e.target===loginModal)closeAuth();});
document.getElementById('formLogin').addEventListener('submit',function(e){
e.preventDefault();
var id=document.getElementById('liUser').value.trim().toLowerCase(),pw=document.getElementById('liPass').value,err=document.getElementById('liErr');
if(id===cfg.auth.user.toLowerCase()&&pw===cfg.auth.pass){setSession('ADMIN');closeAuth();this.reset();applyAll();openAdmin();return;}
var u=getUsers().filter(function(x){return x.email.toLowerCase()===id&&x.pass===pw;})[0];
if(u){setSession(u.email);closeAuth();this.reset();applyAll();toast('✓ Welcome back, '+u.name+'!');return;}
err.style.display='block';var box=document.getElementById('loginBox');box.classList.remove('shake');void box.offsetWidth;box.classList.add('shake');
});
document.getElementById('formSignup').addEventListener('submit',function(e){
e.preventDefault();
var name=document.getElementById('suName').value.trim(),email=document.getElementById('suEmail').value.trim().toLowerCase(),p1=document.getElementById('suPass').value,p2=document.getElementById('suPass2').value,err=document.getElementById('suErr');
function fail(m){err.textContent='✗ '+m;err.style.display='block';}
if(name.length<2)return fail('Please enter your full name');
if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))return fail('Please enter a valid email');
if(p1.length<4)return fail('Password must be at least 4 characters');
if(p1!==p2)return fail('Passwords do not match');
if(email===cfg.auth.user.toLowerCase())return fail('This username is reserved');
if(getUsers().some(function(u){return u.email.toLowerCase()===email;}))return fail('An account with this email already exists');
var users=getUsers();users.push({name:name,email:email,pass:p1,ts:Date.now()});saveUsers(users);
setSession(email);closeAuth();this.reset();applyAll();toast('✓ Account created! Welcome, '+name);
});

/* ============ ADMIN OPEN/CLOSE + MOBILE LAYOUT (JS-FORCED) ============ */
var adminPanel=document.getElementById('admin');
function applyMobileAdmin(){
if(!adminPanel||!adminPanel.classList.contains('open'))return;
var aw=document.querySelector('#admin .a-wrap'),aside=document.querySelector('#admin aside'),nav=document.getElementById('sideNav'),sf=document.querySelector('#admin .side-foot'),main=document.querySelector('#admin main');
if(!aside||!nav)return;
if(window.innerWidth<=900){
if(aw)aw.style.cssText='display:block!important;height:auto!important;min-height:100%!important';
aside.style.cssText='display:block!important;width:100%!important;padding:12px 14px!important;border-right:none!important;border-bottom:1px solid #262626!important;overflow:visible!important;position:sticky!important;top:0!important;z-index:5!important;background:#0d0d0d!important';
nav.style.cssText='display:flex!important;flex-wrap:wrap!important;flex-direction:row!important;gap:6px!important;padding:0 0 10px!important;overflow:visible!important;flex:none!important';
document.querySelectorAll('#admin .nav-btn').forEach(function(b){b.style.cssText='display:inline-flex!important;align-items:center!important;gap:6px!important;padding:9px 13px!important;background:#1a1a1a!important;border:1px solid #262626!important;border-radius:9px!important;color:#ddd!important;font-size:12.5px!important;white-space:nowrap!important';var t=b.querySelector('span.txt');if(t)t.style.cssText='display:inline!important';});
if(sf)sf.style.cssText='display:flex!important;flex-direction:row!important;gap:8px!important;padding:2px 0 0!important;border:none!important';
if(main)main.style.cssText='height:auto!important;overflow:visible!important;padding:20px 16px 60px!important;flex:none!important';
adminPanel.style.overflowY='auto';
}else{
if(aw)aw.style.cssText='';
aside.style.cssText='';
nav.style.cssText='';
document.querySelectorAll('#admin .nav-btn').forEach(function(b){b.style.cssText='';var t=b.querySelector('span.txt');if(t)t.style.cssText='';});
if(sf)sf.style.cssText='';
if(main)main.style.cssText='';
adminPanel.style.overflowY='';
}
}
window.addEventListener('resize',applyMobileAdmin);
function openAdmin(){if(!isAdmin()){openAuth('login');return;}adminPanel.classList.add('open');document.body.classList.add('admin-open');try{renderAllAdmin();}catch(e){}applyMobileAdmin();}
function closeAdmin(){adminPanel.classList.remove('open');document.body.classList.remove('admin-open');applyAll();}
document.getElementById('closeAdminBtn').onclick=closeAdmin;
document.getElementById('saveBtn').onclick=function(){save();};
document.getElementById('sideNav').addEventListener('click',function(e){var b=e.target.closest('.nav-btn');if(!b)return;document.querySelectorAll('#admin .nav-btn').forEach(function(x){x.classList.remove('active');});document.querySelectorAll('#admin .sec').forEach(function(x){x.classList.remove('active');});b.classList.add('active');document.getElementById('sec-'+b.getAttribute('data-sec')).classList.add('active');});

/* ============ ADMIN: THEME ============ */
var PRESETS=[{n:'Neon Green',a:'#d7ff3f',bg:'#050505',c:'#121212'},{n:'Cyan',a:'#00e5ff',bg:'#04080a',c:'#0e1418'},{n:'Purple',a:'#b388ff',bg:'#07050c',c:'#141021'},{n:'Gold',a:'#ffc83d',bg:'#0a0805',c:'#171208'},{n:'Rose',a:'#ff5c8a',bg:'#0a0406',c:'#180d12'},{n:'Orange',a:'#ff7a29',bg:'#0a0603',c:'#171008'}];
function applyAdminTheme(){var r=document.documentElement.style,a=cfg.theme.accent;r.setProperty('--accent',a);r.setProperty('--accent-rgb',hexRgb(a).join(','));}
function renderTheme(){document.getElementById('inAccent').value=cfg.theme.accent;document.getElementById('inBg').value=cfg.theme.bg;document.getElementById('inCard').value=cfg.theme.card;document.getElementById('valAccent').textContent=cfg.theme.accent;document.getElementById('valBg').textContent=cfg.theme.bg;document.getElementById('valCard').textContent=cfg.theme.card;document.getElementById('accentPresets').innerHTML=PRESETS.map(function(p){return '<button type="button" class="preset" data-c="'+p.a+'" style="background:'+p.a+'" title="'+p.n+'"></button>';}).join('');document.getElementById('themePresets').innerHTML=PRESETS.map(function(p,i){return '<button type="button" class="btn-sm btn-ghost" data-tp="'+i+'">🎨 '+p.n+'</button>';}).join('');}
function refreshTheme(){applyAdminTheme();renderTheme();save();}
document.getElementById('inAccent').addEventListener('input',function(e){cfg.theme.accent=e.target.value;refreshTheme();});
document.getElementById('inBg').addEventListener('input',function(e){cfg.theme.bg=e.target.value;refreshTheme();});
document.getElementById('inCard').addEventListener('input',function(e){cfg.theme.card=e.target.value;refreshTheme();});
document.getElementById('accentPresets').addEventListener('click',function(e){var b=e.target.closest('.preset');if(b){cfg.theme.accent=b.getAttribute('data-c');refreshTheme();}});
document.getElementById('themePresets').addEventListener('click',function(e){var b=e.target.closest('[data-tp]');if(!b)return;var p=PRESETS[+b.getAttribute('data-tp')];cfg.theme={accent:p.a,bg:p.bg,card:p.c};refreshTheme();});

/* ============ ADMIN: HERO ============ */
function renderHeroAdmin(){document.getElementById('inBadge').value=cfg.hero.badge;document.getElementById('inTag').value=cfg.hero.tag;document.getElementById('inH1a').value=cfg.hero.hBefore;document.getElementById('inH1b').value=cfg.hero.hAccent;document.getElementById('inH1c').value=cfg.hero.hAfter;document.getElementById('inDesc').value=cfg.hero.desc;document.getElementById('heroPhotoPrev').src=cfg.hero.photo;}
['inBadge','inTag','inH1a','inH1b','inH1c','inDesc'].forEach(function(id){document.getElementById(id).addEventListener('input',function(e){var map={inBadge:'badge',inTag:'tag',inH1a:'hBefore',inH1b:'hAccent',inH1c:'hAfter',inDesc:'desc'};cfg.hero[map[id]]=e.target.value;autoSave();});});
document.getElementById('heroPhotoFile').addEventListener('change',function(e){var f=e.target.files[0];if(!f)return;fileToDataURL(f,function(url){cfg.hero.photo=url;renderHeroAdmin();save();});});

/* ============ ADMIN: PROJECTS ============ */
function catOptions(sel){return cfg.categories.map(function(c){return '<option value="'+esc(c.key)+'"'+(c.key===sel?' selected':'')+'>'+esc(c.label)+'</option>';}).join('');}
function renderProjectsAdmin(){document.getElementById('npCat').innerHTML=catOptions();var l=document.getElementById('projList');if(!cfg.projects.length){l.innerHTML='<p style="color:var(--muted);font-size:13.5px">No projects yet.</p>';return;}l.innerHTML=cfg.projects.map(function(p,i){return '<div class="item" data-i="'+i+'"><div class="thumb" style="'+(p.img?'background-image:url(\''+p.img.replace(/'/g,'%27')+'\')':'')+'"></div><div class="f-title"><input type="text" data-f="t" value="'+esc(p.t)+'"></div><div class="f-sub"><input type="text" data-f="sub" value="'+esc(p.sub||'')+'"></div><div class="f-cat"><select data-f="c">'+catOptions(p.c)+'</select></div><div class="acts"><label class="mini" style="cursor:pointer">🖼<input type="file" data-f="file" accept="image/*" hidden></label><button type="button" class="mini del" data-act="del">🗑</button></div></div>';}).join('');}
var npImg='';
document.getElementById('npFile').addEventListener('change',function(e){var f=e.target.files[0];if(!f)return;document.getElementById('npFileName').textContent=f.name;fileToDataURL(f,function(url){npImg=url;});});
document.getElementById('npAdd').addEventListener('click',function(){var t=document.getElementById('npTitle').value.trim();if(!t){alert('Please enter a title!');return;}cfg.projects.push({t:t,sub:document.getElementById('npSub').value.trim(),c:document.getElementById('npCat').value,img:npImg});document.getElementById('npTitle').value='';document.getElementById('npSub').value='';document.getElementById('npFile').value='';document.getElementById('npFileName').textContent='';npImg='';renderProjectsAdmin();renderDash();save();});
document.getElementById('projList').addEventListener('input',function(e){var it=e.target.closest('.item');if(!it)return;var i=+it.getAttribute('data-i'),f=e.target.getAttribute('data-f');if(f==='t'||f==='sub')cfg.projects[i][f]=e.target.value;if(f==='c')cfg.projects[i].c=e.target.value;autoSave();});
document.getElementById('projList').addEventListener('change',function(e){if(e.target.getAttribute('data-f')!=='file')return;var it=e.target.closest('.item');if(!it)return;var i=+it.getAttribute('data-i');fileToDataURL(e.target.files[0],function(url){cfg.projects[i].img=url;renderProjectsAdmin();save();});});
document.getElementById('projList').addEventListener('click',function(e){var b=e.target.closest('[data-act="del"]');if(!b)return;var it=b.closest('.item');if(confirm('Delete "'+cfg.projects[+it.getAttribute('data-i')].t+'"?')){cfg.projects.splice(+it.getAttribute('data-i'),1);renderProjectsAdmin();renderDash();save();}});

/* ============ ADMIN: CATEGORIES ============ */
function renderCats(){document.getElementById('catList').innerHTML=cfg.categories.map(function(c,i){return '<div class="item" data-i="'+i+'"><input type="text" data-f="label" value="'+esc(c.label)+'" style="flex:1"><span style="font-size:11.5px;color:var(--muted);font-family:monospace">#'+esc(c.key)+'</span><button type="button" class="mini del" data-act="del">🗑</button></div>';}).join('');}
document.getElementById('ncAdd').addEventListener('click',function(){var v=document.getElementById('ncLabel').value.trim();if(!v){alert('Please enter a name!');return;}cfg.categories.push({key:slug(v)||('cat'+Date.now()),label:v});document.getElementById('ncLabel').value='';renderCats();renderProjectsAdmin();save();});
document.getElementById('catList').addEventListener('input',function(e){var it=e.target.closest('.item');if(!it)return;cfg.categories[+it.getAttribute('data-i')].label=e.target.value;autoSave();});
document.getElementById('catList').addEventListener('click',function(e){var b=e.target.closest('[data-act="del"]');if(!b)return;var i=+b.closest('.item').getAttribute('data-i');if(confirm('Delete category "'+cfg.categories[i].label+'"? (Projects are not deleted)')){cfg.categories.splice(i,1);renderCats();renderProjectsAdmin();save();}});

/* ============ ADMIN: SKILLS ============ */
function renderSkillsAdmin(){document.getElementById('skillListA').innerHTML=cfg.skills.map(function(s,i){return '<div class="item" data-i="'+i+'"><input type="text" data-f="n" value="'+esc(s.n)+'" style="flex:1.6"><input type="number" data-f="v" value="'+(+s.v)+'" min="1" max="100" style="max-width:95px"><button type="button" class="mini del" data-act="del">🗑</button></div>';}).join('');}
document.getElementById('nsAdd').addEventListener('click',function(){var n=document.getElementById('nsName').value.trim();if(!n)return;cfg.skills.push({n:n,v:+document.getElementById('nsVal').value||80});document.getElementById('nsName').value='';renderSkillsAdmin();renderDash();save();});
document.getElementById('skillListA').addEventListener('input',function(e){var it=e.target.closest('.item');if(!it)return;var i=+it.getAttribute('data-i'),f=e.target.getAttribute('data-f');cfg.skills[i][f]=(f==='v')?+e.target.value:e.target.value;autoSave();});
document.getElementById('skillListA').addEventListener('click',function(e){var b=e.target.closest('[data-act="del"]');if(!b)return;cfg.skills.splice(+b.closest('.item').getAttribute('data-i'),1);renderSkillsAdmin();renderDash();save();});

/* ============ ADMIN: REVIEWS ============ */
function renderReviewsAdmin(){document.getElementById('revList').innerHTML=cfg.reviews.map(function(r,i){return '<div class="item" data-i="'+i+'" style="align-items:flex-start"><div class="thumb" style="border-radius:50%;width:46px;height:46px;display:flex;align-items:center;justify-content:center;font-weight:700;color:var(--accent)">'+esc(initials(r.name))+'</div><div style="flex:1;display:flex;flex-direction:column;gap:8px"><div style="display:flex;gap:8px;flex-wrap:wrap"><input type="text" data-f="name" value="'+esc(r.name)+'" placeholder="Name"><input type="text" data-f="role" value="'+esc(r.role)+'" placeholder="Role, Company"></div><textarea data-f="text" style="min-height:60px">'+esc(r.text)+'</textarea></div><button type="button" class="mini del" data-act="del">🗑</button></div>';}).join('');}
document.getElementById('nrAdd').addEventListener('click',function(){var n=document.getElementById('nrName').value.trim();if(!n)return;cfg.reviews.push({name:n,role:document.getElementById('nrRole').value.trim(),text:document.getElementById('nrText').value.trim()});document.getElementById('nrName').value='';document.getElementById('nrRole').value='';document.getElementById('nrText').value='';renderReviewsAdmin();renderDash();save();});
document.getElementById('revList').addEventListener('input',function(e){var it=e.target.closest('.item');if(!it)return;cfg.reviews[+it.getAttribute('data-i')][e.target.getAttribute('data-f')]=e.target.value;autoSave();});
document.getElementById('revList').addEventListener('click',function(e){var b=e.target.closest('[data-act="del"]');if(!b)return;cfg.reviews.splice(+b.closest('.item').getAttribute('data-i'),1);renderReviewsAdmin();renderDash();save();});

/* ============ ADMIN: STATS ============ */
function renderStatsAdmin(){document.getElementById('statList').innerHTML=cfg.stats.map(function(s,i){return '<div class="item" data-i="'+i+'"><input type="number" data-f="n" value="'+(+s.n)+'" style="max-width:110px"><input type="text" data-f="label" value="'+esc(s.label)+'" style="flex:1"></div>';}).join('');}
document.getElementById('statList').addEventListener('input',function(e){var it=e.target.closest('.item');if(!it)return;var i=+it.getAttribute('data-i'),f=e.target.getAttribute('data-f');cfg.stats[i][f]=(f==='n')?+e.target.value:e.target.value;autoSave();});

/* ============ ADMIN: ABOUT + SOCIALS ============ */
function renderAboutAdmin(){document.getElementById('inAbout').value=cfg.about.text;document.getElementById('inSign').value=cfg.about.sign;document.getElementById('inEmail').value=cfg.about.email;document.getElementById('socList').innerHTML=cfg.socials.map(function(s,i){return '<div class="item" data-i="'+i+'"><span style="font-size:13px;font-weight:600;min-width:95px">'+esc(s.label)+'</span><input type="text" data-f="url" value="'+esc(s.url)+'" style="flex:1"></div>';}).join('');}
['inAbout','inSign','inEmail'].forEach(function(id){document.getElementById(id).addEventListener('input',function(e){var map={inAbout:'text',inSign:'sign',inEmail:'email'};cfg.about[map[id]]=e.target.value;autoSave();});});
document.getElementById('socList').addEventListener('input',function(e){var it=e.target.closest('.item');if(!it)return;cfg.socials[+it.getAttribute('data-i')].url=e.target.value;autoSave();});

/* ============ ADMIN: USERS ============ */
function renderUsers(){var l=document.getElementById('userList'),users=getUsers();if(!users.length){l.innerHTML='<p style="color:var(--muted);font-size:13.5px">No registered users yet.</p>';return;}l.innerHTML=users.map(function(u,i){return '<div class="item" data-i="'+i+'"><div class="thumb" style="border-radius:50%;width:42px;height:42px;display:flex;align-items:center;justify-content:center;font-weight:700;color:var(--accent)">'+esc(initials(u.name))+'</div><div style="flex:1;min-width:150px"><b style="font-size:14px">'+esc(u.name)+'</b><br><small style="color:var(--muted)">'+esc(u.email)+'</small></div><button type="button" class="mini del" data-act="del">🗑</button></div>';}).join('');}
document.getElementById('userList').addEventListener('click',function(e){var b=e.target.closest('[data-act="del"]');if(!b)return;var i=+b.closest('.item').getAttribute('data-i'),users=getUsers();if(confirm('Delete user "'+users[i].name+'"?')){users.splice(i,1);saveUsers(users);renderUsers();renderDash();toast('✓ User deleted');}});

/* ============ ADMIN: MESSAGES ============ */
function renderMessages(){var l=document.getElementById('msgList');if(!l)return;var msgs=getMsgs();
if(!msgs.length){l.innerHTML='<p style="color:var(--muted);font-size:13.5px">No messages yet.</p>';return;}
l.innerHTML=msgs.map(function(m,i){var d=new Date(m.ts).toLocaleDateString();
return '<div class="item" data-i="'+i+'" style="align-items:flex-start"><div class="thumb" style="border-radius:50%;width:42px;height:42px;display:flex;align-items:center;justify-content:center;font-weight:700;color:var(--accent)">'+esc(initials(m.name))+'</div><div style="flex:1;min-width:180px"><b style="font-size:14px">'+esc(m.name)+'</b> <small style="color:var(--muted)">· '+esc(m.email)+' · '+esc(m.type||'')+' · '+d+'</small><p style="color:#c9c9c9;font-size:13.5px;margin-top:6px;line-height:1.6">'+esc(m.text)+'</p></div><button type="button" class="mini del" data-act="del">🗑</button></div>';}).join('');}
document.getElementById('msgList').addEventListener('click',function(e){var b=e.target.closest('[data-act="del"]');if(!b)return;var i=+b.closest('.item').getAttribute('data-i');if(confirm('Delete this message?')){var msgs=getMsgs();msgs.splice(i,1);saveMsgs(msgs);renderMessages();}});

/* ============ ADMIN: BACKUP ============ */
document.getElementById('btnExport').addEventListener('click',function(){var blob=new Blob([JSON.stringify({settings:cfg,users:getUsers(),messages:getMsgs()},null,2)],{type:'application/json'});var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='shahrukhs-designs-backup.json';a.click();toast('✓ Backup downloaded');});
document.getElementById('importFile').addEventListener('change',function(e){var f=e.target.files[0];if(!f)return;var r=new FileReader();r.onload=function(){try{var p=JSON.parse(r.result);if(p.settings){cfg=deepMerge(DEFAULTS,p.settings);save(true);}if(p.users)saveUsers(p.users);if(p.messages)saveMsgs(p.messages);renderAllAdmin();applyAll();toast('✓ Backup imported');}catch(err){alert('Invalid backup file!');}};r.readAsText(f);});
document.getElementById('btnReset').addEventListener('click',function(){if(confirm('Portfolio content will reset to defaults. Admin credentials stay unchanged. Continue?')){var keep=cfg.auth;store.d('sd_settings');cfg=JSON.parse(JSON.stringify(DEFAULTS));cfg.auth=keep;save(true);renderAllAdmin();applyAll();toast('✓ Reset complete');}});

/* ============ ADMIN: SECURITY ============ */
function renderSecurity(){document.getElementById('curUserTxt').textContent=cfg.auth.user;document.getElementById('curPassTxt').textContent=cfg.auth.pass;}
document.getElementById('btnSec').addEventListener('click',function(){var cur=document.getElementById('secCur').value,nu=document.getElementById('secUser').value.trim(),np=document.getElementById('secPass').value,np2=document.getElementById('secPass2').value;if(cur!==cfg.auth.pass){alert('Current password is incorrect!');return;}if(np&&np.length<4){alert('New password must be at least 4 characters!');return;}if(np&&np!==np2){alert('New passwords do not match!');return;}if(!nu&&!np){alert('Enter a new username or a new password!');return;}if(nu)cfg.auth.user=nu;if(np)cfg.auth.pass=np;save();document.getElementById('secCur').value='';document.getElementById('secUser').value='';document.getElementById('secPass').value='';document.getElementById('secPass2').value='';renderSecurity();toast('✓ Admin credentials updated');});

/* ============ DASHBOARD ============ */
function renderDash(){document.getElementById('dashCards').innerHTML=[[cfg.projects.length,'Projects'],[cfg.categories.length,'Categories'],[getUsers().length,'Users'],[getMsgs().length,'Messages'],[cfg.skills.length,'Skills'],[cfg.reviews.length,'Reviews']].map(function(x){return '<div class="dcard"><div class="num">'+x[0]+'</div><div class="lbl">'+x[1]+'</div></div>';}).join('');}
function renderAllAdmin(){applyAdminTheme();renderTheme();renderHeroAdmin();renderProjectsAdmin();renderCats();renderSkillsAdmin();renderReviewsAdmin();renderStatsAdmin();renderAboutAdmin();renderUsers();renderMessages();renderDash();renderSecurity();}

/* ============ CONTACT FORM (inbox + email) ============ */
document.getElementById('contactForm').addEventListener('submit',function(e){
e.preventDefault();
var msg={name:this.querySelector('input[type="text"]').value.trim(),email:this.querySelector('input[type="email"]').value.trim(),type:this.querySelector('select').value,text:this.querySelector('textarea').value.trim(),ts:Date.now()};
if(!msg.name||!msg.text){alert('Please fill your name and message!');return;}
try{var msgs=getMsgs();msgs.unshift(msg);saveMsgs(msgs);}catch(err){}
var fm=document.getElementById('formMsg'),btn=this.querySelector('button[type="submit"]');
if(btn){btn.disabled=true;btn.textContent='Sending...';}
fetch('https://formsubmit.co/ajax/'+cfg.about.email,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({_subject:'New Project Inquiry — '+msg.name,Name:msg.name,Email:msg.email,'Project Type':msg.type,Message:msg.text})})
.then(function(r){if(btn){btn.disabled=false;btn.innerHTML='Send Message ↗';}
fm.textContent=r.ok?'✓ Thank you! Your message has been sent — I will reply soon.':'✗ Sending failed. Please contact me via social links.';
fm.style.display='block';if(r.ok)document.getElementById('contactForm').reset();})
.catch(function(){if(btn){btn.disabled=false;btn.innerHTML='Send Message ↗';}
fm.textContent='✓ Message received. (Email service offline — I will get back to you.)';
fm.style.display='block';document.getElementById('contactForm').reset();});
});

/* ============ LIGHTBOX ============ */
function getImgUrl(card){var m=card.querySelector('.card-img').style.backgroundImage.match(/url\("?([^")]+)"?\)/);return m?m[1]:'';}
var lightbox=document.getElementById('lightbox'),lbImg=document.getElementById('lbImg'),lbTitle=document.getElementById('lbTitle'),lbCount=document.getElementById('lbCount'),lbCards=[],lbIndex=0,grid=document.getElementById('grid');
grid.addEventListener('click',function(e){var c=e.target.closest('.card');if(!c)return;lbCards=[];grid.querySelectorAll('.card:not(.hidden)').forEach(function(x){lbCards.push(x);});lbIndex=lbCards.indexOf(c);openLB();});
function openLB(){var c=lbCards[lbIndex];lbImg.src=getImgUrl(c);lbTitle.textContent=c.querySelector('h3').textContent;lbCount.textContent=(lbIndex+1)+' / '+lbCards.length;lightbox.classList.add('open');document.body.style.overflow='hidden';}
function closeLB(){lightbox.classList.remove('open');document.body.style.overflow='';}
function navLB(d){lbIndex=(lbIndex+d+lbCards.length)%lbCards.length;openLB();}
document.getElementById('lbClose').onclick=closeLB;
document.getElementById('lbPrev').onclick=function(){navLB(-1);};
document.getElementById('lbNext').onclick=function(){navLB(1);};
lightbox.addEventListener('click',function(e){if(e.target===lightbox)closeLB();});
document.addEventListener('keydown',function(e){if(!lightbox.classList.contains('open'))return;if(e.key==='Escape')closeLB();if(e.key==='ArrowRight')navLB(1);if(e.key==='ArrowLeft')navLB(-1);});

/* ============ GENERAL UI ============ */
document.getElementById('filters').addEventListener('click',function(e){var b=e.target.closest('.filter-btn');if(b)setFilter(b.getAttribute('data-cat'));});
document.getElementById('hamburgerBtn').onclick=function(){document.getElementById('nav').classList.toggle('open');};
window.addEventListener('load',function(){setTimeout(function(){document.getElementById('preloader').classList.add('done');},1200);});
window.addEventListener('scroll',function(){var h=document.documentElement;document.getElementById('progress').style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight))*100+'%';document.getElementById('toTop').classList.toggle('show',h.scrollTop>500);});
document.getElementById('toTop').onclick=function(){window.scrollTo({top:0,behavior:'smooth'});};
document.querySelectorAll('nav a').forEach(function(a){a.addEventListener('click',function(){document.getElementById('nav').classList.remove('open');});});

/* ============ START ============ */
applyAll();
/* ============ MOBILE ADMIN BAR V6 (JS-built, bulletproof) ============ */
function applyMobileAdmin(){
if(!adminPanel||!adminPanel.classList.contains('open'))return;
var old=document.getElementById('mobileAdminBar');
if(old)old.remove();
var aw=document.querySelector('#admin .a-wrap'),
    aside=document.querySelector('#admin aside'),
    main=document.querySelector('#admin main');
if(window.innerWidth>900){
if(aw)aw.style.cssText='';
if(aside)aside.style.cssText='';
if(main)main.style.cssText='';
adminPanel.style.overflowY='';
return;
}
if(aw)aw.style.cssText='display:block!important;height:auto!important';
if(aside)aside.style.cssText='display:none!important';
if(main)main.style.cssText='height:auto!important;overflow:visible!important;padding:20px 16px 60px!important';
adminPanel.style.overflowY='auto';
var bar=document.createElement('div');
bar.id='mobileAdminBar';
bar.style.cssText='position:sticky!important;top:0!important;z-index:50!important;background:#0d0d0d!important;border-bottom:1px solid #262626!important;padding:10px 12px!important';
var t=document.createElement('div');
t.textContent='SD Admin';
t.style.cssText='color:#fff!important;font-weight:700!important;font-size:16px!important;padding:2px 4px 8px!important';
bar.appendChild(t);
var secList=[['dash','🏠 Dashboard'],['theme','🎨 Theme'],['hero','🦸 Hero'],['projects','🖼️ Projects'],['cats','📂 Categories'],['skills','📊 Skills'],['reviews','💬 Reviews'],['stats','🔢 Stats'],['about','✍️ About'],['users','👥 Users'],['messages','📬 Messages'],['backup','💾 Backup'],['security','🔐 Security']];
var row=document.createElement('div');
row.style.cssText='display:flex!important;flex-wrap:wrap!important;gap:6px!important';
secList.forEach(function(s){
var b=document.createElement('button');
b.type='button';
b.textContent=s[1];
b.style.cssText='display:inline-flex!important;align-items:center!important;padding:9px 13px!important;background:#1a1a1a!important;border:1px solid #262626!important;border-radius:9px!important;color:#ddd!important;font-size:12.5px!important;cursor:pointer!important';
b.onclick=function(){
document.querySelectorAll('#admin .nav-btn').forEach(function(x){x.classList.remove('active');});
document.querySelectorAll('#admin .sec').forEach(function(x){x.classList.remove('active');});
var nb=document.querySelector('#admin .nav-btn[data-sec="'+s[0]+'"]');
if(nb)nb.classList.add('active');
document.getElementById('sec-'+s[0]).classList.add('active');
adminPanel.scrollTop=0;
};
row.appendChild(b);
});
bar.appendChild(row);
var acts=document.createElement('div');
acts.style.cssText='display:flex!important;gap:8px!important;padding-top:8px!important';
var sb=document.createElement('button');
sb.type='button';sb.textContent='💾 Save Changes';
sb.style.cssText='flex:1!important;padding:11px!important;background:var(--accent)!important;color:#0a0a0a!important;border:none!important;border-radius:10px!important;font-weight:600!important;cursor:pointer!important';
sb.onclick=function(){save();};
var vb=document.createElement('button');
vb.type='button';vb.textContent='View Site ↗';
vb.style.cssText='flex:1!important;padding:11px!important;background:#1a1a1a!important;color:#ddd!important;border:1px solid #2e2e2e!important;border-radius:10px!important;font-weight:600!important;cursor:pointer!important';
vb.onclick=closeAdmin;
acts.appendChild(sb);acts.appendChild(vb);
bar.appendChild(acts);
adminPanel.insertBefore(bar,adminPanel.firstChild);
}
window.addEventListener('resize',applyMobileAdmin);
/* ============ MOBILE ADMIN BAR V7 (collapsible) ============ */
function applyMobileAdmin(){
if(!adminPanel||!adminPanel.classList.contains('open'))return;
var old=document.getElementById('mobileAdminBar');
if(old)old.remove();
var aw=document.querySelector('#admin .a-wrap'),
aside=document.querySelector('#admin aside'),
main=document.querySelector('#admin main');
if(window.innerWidth>900){
if(aw)aw.style.cssText='';
if(aside)aside.style.cssText='';
if(main)main.style.cssText='';
adminPanel.style.overflowY='';
return;
}
if(aw)aw.style.cssText='display:block!important;height:auto!important';
if(aside)aside.style.cssText='display:none!important';
if(main)main.style.cssText='height:auto!important;overflow:visible!important;padding:20px 16px 60px!important';
adminPanel.style.overflowY='auto';
var bar=document.createElement('div');
bar.id='mobileAdminBar';
bar.style.cssText='position:sticky!important;top:0!important;z-index:50!important;background:#0d0d0d!important;border-bottom:1px solid #262626!important;padding:10px 12px!important';
var head=document.createElement('div');
head.style.cssText='display:flex!important;align-items:center!important;justify-content:space-between!important;gap:10px!important';
var t=document.createElement('div');
t.textContent='SD Admin';
t.style.cssText='color:#fff!important;font-weight:700!important;font-size:16px!important;flex:1!important';
head.appendChild(t);
var sb=document.createElement('button');
sb.type='button';sb.textContent='💾 Save';
sb.style.cssText='padding:9px 14px!important;background:var(--accent)!important;color:#0a0a0a!important;border:none!important;border-radius:9px!important;font-weight:600!important;font-size:13px!important;cursor:pointer!important';
sb.onclick=function(){save();};
head.appendChild(sb);
var burger=document.createElement('button');
burger.type='button';burger.textContent='☰';
burger.style.cssText='width:42px!important;height:40px!important;background:#1a1a1a!important;border:1px solid #262626!important;border-radius:9px!important;color:#fff!important;font-size:19px!important;cursor:pointer!important';
head.appendChild(burger);
bar.appendChild(head);
var wrap=document.createElement('div');
wrap.style.cssText='display:none!important;padding-top:10px!important';
var secList=[['dash','🏠 Dashboard'],['theme','🎨 Theme'],['hero','🦸 Hero'],['projects','🖼️ Projects'],['cats','📂 Categories'],['skills','📊 Skills'],['reviews','💬 Reviews'],['stats','🔢 Stats'],['about','✍️ About'],['users','👥 Users'],['messages','📬 Messages'],['backup','💾 Backup'],['security','🔐 Security']];
var row=document.createElement('div');
row.style.cssText='display:flex!important;flex-wrap:wrap!important;gap:6px!important';
secList.forEach(function(s){
var b=document.createElement('button');
b.type='button';b.textContent=s[1];
b.style.cssText='display:inline-flex!important;align-items:center!important;padding:9px 13px!important;background:#1a1a1a!important;border:1px solid #262626!important;border-radius:9px!important;color:#ddd!important;font-size:12.5px!important;cursor:pointer!important';
b.onclick=function(){
document.querySelectorAll('#admin .nav-btn').forEach(function(x){x.classList.remove('active');});
document.querySelectorAll('#admin .sec').forEach(function(x){x.classList.remove('active');});
var nb=document.querySelector('#admin .nav-btn[data-sec="'+s[0]+'"]');
if(nb)nb.classList.add('active');
document.getElementById('sec-'+s[0]).classList.add('active');
wrap.style.cssText='display:none!important;padding-top:10px!important';
burger.textContent='☰';
adminPanel.scrollTop=0;
};
row.appendChild(b);
});
wrap.appendChild(row);
var acts=document.createElement('div');
acts.style.cssText='display:flex!important;gap:8px!important;padding-top:10px!important';
var vb=document.createElement('button');
vb.type='button';vb.textContent='View Site ↗';
vb.style.cssText='flex:1!important;padding:11px!important;background:#1a1a1a!important;color:#ddd!important;border:1px solid #2e2e2e!important;border-radius:10px!important;font-weight:600!important;cursor:pointer!important';
vb.onclick=closeAdmin;
acts.appendChild(vb);
wrap.appendChild(acts);
bar.appendChild(wrap);
burger.onclick=function(){
var open=wrap.style.cssText.indexOf('display:block')>-1;
wrap.style.cssText=open?'display:none!important;padding-top:10px!important':'display:block!important;padding-top:10px!important';
burger.textContent=open?'☰':'✕';
};
adminPanel.insertBefore(bar,adminPanel.firstChild);
}
window.addEventListener('resize',applyMobileAdmin);