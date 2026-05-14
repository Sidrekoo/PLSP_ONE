/* =====================================================
   PLSP STUDENT PORTAL v2 — app.js
   ===================================================== */

/* SEMESTER DATA */
var SEMESTERS = {
  '1st-2526': {
    label: '1st Sem 2025-26',
    grades: [
      { code:'IT 301', subject:'Data Structures & Algorithms', units:3, prelim:88, midterm:91, final:90, grade:'1.50' },
      { code:'IT 302', subject:'Web Development', units:3, prelim:93, midterm:95, final:94, grade:'1.25' },
      { code:'IT 303', subject:'Database Management Systems', units:3, prelim:82, midterm:84, final:83, grade:'2.00' },
      { code:'MATH 201', subject:'Discrete Mathematics', units:3, prelim:79, midterm:80, final:79, grade:'2.25' },
      { code:'HUM 101', subject:'Contemporary World', units:3, prelim:86, midterm:87, final:86, grade:'1.75' },
      { code:'PE 201', subject:'Physical Education 2', units:2, prelim:97, midterm:98, final:98, grade:'1.00' }
    ],
    schedule: [
      { code:'IT 301', day:'Mon / Thu', time:'7:30 - 9:00 AM', room:'IT Lab 1', instructor:'Prof. Reyes' },
      { code:'IT 302', day:'Tue / Fri', time:'9:00 - 10:30 AM', room:'IT Lab 2', instructor:'Prof. Santos' },
      { code:'IT 303', day:'Mon / Wed', time:'10:30 - 12:00 NN', room:'Rm 201', instructor:'Prof. Garcia' },
      { code:'MATH 201', day:'Tue / Thu', time:'1:00 - 2:30 PM', room:'Rm 105', instructor:'Prof. Cruz' },
      { code:'HUM 101', day:'Wed / Fri', time:'2:30 - 4:00 PM', room:'Rm 302', instructor:'Prof. Mendoza' },
      { code:'PE 201', day:'Saturday', time:'7:00 - 9:00 AM', room:'Gym', instructor:'Coach Rivera' }
    ],
    gwa: '1.75', enrolled: 6
  },
  '2nd-2425': {
    label: '2nd Sem 2024-25',
    grades: [
      { code:'IT 201', subject:'Object-Oriented Programming', units:3, prelim:85, midterm:88, final:87, grade:'1.75' },
      { code:'IT 202', subject:'Computer Networks', units:3, prelim:80, midterm:82, final:81, grade:'2.00' },
      { code:'IT 203', subject:'Operating Systems', units:3, prelim:90, midterm:92, final:91, grade:'1.50' },
      { code:'MATH 101', subject:'Calculus', units:3, prelim:76, midterm:77, final:76, grade:'2.50' },
      { code:'ENG 102', subject:'Technical Writing', units:3, prelim:88, midterm:90, final:89, grade:'1.50' },
      { code:'PE 102', subject:'Physical Education 1', units:2, prelim:95, midterm:96, final:96, grade:'1.00' }
    ],
    schedule: [
      { code:'IT 201', day:'Mon / Wed', time:'7:30 - 9:00 AM', room:'IT Lab 1', instructor:'Prof. Dela Cruz' },
      { code:'IT 202', day:'Tue / Thu', time:'9:00 - 10:30 AM', room:'IT Lab 3', instructor:'Prof. Bautista' },
      { code:'IT 203', day:'Mon / Fri', time:'1:00 - 2:30 PM', room:'Rm 204', instructor:'Prof. Aquino' },
      { code:'MATH 101', day:'Tue / Thu', time:'2:30 - 4:00 PM', room:'Rm 101', instructor:'Prof. Lim' },
      { code:'ENG 102', day:'Wed / Fri', time:'10:30 - 12:00 NN', room:'Rm 305', instructor:'Prof. Torres' },
      { code:'PE 102', day:'Saturday', time:'7:00 - 9:00 AM', room:'Gym', instructor:'Coach Rivera' }
    ],
    gwa: '1.71', enrolled: 6
  },
  '1st-2425': {
    label: '1st Sem 2024-25',
    grades: [
      { code:'IT 101', subject:'Introduction to Computing', units:3, prelim:92, midterm:94, final:93, grade:'1.25' },
      { code:'IT 102', subject:'Programming Fundamentals', units:3, prelim:89, midterm:91, final:90, grade:'1.50' },
      { code:'MATH 11', subject:'College Algebra', units:3, prelim:83, midterm:85, final:84, grade:'1.75' },
      { code:'ENG 101', subject:'Purposive Communication', units:3, prelim:88, midterm:90, final:89, grade:'1.50' },
      { code:'SCI 101', subject:'Natural Science', units:3, prelim:81, midterm:83, final:82, grade:'2.00' },
      { code:'PE 101', subject:'Movement Enhancement', units:2, prelim:96, midterm:97, final:97, grade:'1.00' }
    ],
    schedule: [],
    gwa: '1.50', enrolled: 6
  }
};

var currentSem = '1st-2526';

/* STATE */
var users = [
  { id: '24-12345', name: 'Juan dela Cruz', course: 'BS Information Technology', year: '2nd Year', sec: 'A', pw: 'plsp123' }
];
var curUser = null;
var cart = [];
var transactions = [];
var selectedDoc = 'TOR';
var productImages = {};
var selectedSize = '';
var currentProductId = null;

var products = [
  { id:1,  name:'PLSP PE Uniform Set',    cat:'pe',       price:450,  emoji:'👕', img:'assets/PE.png',
    desc:'Official PLSP PE uniform set. Includes PE shirt and pants with embroidered PLSP logo.',
    longDesc:'This is the official Physical Education uniform required for all PLSP students enrolled in PE subjects. Made from breathable, moisture-wicking fabric suitable for outdoor and indoor activities. The set includes both the PE shirt and PE pants with the PLSP crest embroidered on the chest.',
    sizes:['XS','S','M','L','XL','XXL'], stock:45, tags:['PE','Official','Required'] },
  { id:2,  name:'PLSP ID Lace / Lanyard', cat:'id',       price:65,   emoji:'🏷️', img:'assets/Lace.png',
    desc:'Sublimated PLSP branded lanyard for your school ID.',
    longDesc:'The official PLSP sublimated ID lace featuring the school name, logo, and color scheme. Made from durable polyester material with a metal clip attachment. Required for all students when displaying their school ID on campus.',
    sizes:['One Size'], stock:200, tags:['ID','Accessory'] },
  { id:3,  name:'PLSP Blouse (Female)',   cat:'uniform',  price:300,  emoji:'👚', img:'assets/blouse.png',
    desc:'Embroidered formal uniform blouse for female students.',
    longDesc:'The official PLSP female uniform blouse. Features the PLSP emblem on the chest pocket. Made from high-quality, wrinkle-resistant fabric. Required attire for female students on class days and formal school events.',
    sizes:['XS','S','M','L','XL','XXL'], stock:30, tags:['Uniform','Female','Official'] },
  { id:4,  name:'PLSP Polo Shirt (Male)', cat:'uniform',  price:380,  emoji:'👔', img:'assets/Polo-men.png',
    desc:'Embroidered formal uniform polo for male students.',
    longDesc:'The official PLSP male uniform polo shirt. Features the PLSP emblem embroidered on the left chest. Made from high-quality, breathable fabric with a classic collar design. Required attire for male students on class days.',
    sizes:['XS','S','M','L','XL','XXL'], stock:40, tags:['Uniform','Male','Official'] },
  { id:5,  name:'PLSP Slacks / Pants',    cat:'uniform',  price:320,  emoji:'👖', img:'assets/pants.png',
    desc:'Official school formal pants for all students.',
    longDesc:'The official PLSP uniform pants (slacks). Made from high-quality fabric with a clean, formal cut. Available for both male and female students. Features a comfortable waistband and straight-cut design appropriate for academic settings.',
    sizes:['26','27','28','29','30','31','32','33','34','36'], stock:35, tags:['Uniform','Official'] },
  { id:6,  name:'PLSP Skirt (Female)',    cat:'uniform',  price:280,  emoji:'👗', img:'assets/skirt.png',
    desc:'Official school formal skirt for female students.',
    longDesc:'The official PLSP uniform skirt for female students. Knee-length design in the school\'s signature color. Made from durable, formal fabric that maintains its shape throughout the day. Required bottom wear for female students in formal attire.',
    sizes:['XS','S','M','L','XL','XXL'], stock:28, tags:['Uniform','Female','Official'] },
  { id:7,  name:'PLSP Notebook Set',      cat:'supplies', price:95,   emoji:'📓', img:'assets/notebook.png',
    desc:'3-piece PLSP branded notebook set.',
    longDesc:'A set of 3 high-quality notebooks featuring the PLSP logo and branding. Includes one 80-leaf ruled notebook, one 60-leaf notebook, and one 40-leaf pocket notebook. Perfect for taking class notes and organizing your academic work.',
    sizes:['Standard (3pcs)'], stock:150, tags:['Supplies','Stationery'] },
  { id:8,  name:'PLSP Ballpen Set',       cat:'supplies', price:45,   emoji:'✏️', img:'assets/pen.png',
    desc:'Branded ballpen set — blue, black, and red (3 pieces).',
    longDesc:'A set of 3 PLSP branded ballpens in blue, black, and red ink. Smooth-writing medium point ballpens with a comfortable grip. Each pen features the PLSP logo and is built for everyday academic use.',
    sizes:['Set of 3'], stock:300, tags:['Supplies','Stationery'] },
  { id:9,  name:'PLSP Tote Bag',          cat:'supplies', price:220,  emoji:'👜', img:'assets/tote.png',
    desc:'Eco-friendly canvas tote bag with PLSP branding.',
    longDesc:'A sturdy eco-friendly canvas tote bag printed with the PLSP logo and name. Spacious enough to carry textbooks and school essentials. Features reinforced handles and natural cotton canvas material.',
    sizes:['One Size'], stock:80, tags:['Supplies','Eco-friendly'] },
  { id:10, name:'PE Rubber Shoes',        cat:'pe',       price:850,  emoji:'👟', img:'assets/shoes.jpg',
    desc:'Recommended PE footwear for all physical education activities.',
    longDesc:'The recommended rubber shoes for PLSP PE classes. Features non-slip soles, breathable mesh upper, and a cushioned insole for comfort during physical activities. Suitable for indoor and outdoor use.',
    sizes:['5','6','7','8','9','10','11','12'], stock:25, tags:['PE','Footwear'] }
];

