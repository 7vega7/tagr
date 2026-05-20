// TAGR Generate Labels Page
import { getBaseStyles, getI18nJS } from './shared_inline.js';

export function getGeneratePage() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>TAGR — Generate Labels</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet"/>
<style>
${getBaseStyles()}
body{display:flex;flex-direction:column;min-height:100vh;}
.app-layout{display:flex;flex:1;}
.sidebar{width:240px;background:var(--surface);border-right:1px solid var(--border);padding:1.5rem 1rem;flex-shrink:0;display:flex;flex-direction:column;gap:0.3rem;}
.sidebar-label{font-size:0.68rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--text-dim);padding:0 0.75rem;margin:0.8rem 0 0.3rem;}
.sidebar-link{display:flex;align-items:center;gap:0.65rem;padding:0.65rem 0.75rem;border-radius:8px;color:var(--text-muted);font-size:0.9rem;transition:all 0.2s;text-decoration:none;}
.sidebar-link:hover{background:var(--accent-dim);color:var(--text);}
.sidebar-link.active{background:var(--accent-dim);color:var(--accent);border:1px solid rgba(0,210,180,0.15);}
.sidebar-link .icon{font-size:1.1rem;width:20px;text-align:center;}
.sidebar-credits{margin-top:auto;background:var(--surface2);border:1px solid var(--border);border-radius:10px;padding:1rem;text-align:center;}
.credits-num{font-family:"Syne",sans-serif;font-size:1.8rem;font-weight:800;color:var(--accent);}
.credits-label{font-size:0.75rem;color:var(--text-muted);margin-bottom:0.6rem;}
.main-content{flex:1;padding:2rem;overflow-y:auto;max-width:1100px;}
.page-title{font-family:"Syne",sans-serif;font-size:1.6rem;font-weight:800;margin-bottom:0.3rem;}
.page-sub{color:var(--text-muted);font-size:0.9rem;margin-bottom:2rem;}
/* CREDITS INDICATOR */
.credits-bar{background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:1rem 1.5rem;display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem;flex-wrap:wrap;gap:0.8rem;}
.cr-item{text-align:center;}
.cr-num{font-family:"Syne",sans-serif;font-size:1.4rem;font-weight:800;}
.cr-label{font-size:0.72rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.08em;}
.cr-sufficient{color:var(--success);}
.cr-insufficient{color:var(--danger);}
/* RESULTS TABLE */
.results-card{margin-top:1.5rem;}
.results-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem;flex-wrap:wrap;gap:0.8rem;}
.results-actions{display:flex;gap:0.5rem;flex-wrap:wrap;}
.code-cell{font-family:"Syne",monospace;font-size:0.8rem;letter-spacing:0.08em;color:var(--accent);}
.url-cell{font-size:0.76rem;color:var(--text-muted);max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.copy-btn{background:none;border:1px solid var(--border);border-radius:4px;color:var(--text-muted);padding:0.18rem 0.5rem;font-size:0.72rem;cursor:pointer;transition:all 0.15s;}
.copy-btn:hover{border-color:var(--accent);color:var(--accent);}
.copy-btn.copied{border-color:var(--success);color:var(--success);}
.status-dot{width:7px;height:7px;border-radius:50%;display:inline-block;margin-right:0.35rem;}
.dot-pending{background:var(--warning);}
.dot-saved{background:var(--success);}
.dot-error{background:var(--danger);}
.order-form{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:1.5rem;margin-top:1.5rem;}
.order-title{font-family:"Syne",sans-serif;font-size:1rem;font-weight:700;margin-bottom:1.2rem;}
.shipping-cost{background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:0.8rem 1rem;font-size:0.88rem;margin-top:0.8rem;}
.menu-toggle{display:none;background:none;border:none;color:var(--text);font-size:1.3rem;cursor:pointer;}
@media(max-width:768px){.sidebar{display:none;position:fixed;left:0;top:64px;bottom:0;z-index:50;width:220px;}.sidebar.open{display:flex;}.menu-toggle{display:block;}.main-content{padding:1rem;}}
</style>
</head>
<body>
<nav class="app-nav">
  <div style="display:flex;align-items:center;gap:0.8rem;">
    <button class="menu-toggle" onclick="document.getElementById('sidebar').classList.toggle('open')">☰</button>
    <a href="/" class="logo">TAGR<span class="logo-reg">®</span></a>
  </div>
  <div class="nav-right">
    <div class="lang-selector">
      <button class="lang-btn" onclick="toggleLang()" id="langBtn">
        <span id="currentFlag">🌐</span><span id="currentLang">EN</span>
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
      </button>
      <div class="lang-dropdown" id="langDropdown">
        <div class="lang-option" onclick="setLang('en')">🇺🇸 English</div>
        <div class="lang-option" onclick="setLang('id')">🇮🇩 Bahasa Indonesia</div>
        <div class="lang-option" onclick="setLang('zh')">🇨🇳 中文</div>
        <div class="lang-option" onclick="setLang('ar')">🇸🇦 العربية</div>
        <div class="lang-option" onclick="setLang('fr')">🇫🇷 Français</div>
      </div>
    </div>
    <button class="btn btn-secondary btn-sm" onclick="clearSession();location.href='/login'" data-i18n="nav.logout">Logout</button>
  </div>
</nav>

<div class="app-layout">
  <aside class="sidebar" id="sidebar">
    <a href="/dashboard" class="sidebar-link"><span class="icon">🏠</span><span data-i18n="nav.dashboard">Dashboard</span></a>
    <a href="/dashboard/generate" class="sidebar-link active"><span class="icon">⚡</span><span data-i18n="dash.generate">Generate Labels</span></a>
    <a href="/dashboard/orders" class="sidebar-link"><span class="icon">📦</span><span data-i18n="dash.orders">My Orders</span></a>
    <a href="/dashboard/labels" class="sidebar-link"><span class="icon">🏷️</span><span data-i18n="dash.labels">My Labels</span></a>
    <div class="sidebar-label">Account</div>
    <a href="/dashboard/topup" class="sidebar-link"><span class="icon">💳</span><span data-i18n="dash.topup">Top Up</span></a>
    <div class="sidebar-credits">
      <div class="credits-label" data-i18n="dash.credits">Credits</div>
      <div class="credits-num" id="sidebarCredits">—</div>
      <a href="/dashboard/topup" class="btn btn-primary btn-sm btn-full" style="margin-top:0.5rem" data-i18n="dash.topup">Top Up</a>
    </div>
  </aside>

  <main class="main-content">
    <div class="page-title" data-i18n="gen.title">Generate Labels</div>
    <div class="page-sub" data-i18n="gen.min">Minimum 100 labels per batch</div>

    <!-- CREDITS BAR -->
    <div class="credits-bar">
      <div class="cr-item">
        <div class="cr-num" id="crAvailable">—</div>
        <div class="cr-label" data-i18n="gen.credits_available">Credits Available</div>
      </div>
      <div class="cr-item">
        <div class="cr-num" id="crNeeded" style="color:var(--text-muted)">0</div>
        <div class="cr-label" data-i18n="gen.credits_needed">Credits Needed</div>
      </div>
      <div class="cr-item">
        <div class="cr-num" id="crAfter" style="color:var(--text-muted)">—</div>
        <div class="cr-label">Balance After</div>
      </div>
      <div id="crStatus"></div>
    </div>

    <!-- PRODUCT FORM -->
    <div class="card card-accent">
      <div style="font-family:'Syne',sans-serif;font-weight:700;margin-bottom:1.2rem;">📦 <span>Product Information</span></div>
      <div class="grid-2">
        <div class="field">
          <label data-i18n="gen.product">Product Name</label>
          <input type="text" id="productName" placeholder="e.g. Premium Sneaker v2" oninput="updateCredits()"/>
        </div>
        <div class="field">
          <label data-i18n="gen.manufacturer">Manufacturer</label>
          <input type="text" id="manufacturer" placeholder="e.g. PT Brand Indonesia" id="mfr"/>
        </div>
        <div class="field">
          <label data-i18n="gen.origin">Country of Origin</label>
          <input type="text" id="originCountry" placeholder="e.g. Indonesia"/>
        </div>
        <div class="field">
          <label data-i18n="gen.manufactured">Manufacture Date</label>
          <input type="date" id="manufacturedAt"/>
        </div>
        <div class="field">
          <label data-i18n="gen.expires">Expiry Date</label>
          <input type="date" id="expiresAt"/>
        </div>
      </div>
    </div>

    <!-- GENERATE OPTIONS -->
    <div class="card" style="margin-top:1rem;">
      <div style="font-family:'Syne',sans-serif;font-weight:700;margin-bottom:1.2rem;">⚙️ Generate Options</div>
      <div class="grid-3">
        <div class="field">
          <label data-i18n="gen.quantity">Quantity (min 100)</label>
          <input type="number" id="quantity" value="100" min="100" max="10000" oninput="updateCredits()"/>
        </div>
        <div class="field">
          <label data-i18n="gen.serial_prefix">Serial Number Prefix</label>
          <input type="text" id="serialPrefix" placeholder="e.g. SN-2026-"/>
        </div>
        <div class="field">
          <label data-i18n="gen.serial_order">Serial Order</label>
          <div class="toggle-group">
            <button class="toggle-btn active" id="btnUrut" onclick="setSerial('urut')" data-i18n="gen.serial_urut">Sequential</button>
            <button class="toggle-btn" id="btnAcak" onclick="setSerial('acak')" data-i18n="gen.serial_acak">Random</button>
          </div>
        </div>
      </div>
      <div class="field" style="max-width:360px;">
        <label>Base URL</label>
        <input type="text" id="baseUrl" value="https://tagr.irfanvegaibara.workers.dev"/>
      </div>
      <button class="btn btn-primary" id="generateBtn" onclick="generateLabels()" style="margin-top:0.5rem;">
        ⚡ <span data-i18n="gen.generate">Generate</span>
      </button>
    </div>

    <!-- RESULTS -->
    <div id="resultsSection" style="display:none;">
      <div class="results-card card" style="margin-top:1.5rem;">
        <div class="results-header">
          <div>
            <div style="font-family:'Syne',sans-serif;font-weight:700;">Results</div>
            <div id="resultsBadges" style="margin-top:0.3rem;display:flex;gap:0.4rem;flex-wrap:wrap;"></div>
          </div>
          <div class="results-actions">
            <button class="btn btn-secondary btn-sm" onclick="exportCSV()">📄 Export CSV</button>
            <button class="btn btn-danger btn-sm" onclick="clearResults()">🗑️ Clear</button>
          </div>
        </div>
        <div class="progress" id="progressWrap" style="display:none;margin-bottom:0.8rem;">
          <div class="progress-fill" id="progressFill"></div>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>#</th><th>Label Code</th><th>Serial Number</th><th>Encoded URL</th><th>Copy</th></tr></thead>
            <tbody id="resultsBody"></tbody>
          </table>
        </div>
      </div>

      <!-- ORDER FORM -->
      <div class="order-form" id="orderForm">
        <div class="order-title">📦 Save & Place Order</div>
        <div class="alert alert-warning show" style="margin-bottom:1rem;">
          ⚠️ Credits will be deducted when you save. Make sure you have enough credits.
        </div>
        <div class="grid-2">
          <div class="field">
            <label>Recipient Name</label>
            <input type="text" id="recipientName" placeholder="Full name"/>
          </div>
          <div class="field">
            <label>Phone</label>
            <input type="text" id="recipientPhone" placeholder="+62 812 3456 7890"/>
          </div>
          <div class="field">
            <label>Address</label>
            <input type="text" id="shipAddress" placeholder="Street address"/>
          </div>
          <div class="field">
            <label>City</label>
            <input type="text" id="shipCity" placeholder="City"/>
          </div>
          <div class="field">
            <label>Province</label>
            <input type="text" id="shipProvince" placeholder="Province"/>
          </div>
          <div class="field">
            <label>Postal Code</label>
            <input type="text" id="shipPostal" placeholder="12345"/>
          </div>
        </div>
        <div class="grid-2">
          <div class="field">
            <label>Courier</label>
            <select id="courier">
              <option value="jne">JNE</option>
              <option value="jnt">J&T Express</option>
              <option value="sicepat">SiCepat</option>
              <option value="anteraja">AnterAja</option>
              <option value="pos">Pos Indonesia</option>
              <option value="tiki">TIKI</option>
            </select>
          </div>
          <div class="field">
            <label>Service</label>
            <select id="courierService">
              <option value="REG">Regular</option>
              <option value="YES">YES (Next Day)</option>
              <option value="OKE">OKE (Economy)</option>
            </select>
          </div>
        </div>
        <div class="shipping-cost" id="shippingCostInfo">
          🚚 Shipping cost: calculated at checkout
        </div>
        <button class="btn btn-primary" id="saveOrderBtn" onclick="saveAndOrder()" style="margin-top:1rem;width:100%;">
          💾 <span data-i18n="gen.save">Save & Order</span>
        </button>
      </div>
    </div>
  </main>
</div>

<footer class="app-footer">
  <span class="footer-logo">TAGR</span>
  <span class="footer-copy" data-i18n="footer.copy">© 2025 TAGR. All rights reserved.</span>
</footer>
<div class="toast" id="toast"></div>

<script>
${getI18nJS()}
var serialMode='urut', generatedLabels=[], userCredits=0, userPrefix='';
var CREDIT_PER_LABEL=1;

function setSerial(m){serialMode=m;document.getElementById('btnUrut').classList.toggle('active',m==='urut');document.getElementById('btnAcak').classList.toggle('active',m==='acak');}

function updateCredits(){
  var qty=parseInt(document.getElementById('quantity').value)||0;
  var needed=qty*CREDIT_PER_LABEL;
  var after=userCredits-needed;
  document.getElementById('crNeeded').textContent=needed.toLocaleString();
  document.getElementById('crAfter').textContent=after.toLocaleString();
  var statusEl=document.getElementById('crStatus');
  if(after>=0){
    statusEl.innerHTML='<span class="badge badge-success">✅ Sufficient</span>';
    document.getElementById('crAfter').style.color='var(--success)';
  }else{
    statusEl.innerHTML='<span class="badge badge-danger">❌ '+t('gen.insufficient')+'</span>';
    document.getElementById('crAfter').style.color='var(--danger)';
  }
}

function encodeForUrl(code){return btoa(code).replace(/\\+/g,'-').replace(/\\//g,'_').replace(/=/g,'');}

function randCode(prefix){
  var chars='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  var r='';
  for(var i=0;i<8;i++){if(i===4)r+='-';r+=chars[Math.floor(Math.random()*chars.length)];}
  return prefix+'-'+r;
}

function randSerial(prefix,index,total){
  if(serialMode==='urut'){var pad=String(index+1).padStart(Math.max(5,String(total).length+1),'0');return(prefix||'')+pad;}
  return(prefix||'')+Math.floor(10000+Math.random()*89999);
}

function generateLabels(){
  var productName=document.getElementById('productName').value.trim();
  var manufacturer=document.getElementById('manufacturer').value.trim();
  var qty=parseInt(document.getElementById('quantity').value)||0;
  if(!productName||!manufacturer){showToast('Product name and manufacturer are required!','error');return;}
  if(qty<100){showToast('Minimum 100 labels per batch!','error');return;}
  var needed=qty*CREDIT_PER_LABEL;
  if(needed>userCredits){showToast(t('gen.insufficient')+' (need '+needed+', have '+userCredits+')','error');return;}
  var serialPrefix=document.getElementById('serialPrefix').value;
  var baseUrl=document.getElementById('baseUrl').value.trim().replace(/\\/+$/,'');
  var usedCodes=new Set();
  generatedLabels=[];
  for(var i=0;i<qty;i++){
    var code;
    do{code=randCode(userPrefix);}while(usedCodes.has(code));
    usedCodes.add(code);
    var serial=randSerial(serialPrefix,i,qty);
    var token=encodeForUrl(code);
    generatedLabels.push({index:i+1,code:code,serial_number:serial,
      product_name:productName,manufacturer:manufacturer,
      origin_country:document.getElementById('originCountry').value.trim()||null,
      manufactured_at:document.getElementById('manufacturedAt').value||null,
      expires_at:document.getElementById('expiresAt').value||null,
      url:baseUrl+'/verify?t='+token,status:'pending'});
  }
  renderResults();
  document.getElementById('resultsSection').style.display='block';
  document.getElementById('resultsSection').scrollIntoView({behavior:'smooth'});
  showToast(qty+' labels generated!','success');
}

function renderResults(){
  document.getElementById('resultsBadges').innerHTML=
    '<span class="badge badge-muted">Total: '+generatedLabels.length+'</span>'+
    '<span class="badge badge-warning">Pending: '+generatedLabels.filter(function(l){return l.status==='pending';}).length+'</span>'+
    (generatedLabels.filter(function(l){return l.status==='saved';}).length>0?'<span class="badge badge-success">Saved: '+generatedLabels.filter(function(l){return l.status==='saved';}).length+'</span>':'')+
    (generatedLabels.filter(function(l){return l.status==='error';}).length>0?'<span class="badge badge-danger">Error: '+generatedLabels.filter(function(l){return l.status==='error';}).length+'</span>':'');
  document.getElementById('resultsBody').innerHTML=generatedLabels.map(function(l){
    return '<tr>'+'<td style="color:var(--text-dim)">'+l.index+'</td>'
      +'<td><span class="code-cell">'+l.code+'</span></td>'
      +'<td><span class="code-cell" style="color:var(--text-muted)">'+l.serial_number+'</span></td>'
      +'<td class="url-cell" title="'+l.url+'">'+l.url+'</td>'
      +'<td><button class="copy-btn" id="cp-'+l.index+'" onclick="copyUrl('+l.index+')">Copy</button></td>'
      +'</tr>';
  }).join('');
}

function copyUrl(i){
  var l=generatedLabels.find(function(x){return x.index===i;});
  if(!l)return;
  navigator.clipboard.writeText(l.url).then(function(){
    var b=document.getElementById('cp-'+i);
    b.textContent='✓';b.classList.add('copied');
    setTimeout(function(){b.textContent='Copy';b.classList.remove('copied');},2000);
  });
}

function exportCSV(){
  if(!generatedLabels.length){showToast('No data to export','error');return;}
  var h=['#','Label Code','Serial Number','Product','Manufacturer','Origin','Manufactured','Expires','URL'];
  var rows=generatedLabels.map(function(l){return[l.index,l.code,l.serial_number,l.product_name,l.manufacturer,l.origin_country||'',l.manufactured_at||'',l.expires_at||'',l.url].map(function(v){return '"'+String(v).replace(/"/g,'""')+'"';}).join(',');});
  var csv=[h.join(',')].concat(rows).join('\\n');
  var blob=new Blob([csv],{type:'text/csv'});
  var url=URL.createObjectURL(blob);
  var a=document.createElement('a');a.href=url;a.download='tagr-labels-'+new Date().toISOString().slice(0,10)+'.csv';a.click();URL.revokeObjectURL(url);
  showToast('CSV exported!','success');
}

function clearResults(){generatedLabels=[];document.getElementById('resultsSection').style.display='none';}

async function saveAndOrder(){
  if(!generatedLabels.length){showToast('Generate labels first!','error');return;}
  var recipientName=document.getElementById('recipientName').value.trim();
  var recipientPhone=document.getElementById('recipientPhone').value.trim();
  var address=document.getElementById('shipAddress').value.trim();
  var city=document.getElementById('shipCity').value.trim();
  var province=document.getElementById('shipProvince').value.trim();
  var postal=document.getElementById('shipPostal').value.trim();
  if(!recipientName||!address||!city){showToast('Please fill in shipping information!','error');return;}
  var qty=generatedLabels.length;
  var creditsNeeded=qty*CREDIT_PER_LABEL;
  if(creditsNeeded>userCredits){showToast(t('gen.insufficient'),'error');window.location.href='/dashboard/topup';return;}
  var btn=document.getElementById('saveOrderBtn');
  btn.disabled=true;btn.innerHTML='<div class="spinner spinner-dark"></div> Saving...';
  var progress=document.getElementById('progressWrap');
  var fill=document.getElementById('progressFill');
  progress.style.display='block';
  // Create order
  try{
    var orderNum='ORD-'+Date.now();
    var or=await sbFetch('/rest/v1/orders',{method:'POST',headers:{'Prefer':'return=representation'},
      body:JSON.stringify({order_number:orderNum,user_id:_userId,status:'confirmed',
        label_quantity:qty,credits_used:creditsNeeded,subtotal:creditsNeeded,shipping_cost:0,total:creditsNeeded,
        recipient_name:recipientName,recipient_phone:recipientPhone,address:address,city:city,province:province,postal_code:postal,
        courier:document.getElementById('courier').value,courier_service:document.getElementById('courierService').value})});
    var orderData=await or.json();
    var orderId=(orderData&&orderData[0])?orderData[0].id:null;
    // Save labels
    var saved=0,errors=0;
    for(var i=0;i<generatedLabels.length;i++){
      var l=generatedLabels[i];
      var body={code:l.code,product_name:l.product_name,manufacturer:l.manufacturer,
        serial_number:l.serial_number,origin_country:l.origin_country,
        manufactured_at:l.manufactured_at||undefined,expires_at:l.expires_at||undefined,
        brand_prefix:userPrefix,owner_id:_userId,order_id:orderId,scan_count:0,active:true};
      var r=await sbFetch('/rest/v1/nfc_labels',{method:'POST',headers:{'Prefer':'return=minimal'},body:JSON.stringify(body)});
      if(r.ok||r.status===201){l.status='saved';saved++;}else{l.status='error';errors++;}
      fill.style.width=((i+1)/generatedLabels.length*100)+'%';
    }
    // Deduct credits
    if(saved>0){
      var deduct=saved*CREDIT_PER_LABEL;
      await sbFetch('/rest/v1/profiles?id=eq.'+_userId,{method:'PATCH',headers:{'Prefer':'return=minimal'},
        body:JSON.stringify({credits:userCredits-deduct})});
      await sbFetch('/rest/v1/credit_transactions',{method:'POST',headers:{'Prefer':'return=minimal'},
        body:JSON.stringify({user_id:_userId,type:'deduct',amount:-deduct,balance_after:userCredits-deduct,
          description:'Generated '+saved+' labels for '+generatedLabels[0].product_name,reference_id:orderId})});
      userCredits-=deduct;
      document.getElementById('crAvailable').textContent=userCredits.toLocaleString();
      document.getElementById('sidebarCredits').textContent=userCredits.toLocaleString();
    }
    renderResults();
    progress.style.display='none';
    if(errors===0)showToast(saved+' labels saved! Order placed.','success');
    else showToast(saved+' saved, '+errors+' errors.','warning');
  }catch(e){showToast('Error: '+e.message,'error');}
  btn.disabled=false;btn.innerHTML='💾 <span data-i18n="gen.save">Save & Order</span>';applyLang(currentLang);
}

async function init(){
  await initSupabase();
  _accessToken=getToken();_userId=getUserId();
  if(!_accessToken||!_userId){window.location.href='/login';return;}
  await loadProfile();
  if(_userProfile){
    userCredits=_userProfile.credits||0;
    userPrefix=_userProfile.brand_prefix||'TAGR';
    document.getElementById('crAvailable').textContent=userCredits.toLocaleString();
    document.getElementById('sidebarCredits').textContent=userCredits.toLocaleString();
    updateCredits();
  }
  applyLang(currentLang);
}
init();
</script>
</body></html>`;
}