/* LOADING SCREEN */
window.addEventListener('load', function () {
  setTimeout(function () {
    var ls = document.getElementById('loading-screen');
    if (ls) ls.classList.add('hide');
    setTimeout(function () { if (ls) ls.remove(); }, 500);
  }, 2000);
});

/* MINI LOADER */
function showLoader() { document.getElementById('mini-loader').classList.add('show'); }
function hideLoader() { document.getElementById('mini-loader').classList.remove('show'); }

/* TOAST */
function toast(msg, type, icon) {
  type = type || 'default'; icon = icon || '✓';
  var wrap = document.getElementById('toast-wrap');
  var el = document.createElement('div');
  el.className = 'toast toast-' + type;
  el.innerHTML = '<span class="toast-icon">' + icon + '</span><span>' + msg + '</span>';
  wrap.appendChild(el);
  setTimeout(function () {
    el.classList.add('out');
    setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 300);
  }, 3000);
}

/* MODAL */
function showModal(icon, title, msg, onOk) {
  document.getElementById('m-icon').innerHTML  = icon;
  document.getElementById('m-title').innerHTML = title;
  document.getElementById('m-msg').innerHTML   = msg.replace(/\n/g, '<br>');
  document.getElementById('modal-backdrop').classList.add('show');
  window._modalOk = onOk || null;
}
function closeModal() {
  document.getElementById('modal-backdrop').classList.remove('show');
  if (window._modalOk) { window._modalOk(); window._modalOk = null; }
}

/* NAVIGATION */
function go(id) {
  document.querySelectorAll('.screen').forEach(function (s) { s.classList.remove('show'); });
  document.getElementById(id).classList.add('show');
}
function sec(id) {
  document.querySelectorAll('#pg-app .sec').forEach(function (s) { s.classList.remove('show'); });
  document.querySelectorAll('#pg-app .sb-item').forEach(function (n) { n.classList.remove('active'); });
  var el = document.getElementById('sec-' + id);
  if (el) el.classList.add('show');
  var labels = { dashboard:'Dashboard', academic:'Academic Records', store:'School Store', cart:'Cart & Checkout', documents:'Document Requests', profile:'My Profile' };
  document.getElementById('topbar-title').textContent = labels[id] || id;
  document.querySelectorAll('#pg-app .sb-item[data-sec="' + id + '"]').forEach(function (n) { n.classList.add('active'); });
  if (id === 'store')    renderStore('all');
  if (id === 'cart')     renderCart();
  if (id === 'profile')  renderProfile();
  if (id === 'academic') renderAcademic();
  closeSb();
}
function adSec(id) {
  document.querySelectorAll('#pg-admin .sec').forEach(function (s) { s.classList.remove('show'); });
  document.querySelectorAll('.admin-tab').forEach(function (t) { t.classList.remove('active'); });
  document.querySelectorAll('#pg-admin .sb-item').forEach(function (n) { n.classList.remove('active'); });
  var el = document.getElementById(id);
  if (el) el.classList.add('show');
  document.querySelectorAll('[data-admin-sec="' + id + '"]').forEach(function (n) { n.classList.add('active'); });
  if (id === 'a-products') renderAdminProds();
  if (id === 'a-overview') updateAdminStats();
}

/* AUTH */
function validateStudentId(id) { return /^\d{2}-\d{5}$/.test(id); }
function checkPwStrength(pw) {
  var score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  var bar = document.getElementById('pw-bar-fill');
  var lbl = document.getElementById('pw-label');
  if (!bar) return;
  var w = ['0%','25%','50%','75%','100%'];
  var c = ['#ccc','#e53935','#fb8c00','#1976d2','#2e7d32'];
  var t = ['','Weak','Fair','Good','Strong'];
  bar.style.width = w[score]; bar.style.background = c[score];
  if (lbl) lbl.textContent = t[score];
}
function doLogin() {
  var id = document.getElementById('li-id').value.trim();
  var pw = document.getElementById('li-pw').value;
  var err = document.getElementById('li-err');
  err.classList.remove('on');
  if (!id || !pw) { err.textContent = 'Please fill in all fields.'; err.classList.add('on'); return; }
  if (!validateStudentId(id)) {
    err.textContent = 'Student ID must follow the format: XX-XXXXX (e.g. 24-12345).';
    err.classList.add('on');
    document.getElementById('li-id').classList.add('invalid');
    return;
  }
  document.getElementById('li-id').classList.remove('invalid');
  showLoader();
  setTimeout(function () {
    hideLoader();
    var u = users.find(function (x) { return x.id === id && x.pw === pw; });
    if (u) {
      curUser = u; loadUI(); go('pg-app'); sec('dashboard');
      toast('Welcome back, ' + u.name.split(' ')[0] + '!', 'green', '👋');
      renderNotifBadge();
    } else {
      err.textContent = 'Incorrect Student ID or password.'; err.classList.add('on');
    }
  }, 1200);
}
function doRegister() {
  var id = document.getElementById('rg-id').value.trim();
  var name = document.getElementById('rg-name').value.trim();
  var course = document.getElementById('rg-course').value;
  var year = document.getElementById('rg-year').value;
  var sec2 = document.getElementById('rg-sec').value.trim();
  var pw = document.getElementById('rg-pw').value;
  var pw2 = document.getElementById('rg-pw2').value;
  var err = document.getElementById('rg-err');
  err.classList.remove('on');
  if (!id||!name||!course||!year||!pw) { err.textContent='Please fill in all required fields.'; err.classList.add('on'); return; }
  if (!validateStudentId(id)) { err.textContent='Student ID must follow the format: XX-XXXXX (e.g. 24-00001).'; err.classList.add('on'); return; }
  if (users.find(function(x){return x.id===id;})) { err.textContent='This Student ID is already registered.'; err.classList.add('on'); return; }
  if (pw.length<6) { err.textContent='Password must be at least 6 characters.'; err.classList.add('on'); return; }
  if (pw!==pw2) { err.textContent='Passwords do not match.'; err.classList.add('on'); return; }
  users.push({id:id,name:name,course:course,year:year,sec:sec2||'A',pw:pw});
  showModal('🎉','Registration Successful','Your account has been created successfully.\nYou can now log in with your Student ID and password.',function(){showAuthForm('login');});
}
function doAdminLogin() {
  var u = document.getElementById('al-u').value.trim();
  var pw = document.getElementById('al-pw').value;
  var err = document.getElementById('al-err');
  err.classList.remove('on');
  if (!u||!pw) { err.textContent='Enter your credentials.'; err.classList.add('on'); return; }
  showLoader();
  setTimeout(function(){
    hideLoader();
    if (u==='admin'&&pw==='admin123') { go('pg-admin'); updateAdminStats(); adSec('a-overview'); }
    else { err.textContent='Invalid username or password.'; err.classList.add('on'); }
  },1000);
}
function doLogout() { curUser=null; cart=[]; go('pg-login'); showAuthForm('login'); toast('You have been logged out.','default','👋'); }
function showAuthForm(form) {
  var l=document.getElementById('form-login'), r=document.getElementById('form-register');
  if (form==='login') {
    r.classList.add('hidden'); l.classList.remove('hidden'); l.classList.add('entering');
    setTimeout(function(){l.classList.remove('entering');},400);
  } else {
    l.classList.add('hidden'); r.classList.remove('hidden'); r.classList.add('entering');
    setTimeout(function(){r.classList.remove('entering');},400);
  }
}
function loadUI() {
  if (!curUser) return;
  var init = curUser.name.split(' ').map(function(w){return w[0];}).join('').substring(0,2).toUpperCase();
  setTxt('sb-av',init); setTxt('sb-name',curUser.name); setTxt('sb-course',curUser.course+' · '+curUser.year);
  setTxt('welcome-name',curUser.name.split(' ')[0]); updateCartBadge();
}
function setTxt(id,val){var el=document.getElementById(id);if(el)el.textContent=val;}

/* SEMESTER */
function onSemChange(val) {
  currentSem=val;
  var sem=SEMESTERS[val]; if(!sem)return;
  setTxt('stat-enrolled',sem.enrolled); setTxt('stat-gwa',sem.gwa);
  var a=document.getElementById('sec-academic');
  if(a&&a.classList.contains('show')) renderAcademic();
  toast('Switched to '+sem.label,'green','📅');
}

/* ACADEMIC */
function renderAcademic() {
  var sem=SEMESTERS[currentSem]; if(!sem)return;
  var gb=document.getElementById('grades-body');
  if(gb){
    gb.innerHTML=sem.grades.map(function(g){
      var cls=parseFloat(g.grade)<=1.5?'grade-1':parseFloat(g.grade)<=2.0?'grade-2':'grade-3';
      return '<tr><td>'+g.code+'</td><td>'+g.subject+'</td><td style="text-align:center">'+g.units+'</td><td style="text-align:center">'+g.prelim+'</td><td style="text-align:center">'+g.midterm+'</td><td style="text-align:center">'+g.final+'</td><td><span class="grade '+cls+'">'+g.grade+'</span></td></tr>';
    }).join('');
    setTxt('gwa-badge','GWA: '+sem.gwa);
  }
  var sb=document.getElementById('sched-body');
  if(sb){
    if(!sem.schedule||!sem.schedule.length){
      sb.innerHTML='<tr><td colspan="5" style="text-align:center;padding:2rem;color:var(--text-muted)">Schedule not available for this semester.</td></tr>';
    } else {
      sb.innerHTML=sem.schedule.map(function(s){return '<tr><td>'+s.code+'</td><td>'+s.day+'</td><td>'+s.time+'</td><td>'+s.room+'</td><td>'+s.instructor+'</td></tr>';}).join('');
    }
  }
}
function swTab(tab) {
  document.getElementById('tab-grades').style.display=tab==='grades'?'block':'none';
  document.getElementById('tab-schedule').style.display=tab==='schedule'?'block':'none';
  document.querySelectorAll('.tab-btn').forEach(function(b){b.classList.toggle('active',b.dataset.tab===tab);});
}

/* =====================================================
   STORE
   ===================================================== */
function renderStore(cat) {
  var items=cat==='all'?products:products.filter(function(p){return p.cat===cat;});
  var grid=document.getElementById('store-grid'); if(!grid)return;
  grid.innerHTML=items.map(function(p){
    var hasImg=productImages[p.id]||p.img;
    var imgHtml=hasImg
      ?'<img src="'+hasImg+'" alt="'+p.name+'" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">'
       +'<span class="prod-emoji" style="display:none">'+p.emoji+'</span>'
      :'<span class="prod-emoji">'+p.emoji+'</span>';
    var stockBadge=p.stock>20
      ?'<span class="prod-stock in-stock">In Stock</span>'
      :p.stock>0
        ?'<span class="prod-stock low-stock">Only '+p.stock+' left</span>'
        :'<span class="prod-stock no-stock">Out of Stock</span>';
    return '<div class="product-card" onclick="openProductModal('+p.id+')">'
      +'<div class="product-img-wrap" id="pimg-'+p.id+'">'+imgHtml+'</div>'
      +'<div class="prod-body">'
      +'<div class="prod-name">'+p.name+'</div>'
      +'<div class="prod-desc">'+p.desc+'</div>'
      +'<div class="prod-footer">'
      +'<div class="prod-price">&#8369;'+p.price.toFixed(2)+'</div>'
      +stockBadge
      +'</div>'
      +'<button class="prod-add" onclick="event.stopPropagation();addCart('+p.id+')"'
      +(p.stock===0?' disabled style="opacity:.5;cursor:not-allowed"':'')+'>'
      +'&#128722; Add to Cart</button>'
      +'</div></div>';
  }).join('');
}
function filterStore(cat,el) {
  document.querySelectorAll('.chip').forEach(function(c){c.classList.remove('active');});
  el.classList.add('active'); renderStore(cat);
}
function uploadProductImg(pid,input) {
  if(!input.files||!input.files[0])return;
  var r=new FileReader();
  r.onload=function(e){
    productImages[pid]=e.target.result;
    var w=document.getElementById('pimg-'+pid);
    if(w){var ex=w.querySelector('img'),em=w.querySelector('.prod-emoji');
      if(em)em.style.display='none';
      if(ex){ex.src=e.target.result;ex.style.display='';}
      else{var i=document.createElement('img');i.src=e.target.result;i.alt='';w.insertBefore(i,w.firstChild);}
    }
    toast('Product photo updated!','green','🖼️');
  };
  r.readAsDataURL(input.files[0]);
}

/* =====================================================
   PRODUCT QUICK VIEW MODAL
   ===================================================== */
function openProductModal(pid) {
  var p=products.find(function(x){return x.id===pid;}); if(!p)return;
  currentProductId=pid;
  selectedSize=p.sizes&&p.sizes.length===1?p.sizes[0]:'';

  var hasImg=productImages[p.id]||p.img;
  var catMap={pe:'PE Gear',id:'ID & Lanyards',uniform:'Uniforms',supplies:'Supplies'};

  var stockLabel=p.stock>20
    ?'<span class="pv-stock-in">&#10003; In Stock ('+p.stock+' available)</span>'
    :p.stock>0
      ?'<span class="pv-stock-low">&#9888; Low Stock &mdash; Only '+p.stock+' left</span>'
      :'<span class="pv-stock-out">&#10005; Out of Stock</span>';

  var tagsHtml=(p.tags||[]).map(function(t){return '<span class="pv-tag">'+t+'</span>';}).join('');

  var sizesHtml='';
  if(p.sizes&&p.sizes.length>0){
    var sLbl=(p.cat==='uniform'||p.cat==='pe')?'Select Size':'Variant';
    sizesHtml='<div class="pv-section"><div class="pv-section-label">'+sLbl+'</div>'
      +'<div class="pv-sizes" id="pv-sizes">'
      +p.sizes.map(function(s){
        var act=(p.sizes.length===1)?'active':'';
        return '<button class="pv-size-btn '+act+'" onclick="selectSize(this,\''+s+'\')">'+s+'</button>';
      }).join('')
      +'</div></div>';
  }

  var imgContent=hasImg
    ?'<img src="'+hasImg+'" alt="'+p.name+'" class="pv-main-img" onerror="this.style.display=\'none\';document.getElementById(\'pv-emoji-fallback\').style.display=\'flex\'">'
     +'<div id="pv-emoji-fallback" class="pv-emoji-fallback" style="display:none">'+p.emoji+'</div>'
    :'<div id="pv-emoji-fallback" class="pv-emoji-fallback">'+p.emoji+'</div>';

  document.getElementById('pv-image-area').innerHTML=imgContent;
  document.getElementById('pv-category').textContent=catMap[p.cat]||p.cat;
  document.getElementById('pv-title').textContent=p.name;
  document.getElementById('pv-price').textContent='P'+p.price.toFixed(2);
  document.getElementById('pv-stock-label').innerHTML=stockLabel;
  document.getElementById('pv-short-desc').textContent=p.desc;
  document.getElementById('pv-long-desc').textContent=p.longDesc||p.desc;
  document.getElementById('pv-tags').innerHTML=tagsHtml;
  document.getElementById('pv-sizes-container').innerHTML=sizesHtml;

  var btn=document.getElementById('pv-add-cart-btn');
  if(p.stock===0){btn.disabled=true;btn.style.opacity='.5';btn.style.cursor='not-allowed';btn.textContent='Out of Stock';}
  else{btn.disabled=false;btn.style.opacity='';btn.style.cursor='';btn.innerHTML='&#128722; Add to Cart';}

  document.getElementById('product-modal').classList.add('show');
  document.body.style.overflow='hidden';
}

function closeProductModal() {
  document.getElementById('product-modal').classList.remove('show');
  document.body.style.overflow='';
  currentProductId=null; selectedSize='';
}

function selectSize(btn,size) {
  document.querySelectorAll('#pv-sizes .pv-size-btn').forEach(function(b){b.classList.remove('active');});
  btn.classList.add('active'); selectedSize=size;
}

function addCartFromModal() {
  if(!currentProductId)return;
  var p=products.find(function(x){return x.id===currentProductId;});
  if(!p||p.stock===0)return;
  if(p.sizes&&p.sizes.length>1&&!selectedSize){
    var sz=document.getElementById('pv-sizes');
    if(sz){sz.classList.remove('shake');void sz.offsetWidth;sz.classList.add('shake');}
    toast('Please select a size first.','amber','⚠️'); return;
  }
  var label=p.name+(selectedSize&&p.sizes.length>1?' ('+selectedSize+')':'');
  var ex=cart.find(function(c){return c.id===currentProductId;});
  if(ex) ex.qty++;
  else cart.push({id:currentProductId,name:label,price:p.price,emoji:p.emoji,img:productImages[p.id]||p.img||null,qty:1});
  updateCartBadge();
  pushNotif('🛒','ni-green','Added to Cart',p.name+' added to your cart.',function(){sec('cart');});
  toast(p.name+' added to cart!','green','🛒');
  closeProductModal();
}

/* CART */
function addCart(pid) {
  var p=products.find(function(x){return x.id===pid;});
  var ex=cart.find(function(c){return c.id===pid;});
  if(ex)ex.qty++;
  else cart.push({id:pid,name:p.name,price:p.price,emoji:p.emoji,img:productImages[pid]||p.img||null,qty:1});
  updateCartBadge();
  toast(p.name+' added to cart','green','🛒');
  pushNotif('🛒','ni-green','Added to Cart',p.name+' added to your cart.',function(){sec('cart');});
}
function updateCartBadge() {
  var t=cart.reduce(function(a,c){return a+c.qty;},0);
  var el=document.getElementById('cart-badge'); if(el)el.textContent=t;
}
function renderCart() {
  var el=document.getElementById('cart-items'),cnt=document.getElementById('cart-count');
  if(!el)return;
  if(cnt)cnt.textContent=cart.length+' item'+(cart.length!==1?'s':'');
  if(!cart.length){
    el.innerHTML='<div class="empty-state"><div class="empty-icon">🛒</div><h4>Your cart is empty</h4><p>Browse the <a onclick="sec(\'store\')">School Store</a> to add items.</p></div>';
    updateSummary();return;
  }
  el.innerHTML=cart.map(function(item,i){
    var ih=item.img?'<img src="'+item.img+'" alt="" onerror="this.style.display=\'none\'">':item.emoji;
    return '<div class="cart-item"><div class="cart-img">'+ih+'</div>'
      +'<div class="cart-info"><h4>'+item.name+'</h4><div class="cart-unit">&#8369;'+item.price.toFixed(2)+' each</div>'
      +'<div class="qty-ctrl"><button class="qty-btn" onclick="chQty('+i+',-1)">&#8722;</button>'
      +'<span class="qty-val">'+item.qty+'</span>'
      +'<button class="qty-btn" onclick="chQty('+i+',1)">+</button></div></div>'
      +'<div style="text-align:right"><div class="cart-price">&#8369;'+(item.price*item.qty).toFixed(2)+'</div>'
      +'<button class="cart-remove" onclick="rmCart('+i+')">&#10005;</button></div></div>';
  }).join('');
  updateSummary();
}
function chQty(i,d){cart[i].qty+=d;if(cart[i].qty<=0)cart.splice(i,1);updateCartBadge();renderCart();}
function rmCart(i){cart.splice(i,1);updateCartBadge();renderCart();}
function updateSummary(){
  var t=cart.reduce(function(a,c){return a+c.price*c.qty;},0);
  var el_sub=document.getElementById('sum-sub');
  var el_tot=document.getElementById('sum-tot');
  if(el_sub) el_sub.innerHTML='&#8369;'+t.toFixed(2);
  if(el_tot) el_tot.innerHTML='&#8369;'+t.toFixed(2);
}
function selPay(el){document.querySelectorAll('.pay-opt').forEach(function(o){o.classList.remove('selected');});el.closest('.pay-opt').classList.add('selected');}
function checkout(){
  if(!cart.length){toast('Your cart is empty.','amber','⚠️');return;}
  var total=cart.reduce(function(a,c){return a+c.price*c.qty;},0);
  var method=(document.querySelector('input[name="pay"]:checked')||{}).value||'gcash';
  var ref='PLSP-'+Date.now().toString().slice(-8);
  var today=new Date().toLocaleDateString('en-PH',{year:'numeric',month:'short',day:'numeric'});
  transactions.push({ref:ref,items:cart.slice(),total:total,method:method,date:today,student:curUser?curUser.id:''});
  cart=[];updateCartBadge();renderCart();
  pushNotif('✅','ni-green','Order Placed — '+ref,'Total: &#8369;'+total.toFixed(2)+' via '+method.toUpperCase()+'. Present this at the Cashier\'s Office.',function(){sec('profile');});
  showModal('✅', 'Order Confirmed', 'Reference No: '+ref+'\nTotal Amount: ₱'+total.toFixed(2)+'\nPayment via: '+method.toUpperCase()+'\n\nPresent your reference number at the Cashier\'s Office to complete the transaction.');
}

/* DOCUMENTS */
function selDoc(type){
  selectedDoc=type;
  var labels={TOR:'Transcript of Records',COE:'Certificate of Enrollment',GOOD:'Good Moral Certificate',GRAD:'Certification of Graduation'};
  var inp=document.getElementById('doc-type'); if(inp)inp.value=labels[type];
  document.querySelectorAll('.doc-type-card').forEach(function(c){c.classList.remove('selected');});
  var card=document.getElementById('dc-'+type); if(card)card.classList.add('selected');
}
function submitDoc(){
  var purpose=document.getElementById('doc-purpose').value.trim();
  if(!purpose){toast('Please enter the purpose of the request.','amber','⚠️');return;}
  var labels={TOR:'Transcript of Records',COE:'Certificate of Enrollment',GOOD:'Good Moral Certificate',GRAD:'Certification of Graduation'};
  var today=new Date().toLocaleDateString('en-PH',{year:'numeric',month:'short',day:'numeric'});
  var hist=document.getElementById('req-history');
  var item=document.createElement('div');item.className='req-item';
  item.innerHTML='<div class="req-icon-wrap">📋</div><div class="req-info"><h4>'+labels[selectedDoc]+'</h4><p>'+today+' · '+purpose+'</p></div><span class="badge badge-amber">Pending</span>';
  if(hist.firstChild)hist.insertBefore(item,hist.firstChild);else hist.appendChild(item);
  document.getElementById('doc-purpose').value='';
  toast(labels[selectedDoc]+' request submitted!','green','📄');
  pushNotif('📋','ni-amber','Document Request Submitted',labels[selectedDoc]+' is now being processed. Estimated: 3-5 business days.',function(){sec('documents');});
}

/* PROFILE */
function renderProfile(){
  if(!curUser)return;
  var init=curUser.name.split(' ').map(function(w){return w[0];}).join('').substring(0,2).toUpperCase();
  setTxt('prof-av',init);setTxt('prof-name',curUser.name);setTxt('prof-course-year',curUser.course+' · '+curUser.year);
  setTxt('prof-id-badge',curUser.id);setTxt('pi-id',curUser.id);setTxt('pi-name',curUser.name);
  setTxt('pi-course',curUser.course);setTxt('pi-year',curUser.year);setTxt('pi-sec',curUser.sec||'A');
  var txEl=document.getElementById('tx-history'); if(!txEl)return;
  var myTx=transactions.filter(function(t){return t.student===curUser.id;});
  if(!myTx.length){txEl.innerHTML='<div class="empty-state" style="padding:2rem"><div class="empty-icon">💳</div><p>No transactions recorded yet.</p></div>';return;}
  txEl.innerHTML=myTx.slice().reverse().map(function(t){
    return '<div class="tx-item"><div class="tx-icon">💳</div><div class="tx-info"><h4>'+t.ref+'</h4><p>'+t.date+' · '+t.items.length+' item(s) · '+t.method.toUpperCase()+'</p></div><div class="tx-amount">&#8369;'+t.total.toFixed(2)+'</div></div>';
  }).join('');
}

/* DASHBOARD */
function updateDashStats(){
  var sem=SEMESTERS[currentSem];if(!sem)return;
  setTxt('stat-enrolled',sem.enrolled);setTxt('stat-gwa',sem.gwa);
  setTxt('stat-cart',cart.reduce(function(a,c){return a+c.qty;},0));
}

/* ADMIN */
function updateAdminStats(){
  setTxt('ad-stu-count',users.length);setTxt('ad-tx-count',transactions.length);
  var rows=document.getElementById('ad-stu-rows'); if(!rows)return;
  rows.innerHTML=users.length
    ?users.map(function(u){return '<tr><td>'+u.id+'</td><td>'+u.name+'</td><td>'+u.course+'</td><td>'+u.year+'</td><td><span class="badge badge-green">Active</span></td></tr>';}).join('')
    :'<tr><td colspan="5" style="text-align:center;padding:2rem;color:var(--text-muted)">No students registered yet.</td></tr>';
}
function renderAdminProds(){
  var el=document.getElementById('ad-prod-rows');if(!el)return;
  el.innerHTML=products.map(function(p){
    return '<tr><td>'+p.emoji+' '+p.name+'</td><td><span class="badge badge-gray">'+p.cat+'</span></td><td>&#8369;'+p.price.toFixed(2)+'</td><td>'+p.stock+'</td><td><button class="tbl-btn">Edit</button></td></tr>';
  }).join('');
}

/* SIDEBAR */
function toggleSb(){document.getElementById('sidebar').classList.toggle('open');document.getElementById('sb-overlay').classList.toggle('show');}
function closeSb(){document.getElementById('sidebar').classList.remove('open');document.getElementById('sb-overlay').classList.remove('show');}
function toggleAdminSb(){document.getElementById('admin-sidebar').classList.toggle('open');document.getElementById('admin-sb-overlay').classList.toggle('show');}
function closeAdminSb(){document.getElementById('admin-sidebar').classList.remove('open');document.getElementById('admin-sb-overlay').classList.remove('show');}

/* GATE IMAGE */
function triggerGateUpload(){document.getElementById('gate-upload').click();}
function onGateUpload(input){
  if(!input.files||!input.files[0])return;
  var r=new FileReader();
  r.onload=function(e){var bg=document.querySelector('.auth-bg-img');if(bg)bg.src=e.target.result;toast('Background image updated!','green','🖼️');};
  r.readAsDataURL(input.files[0]);
}

/* =====================================================
   NOTIFICATION SYSTEM
   ===================================================== */
var notifications = [
  { id:1,read:false,icon:'📢',color:'ni-red',title:'2nd Semester Enrollment Open',msg:'Enrollment is open until June 15, 2026. Proceed to the Registrar\'s Office with your clearance slip.',time:'Just now',action:function(){sec('dashboard');}},
  { id:2,read:false,icon:'✅',color:'ni-green',title:'Document Request Approved',msg:'Your Certificate of Enrollment has been approved and is ready for pickup at the Registrar\'s Office.',time:'2 hours ago',action:function(){sec('documents');}},
  { id:3,read:false,icon:'📅',color:'ni-blue',title:'Final Exam Schedule Released',msg:'Your final examination schedule has been posted. Visit Academic Records to check room assignments.',time:'Yesterday',action:function(){sec('academic');}},
  { id:4,read:false,icon:'🛍️',color:'ni-gold',title:'PE Uniform Back in Stock',msg:'PLSP PE Uniform Set is now available again in the School Store. Order while stocks last.',time:'2 days ago',action:function(){sec('store');}},
  { id:5,read:true,icon:'📋',color:'ni-amber',title:'Clearance Deadline Reminder',msg:'Submit your clearance requirements before the end of the examination period to avoid delays.',time:'3 days ago',action:function(){sec('dashboard');}}
];

function getUnreadCount(){return notifications.filter(function(n){return !n.read;}).length;}

function renderNotifBadge(){
  var count=getUnreadCount();
  var dot=document.getElementById('notif-dot');
  var bell=document.getElementById('notif-bell');
  if(!bell)return;
  var old=bell.querySelector('.notif-count');if(old)old.remove();
  if(dot)dot.style.display=count>0?'block':'none';
  if(count>0){var b=document.createElement('span');b.className='notif-count';b.textContent=count>9?'9+':count;bell.appendChild(b);}
}

function renderNotifList(){
  var list=document.getElementById('notif-list');if(!list)return;
  if(!notifications.length){
    list.innerHTML='<div class="notif-empty"><div class="ne-icon">🔔</div><p>You\'re all caught up!<br>No new notifications.</p></div>';return;
  }
  list.innerHTML=notifications.map(function(n){
    return '<div class="notif-item '+(n.read?'':'unread')+'" onclick="readNotif('+n.id+')">'
      +'<div class="notif-icon-wrap '+n.color+'">'+n.icon+'</div>'
      +'<div class="notif-content"><h4>'+n.title+'</h4><p>'+n.msg+'</p><span class="notif-time">'+n.time+'</span></div>'
      +(!n.read?'<span class="notif-unread-dot"></span>':'')
      +'</div>';
  }).join('');
}

function toggleNotif(){
  var panel=document.getElementById('notif-panel');if(!panel)return;
  var isOpen=panel.classList.contains('open');
  closeNotif();
  if(!isOpen){
    panel.classList.add('open');renderNotifList();
    setTimeout(function(){document.addEventListener('click',outsideNotifClick);},10);
  }
}
function closeNotif(){
  var p=document.getElementById('notif-panel');if(p)p.classList.remove('open');
  document.removeEventListener('click',outsideNotifClick);
}
function outsideNotifClick(e){var w=document.getElementById('notif-wrap');if(w&&!w.contains(e.target))closeNotif();}
function readNotif(id){
  var n=notifications.find(function(x){return x.id===id;});if(!n)return;
  n.read=true;renderNotifList();renderNotifBadge();closeNotif();if(n.action)n.action();
}
function clearAllNotifs(){
  notifications.forEach(function(n){n.read=true;});renderNotifList();renderNotifBadge();toast('All notifications marked as read.','green','✓');
}
function pushNotif(icon,color,title,msg,action){
  var id=Date.now();
  notifications.unshift({id:id,read:false,icon:icon,color:color,title:title,msg:msg,time:'Just now',action:action||null});
  renderNotifBadge();
}

/* ENTER / ESC KEY */
document.addEventListener('keydown',function(e){
  if(e.key==='Escape'){closeProductModal();closeNotif();return;}
  if(e.key!=='Enter')return;
  var active=document.querySelector('.screen.show');if(!active)return;
  if(active.id==='pg-login'){
    var lf=document.getElementById('form-login');if(lf&&!lf.classList.contains('hidden'))doLogin();
    var af=document.getElementById('form-admin');if(af&&!af.classList.contains('hidden'))doAdminLogin();
  }
});

/* INIT */
document.addEventListener('DOMContentLoaded',function(){
  renderStore('all');renderAcademic();renderNotifBadge();
});

/* =====================================================
   DOCUMENTS & MODULES SYSTEM
   ===================================================== */

/* ── DATA ── */
var docRequests = [
  { id:'REQ-001', studentId:'24-12345', studentName:'Juan dela Cruz', type:'COE', typeFull:'Certificate of Enrollment', purpose:'Scholarship application', copies:1, date:'Apr 28, 2026', status:'ready',    fileData:null, fileName:null },
  { id:'REQ-002', studentId:'24-12345', studentName:'Juan dela Cruz', type:'TOR', typeFull:'Transcript of Records',     purpose:'Employment',             copies:1, date:'Apr 15, 2026', status:'released', fileData:null, fileName:null }
];
var modules = [
  { id:'MOD-001', title:'Data Structures — Week 1-4 Notes',   subject:'IT 301',   sem:'1st-2526', type:'PDF',      desc:'Covers arrays, linked lists, stacks, and queues.',          uploader:'Prof. Reyes',    date:'May 1, 2026',  fileData:null, fileName:'IT301_W1-4.pdf',       size:'2.4 MB' },
  { id:'MOD-002', title:'Web Development Fundamentals',        subject:'IT 302',   sem:'1st-2526', type:'Handout',  desc:'HTML, CSS, and JavaScript basics.',                         uploader:'Prof. Santos',   date:'Apr 28, 2026', fileData:null, fileName:'IT302_WebFundamentals.pdf', size:'3.1 MB' },
  { id:'MOD-003', title:'SQL and Database Design',             subject:'IT 303',   sem:'1st-2526', type:'PDF',      desc:'ER diagrams, normalization, and SQL queries.',               uploader:'Prof. Garcia',   date:'Apr 25, 2026', fileData:null, fileName:'IT303_SQL.pdf',         size:'1.8 MB' },
  { id:'MOD-004', title:'Midterm Review — Discrete Math',      subject:'MATH 201', sem:'1st-2526', type:'Worksheet',desc:'Practice problems for midterm examination.',                 uploader:'Prof. Cruz',     date:'Apr 20, 2026', fileData:null, fileName:'MATH201_Review.pdf',    size:'890 KB' },
  { id:'MOD-005', title:'OOP Concepts and Design Patterns',    subject:'IT 201',   sem:'2nd-2425', type:'PDF',      desc:'Object-oriented principles and common design patterns.',     uploader:'Prof. Dela Cruz',date:'Jan 15, 2025', fileData:null, fileName:'IT201_OOP.pdf',         size:'1.2 MB' },
  { id:'MOD-006', title:'Computer Networks — OSI Model',       subject:'IT 202',   sem:'2nd-2425', type:'Handout',  desc:'Layers of the OSI model explained with examples.',           uploader:'Prof. Bautista', date:'Jan 10, 2025', fileData:null, fileName:'IT202_OSI.pdf',         size:'960 KB' },
  { id:'MOD-007', title:'Introduction to Computing Worksheet', subject:'IT 101',   sem:'1st-2425', type:'Worksheet',desc:'First-semester worksheet for IT 101 students.',              uploader:'Prof. Aquino',   date:'Aug 20, 2024', fileData:null, fileName:'IT101_WS1.pdf',         size:'540 KB' }
];
var DOC_STATUS       = { pending:'Pending', processing:'Processing', ready:'Ready for Pickup', released:'Released' };
var DOC_STATUS_BADGE = { pending:'badge-amber', processing:'badge-blue', ready:'badge-green', released:'badge-indigo' };
var docReqCounter  = 3;
var modCounter     = 8;
var currentModSem  = '1st-2526'; /* tracks which semester tab is active in student modules */

/* ── STUDENT: Tab switcher ── */
function docTab(tab) {
  document.querySelectorAll('.doc-tab').forEach(function(b){ b.classList.toggle('active', b.dataset.dtab === tab); });
  document.getElementById('dpanel-requests').style.display = tab === 'requests' ? 'block' : 'none';
  document.getElementById('dpanel-modules').style.display  = tab === 'modules'  ? 'block' : 'none';
  if (tab === 'requests') renderMyRequests();
  if (tab === 'modules')  { syncModSemToGlobal(); renderSubjectFolders(); }
}

/* ── STUDENT: Sync module semester tabs to global semester selector ── */
function syncModSemToGlobal() {
  /* when student opens modules tab, pre-select the semester that matches the topbar */
  var semToUse = currentSem || '1st-2526';
  currentModSem = semToUse;
  document.querySelectorAll('.mod-sem-btn').forEach(function(b){
    b.classList.toggle('active', b.dataset.sem === semToUse);
  });
  /* also sync the topbar dropdown visually */
  var sel = document.getElementById('sem-selector');
  if (sel) sel.value = semToUse;
}

/* ── STUDENT: Switch module semester tab ── */
function switchModSem(btn, sem) {
  currentModSem = sem;
  document.querySelectorAll('.mod-sem-btn').forEach(function(b){ b.classList.toggle('active', b.dataset.sem === sem); });
  /* also update global semester selector */
  var sel = document.getElementById('sem-selector');
  if (sel) sel.value = sem;
  currentSem = sem;
  closeModFolder();
  renderSubjectFolders();
  toast('Switched to ' + (SEMESTERS[sem] ? SEMESTERS[sem].label : sem), 'green', '📅');
}

/* ── STUDENT: Render subject folders for current semester ── */
function renderSubjectFolders() {
  var grid = document.getElementById('subject-folders'); if (!grid) return;
  var sem  = currentModSem;

  /* Collect subjects that have modules in this semester */
  var subjectsWithMods = {};
  modules.forEach(function(m) {
    if (m.sem !== sem) return;
    if (!subjectsWithMods[m.subject]) subjectsWithMods[m.subject] = 0;
    subjectsWithMods[m.subject]++;
  });

  /* Also collect from student's schedule for this semester so folders appear even if 0 modules */
  var schedData = SEMESTERS[sem] ? SEMESTERS[sem].schedule : [];
  schedData.forEach(function(s) {
    if (!subjectsWithMods[s.code]) subjectsWithMods[s.code] = 0;
  });

  var subjects = Object.keys(subjectsWithMods);

  if (!subjects.length) {
    grid.innerHTML = '<div class="empty-state" style="grid-column:1/-1;padding:3rem"><div class="empty-icon">📂</div><h4>No subjects this semester</h4><p>No schedule or modules found for this semester.</p></div>';
    return;
  }

  /* Build instructor map from schedule */
  var instrMap = {};
  schedData.forEach(function(s){ instrMap[s.code] = s.instructor; });

  grid.innerHTML = subjects.map(function(subj) {
    var count = subjectsWithMods[subj];
    var instr = instrMap[subj] || '';
    var hasNew = modules.some(function(m){ return m.sem === sem && m.subject === subj && !m.seen; });
    return '<div class="subject-folder-card" onclick="openModFolder(\'' + subj + '\')">'
      + '<div class="sfc-icon">📁</div>'
      + '<div class="sfc-body">'
      + '<h4>' + subj + (hasNew ? ' <span class="sfc-new-dot"></span>' : '') + '</h4>'
      + (instr ? '<p>' + instr + '</p>' : '')
      + '</div>'
      + '<div class="sfc-count">'
      + '<span class="sfc-num">' + count + '</span>'
      + '<span class="sfc-lbl">' + (count === 1 ? 'file' : 'files') + '</span>'
      + '</div>'
      + '</div>';
  }).join('');
}

/* ── STUDENT: Open subject folder ── */
function openModFolder(subj) {
  var sem = currentModSem;
  var folderMods = modules.filter(function(m){ return m.sem === sem && m.subject === subj; });
  var schedData  = SEMESTERS[sem] ? SEMESTERS[sem].schedule : [];
  var schedEntry = schedData.find(function(s){ return s.code === subj; });

  /* Mark as seen */
  folderMods.forEach(function(m){ m.seen = true; });

  document.getElementById('open-folder-title').textContent = subj;
  document.getElementById('open-folder-meta').textContent  =
    schedEntry ? schedEntry.instructor + ' · ' + schedEntry.day + ' ' + schedEntry.time + ' · ' + schedEntry.room : '';

  var grid = document.getElementById('mod-list-grid');
  if (!folderMods.length) {
    grid.innerHTML = '<div class="empty-state" style="padding:2.5rem;grid-column:1/-1"><div class="empty-icon">📭</div><h4>No modules yet</h4><p>Your teacher hasn\'t uploaded any materials for this subject yet.</p></div>';
  } else {
    grid.innerHTML = folderMods.map(function(m){ return buildModCard(m); }).join('');
  }

  document.getElementById('mod-folders-view').style.display = 'none';
  document.getElementById('mod-list-view').style.display    = 'block';
  renderSubjectFolders(); /* refresh to clear new-dot */
}

function closeModFolder() {
  document.getElementById('mod-folders-view').style.display = 'block';
  document.getElementById('mod-list-view').style.display    = 'none';
}

/* ── Build a module card (shared between student view + admin preview) ── */
function buildModCard(m) {
  var typeColors = { PDF:'#e3f2fd:#1565c0', Handout:'#f3e5f5:#6a1b9a', Worksheet:'#fff8e1:#e65100', Review:'#e8f5e9:#1b5e20', Assignment:'#fce4ec:#880e4f' };
  var pair = (typeColors[m.type] || '#f0f0ee:#555').split(':');
  var dlBtn = m.fileData
    ? '<button class="mod-dl-btn" onclick="event.stopPropagation();downloadModule(\'' + m.id + '\')">&#8681; Download</button>'
    : '<button class="mod-dl-btn mod-dl-demo" onclick="event.stopPropagation();toast(\'Demo file — admin must upload a real file.\',\'amber\',\'ℹ️\')">&#8681; Download</button>';
  return '<div class="module-card">'
    + '<div class="mod-header"><span class="mod-type-badge" style="background:' + pair[0] + ';color:' + pair[1] + '">' + m.type + '</span><span class="mod-size">' + m.size + '</span></div>'
    + '<div class="mod-icon">📄</div>'
    + '<h4 class="mod-title">' + m.title + '</h4>'
    + '<p class="mod-desc">' + m.desc + '</p>'
    + '<div class="mod-meta"><span class="mod-subject">' + m.subject + '</span><span class="mod-uploader">by ' + m.uploader + '</span></div>'
    + '<div class="mod-footer"><span class="mod-date">' + m.date + '</span>' + dlBtn + '</div>'
    + '</div>';
}

function downloadModule(modId) {
  var m = modules.find(function(x){ return x.id === modId; }); if (!m || !m.fileData) return;
  var a = document.createElement('a'); a.href = m.fileData; a.download = m.fileName || 'module.pdf';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  toast('Downloading ' + m.fileName, 'green', '⬇️');
}

/* ── STUDENT: Submit document request ── */
function submitDoc() {
  var purpose = document.getElementById('doc-purpose').value.trim();
  var copies  = (document.getElementById('doc-copies') || {}).value || '1';
  if (!purpose) { toast('Please enter the purpose of your request.', 'amber', '⚠️'); return; }
  var labels = { TOR:'Transcript of Records', COE:'Certificate of Enrollment', GOOD:'Good Moral Certificate', GRAD:'Certification of Graduation' };
  var today  = new Date().toLocaleDateString('en-PH', { year:'numeric', month:'short', day:'numeric' });
  var refId  = 'REQ-' + String(docReqCounter++).padStart(3,'0');
  docRequests.unshift({ id:refId, studentId:curUser?curUser.id:'', studentName:curUser?curUser.name:'', type:selectedDoc, typeFull:labels[selectedDoc], purpose:purpose, copies:parseInt(copies)||1, date:today, status:'pending', fileData:null, fileName:null });
  document.getElementById('doc-purpose').value = '';
  renderMyRequests();
  updateAdminDocBadge();
  toast(labels[selectedDoc] + ' request submitted! Ref: ' + refId, 'green', '📄');
  pushNotif('📋', 'ni-amber', 'Document Request Submitted', labels[selectedDoc] + ' — Ref: ' + refId + '. Processing: 3–5 business days.', function(){ sec('documents'); });
}

/* ── STUDENT: Render my requests ── */
function renderMyRequests() {
  var el = document.getElementById('req-history'); if (!el) return;
  var mine = docRequests.filter(function(r){ return r.studentId === (curUser ? curUser.id : ''); });
  var badge = document.getElementById('req-count-badge');
  if (badge) { badge.textContent = mine.length + ' request' + (mine.length !== 1 ? 's' : ''); }
  if (!mine.length) {
    el.innerHTML = '<div class="empty-state" style="padding:2rem"><div class="empty-icon">📋</div><h4>No requests yet</h4><p>Select a document type above and submit your request.</p></div>';
    return;
  }
  el.innerHTML = mine.map(function(r) {
    var bc = DOC_STATUS_BADGE[r.status] || 'badge-gray';
    var sl = DOC_STATUS[r.status] || r.status;
    var dl = (r.status === 'ready' || r.status === 'released') && r.fileData
      ? '<button class="req-dl-btn" onclick="downloadDocFile(\'' + r.id + '\')">&#8681; Download</button>'
      : r.status === 'ready' ? '<span class="req-pickup-note">&#128197; Visit Registrar</span>' : '';
    return '<div class="req-item">'
      + '<div class="req-icon-wrap">' + getDocEmoji(r.type) + '</div>'
      + '<div class="req-info"><h4>' + r.typeFull + ' <span class="req-ref">' + r.id + '</span></h4>'
      + '<p>' + r.date + ' &middot; ' + r.purpose + ' &middot; ' + r.copies + ' cop' + (r.copies===1?'y':'ies') + '</p></div>'
      + '<div class="req-act-cell"><span class="badge ' + bc + '">' + sl + '</span>' + dl + '</div>'
      + '</div>';
  }).join('');
}

function getDocEmoji(t) { return {TOR:'🎓',COE:'📜',GOOD:'✅',GRAD:'🏅'}[t] || '📋'; }
function downloadDocFile(reqId) {
  var r = docRequests.find(function(x){ return x.id===reqId; }); if (!r||!r.fileData) { toast('File not attached.','amber','⚠️'); return; }
  var a = document.createElement('a'); a.href=r.fileData; a.download=r.fileName||'document.pdf';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
}

/* ── ADMIN: Render doc requests ── */
function renderAdminDocRequests() {
  var el = document.getElementById('ad-req-body'); if (!el) return;
  var fSt = (document.getElementById('ad-req-filter-status')||{}).value || 'all';
  var fTy = (document.getElementById('ad-req-filter-type')||{}).value   || 'all';
  var list = docRequests.filter(function(r){ return (fSt==='all'||r.status===fSt) && (fTy==='all'||r.type===fTy); });
  updateAdminDocBadge();
  if (!list.length) { el.innerHTML='<tr><td colspan="7" style="text-align:center;padding:2rem;color:var(--text-muted)">No requests match the selected filters.</td></tr>'; return; }
  el.innerHTML = list.map(function(r) {
    var bc = DOC_STATUS_BADGE[r.status]||'badge-gray';
    var sl = DOC_STATUS[r.status]||r.status;
    var act = '';
    if      (r.status==='pending')    act='<button class="tbl-btn" onclick="adminUpdateStatus(\''+r.id+'\',\'processing\')">Mark Processing</button>';
    else if (r.status==='processing') act='<label class="tbl-btn tbl-upload-btn">&#8679; Upload File<input type="file" accept=".pdf,.doc,.docx" style="display:none" onchange="adminUploadDoc(\''+r.id+'\',this)"></label>';
    else if (r.status==='ready')      act='<button class="tbl-btn" onclick="adminUpdateStatus(\''+r.id+'\',\'released\')">Mark Released</button>';
    else                               act='<span style="color:var(--text-muted);font-size:.8rem">Done</span>';
    return '<tr><td><strong>'+r.id+'</strong></td>'
      +'<td>'+r.studentId+'<br><span style="font-size:.74rem;color:var(--text-muted)">'+r.studentName+'</span></td>'
      +'<td>'+r.typeFull+'</td><td>'+r.purpose+'</td><td>'+r.date+'</td>'
      +'<td><span class="badge '+bc+'">'+sl+'</span></td><td>'+act+'</td></tr>';
  }).join('');
}

function adminUpdateStatus(reqId, newStatus) {
  var r = docRequests.find(function(x){ return x.id===reqId; }); if (!r) return;
  r.status = newStatus;
  renderAdminDocRequests(); updateAdminDocBadge();
  if (newStatus==='ready') { pushNotif('✅','ni-green','Document Ready for Pickup',r.typeFull+' ('+r.id+') is now ready. Visit the Registrar\'s Office.',function(){sec('documents');}); toast('Student notified — document ready!','green','✅'); }
  else toast('Status updated to: '+DOC_STATUS[newStatus],'green','✓');
}

function adminUploadDoc(reqId, input) {
  if (!input.files||!input.files[0]) return;
  var r = docRequests.find(function(x){ return x.id===reqId; }); if (!r) return;
  var reader = new FileReader();
  reader.onload = function(e) {
    r.fileData = e.target.result; r.fileName = input.files[0].name; r.status = 'ready';
    renderAdminDocRequests(); updateAdminDocBadge();
    pushNotif('✅','ni-green','Document Ready for Pickup',r.typeFull+' ('+r.id+') uploaded & ready for pickup.',function(){sec('documents');});
    toast(r.typeFull+' uploaded and marked Ready!','green','📤');
  };
  reader.readAsDataURL(input.files[0]);
}

function updateAdminDocBadge() {
  var pending = docRequests.filter(function(r){ return r.status==='pending'||r.status==='processing'; }).length;
  var badge = document.getElementById('ad-req-badge');
  if (badge) { badge.textContent = pending>0?pending+' Pending':'All Clear'; badge.className='badge '+(pending>0?'badge-amber':'badge-green'); }
  var sb = document.getElementById('ad-req-sb-badge');
  if (sb) { sb.textContent = pending||''; sb.style.display = pending>0?'inline-flex':'none'; }
}

/* ── ADMIN: Module file drop zone ── */
function handleModFileSelect(input) {
  if (!input.files||!input.files[0]) return;
  var name = input.files[0].name;
  var fdz = document.getElementById('fdz-text');
  if (fdz) { fdz.textContent = '✓ ' + name; fdz.style.color = 'var(--g700)'; fdz.style.fontWeight = '600'; }
}
function handleModFileDrop(e) {
  var file = e.dataTransfer.files[0]; if (!file) return;
  var input = document.getElementById('mod-file');
  /* DataTransfer hack to set file on input */
  var dt = new DataTransfer(); dt.items.add(file); input.files = dt.files;
  handleModFileSelect(input);
}

/* ── ADMIN: Upload module ── */
function adminUploadModule() {
  var title   = (document.getElementById('mod-title')||{}).value && document.getElementById('mod-title').value.trim();
  var subject = (document.getElementById('mod-subject')||{}).value && document.getElementById('mod-subject').value.trim();
  var sem     = (document.getElementById('mod-sem')||{}).value || '1st-2526';
  var type    = (document.getElementById('mod-type')||{}).value || 'PDF';
  var desc    = (document.getElementById('mod-desc')||{}).value && document.getElementById('mod-desc').value.trim();
  var finput  = document.getElementById('mod-file');
  if (!title||!subject||!desc) { toast('Please fill in Title, Subject, and Description.','amber','⚠️'); return; }
  var today = new Date().toLocaleDateString('en-PH',{year:'numeric',month:'short',day:'numeric'});
  var newMod = { id:'MOD-'+String(modCounter++).padStart(3,'0'), title:title, subject:subject.toUpperCase(), sem:sem, type:type, desc:desc, uploader:'Administrator', date:today, fileData:null, fileName:finput.files&&finput.files[0]?finput.files[0].name:'module.pdf', size:finput.files&&finput.files[0]?formatFileSize(finput.files[0].size):'—', seen:false };
  var finish = function() {
    modules.unshift(newMod);
    renderAdminModules(); updateAdminModSubjFilter();
    document.getElementById('mod-title').value=''; document.getElementById('mod-subject').value=''; document.getElementById('mod-desc').value='';
    if (finput) { finput.value=''; } var fdz=document.getElementById('fdz-text'); if(fdz){fdz.textContent='Click or drag a file here to upload';fdz.style.color='';fdz.style.fontWeight='';}
    pushNotif('📂','ni-blue','New Module Uploaded','"'+title+'" uploaded for '+subject+'.',function(){docTab('modules');});
    toast('"'+title+'" uploaded successfully!','green','📤');
  };
  if (finput.files&&finput.files[0]) { var r=new FileReader(); r.onload=function(e){newMod.fileData=e.target.result;finish();}; r.readAsDataURL(finput.files[0]); }
  else finish();
}

/* ── ADMIN: Render module list ── */
function renderAdminModules() {
  var el = document.getElementById('ad-modules-list'); if (!el) return;
  var fSem  = (document.getElementById('ad-mod-filter-sem')||{}).value  || 'all';
  var fSubj = (document.getElementById('ad-mod-filter-subj')||{}).value || 'all';
  var list  = modules.filter(function(m){ return (fSem==='all'||m.sem===fSem) && (fSubj==='all'||m.subject===fSubj); });
  var badge = document.getElementById('ad-mod-count'); if (badge) badge.textContent = list.length + ' module' + (list.length!==1?'s':'');
  if (!list.length) { el.innerHTML='<div class="empty-state" style="padding:2rem"><div class="empty-icon">📂</div><h4>No modules</h4><p>Upload your first module using the form above.</p></div>'; return; }
  el.innerHTML = list.map(function(m) {
    var semLabel = SEMESTERS[m.sem] ? SEMESTERS[m.sem].label : m.sem;
    return '<div class="admin-mod-row">'
      +'<div class="admin-mod-icon">📄</div>'
      +'<div class="admin-mod-info"><h4>'+m.title+'</h4>'
      +'<p>'+m.subject+' &middot; '+semLabel+' &middot; '+m.type+' &middot; '+m.size+'</p>'
      +'<span style="font-size:.73rem;color:var(--text-muted)">by '+m.uploader+' &middot; '+m.date+(m.fileData?' &middot; <span style="color:var(--g700);font-weight:600">&#10003; File attached</span>':' &middot; <span style="color:var(--text-muted)">No file</span>')+'</span></div>'
      +'<div class="admin-mod-actions"><button class="tbl-btn tbl-btn-danger" onclick="adminDeleteModule(\''+m.id+'\')">Delete</button></div>'
      +'</div>';
  }).join('');
}

function adminDeleteModule(modId) {
  var idx = modules.findIndex(function(x){ return x.id===modId; }); if(idx===-1)return;
  var name = modules[idx].title; modules.splice(idx,1);
  renderAdminModules(); updateAdminModSubjFilter();
  toast('"'+name+'" deleted.','default','🗑️');
}

function updateAdminModSubjFilter() {
  var sel = document.getElementById('ad-mod-filter-subj'); if (!sel) return;
  var cur = sel.value;
  var subjects = []; modules.forEach(function(m){ if(subjects.indexOf(m.subject)===-1)subjects.push(m.subject); });
  sel.innerHTML = '<option value="all">All Subjects</option>' + subjects.sort().map(function(s){ return '<option value="'+s+'">'+ s+'</option>'; }).join('');
  if (subjects.indexOf(cur)!==-1) sel.value = cur;
}

function formatFileSize(b) { if(!b)return'—'; if(b<1024)return b+'B'; if(b<1048576)return(b/1024).toFixed(0)+'KB'; return(b/1048576).toFixed(1)+'MB'; }

/* ── Extend adSec ── */
var _origAdSec = adSec;
adSec = function(id) {
  _origAdSec(id);
  if (id==='a-requests') { renderAdminDocRequests(); updateAdminDocBadge(); }
  if (id==='a-modules')  { renderAdminModules(); updateAdminModSubjFilter(); }
};

/* ── Extend sec so opening Documents auto-renders ── */
var _origSec = sec;
sec = function(id) {
  _origSec(id);
  if (id==='documents') { renderMyRequests(); }
};

/* ── Extend onSemChange so student module view also updates ── */
var _origOnSemChange = onSemChange;
onSemChange = function(val) {
  _origOnSemChange(val);
  currentModSem = val;
  /* update module sem tab buttons */
  document.querySelectorAll('.mod-sem-btn').forEach(function(b){ b.classList.toggle('active', b.dataset.sem===val); });
  /* if modules panel is visible, re-render folders */
  var mp = document.getElementById('dpanel-modules');
  if (mp && mp.style.display !== 'none') { closeModFolder(); renderSubjectFolders(); }
};
