// TAGR Top Up Page
import { getBaseStyles, getI18nJS } from '../lib/shared.js';

export function getTopupPage() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>TAGR — Top Up Credits</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet"/>
<style>
${getBaseStyles()}
body{display:flex;flex-direction:column;min-height:100vh;}
.app-layout{display:flex;flex:1;}
.sidebar{width:240px;background:var(--surface);border-right:1px solid var(--border);padding:1.5rem 1rem;flex-shrink:0;display:flex;flex-direction:column;gap:0.3rem;}
.sidebar-link{display:flex;align-items:center;gap:0.65rem;padding:0.65rem 0.75rem;border-radius:8px;color:var(--text-muted);font-size:0.9rem;transition:all 0.2s;text-decoration:none;}
.sidebar-link:hover{background:var(--accent-dim);color:var(--text);}
.sidebar-link.active{background:var(--accent-dim);color:var(--accent);border:1px solid rgba(0,210,180,0.15);}
.sidebar-link .icon{font-size:1.1rem;width:20px;text-align:center;}
.sidebar-credits{margin-top:auto;background:var(--surface2);border:1px solid var(--border);border-radius:10px;padding:1rem;text-align:center;}
.credits-num{font-family:"Syne",sans-serif;font-size:1.8rem;font-weight:800;color:var(--accent);}
.credits-label{font-size:0.75rem;color:var(--text-muted);margin-bottom:0.6rem;}
.main-content{flex:1;padding:2rem;overflow-y:auto;}
.page-title{font-family:"Syne",sans-serif;font-size:1.6rem;font-weight:800;margin-bottom:0.3rem;}
.page-sub{color:var(--text-muted);font-size:0.9rem;margin-bottom:2rem;}
/* PACKAGES */
.packages-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;margin-bottom:2rem;}
.package-card{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:1.5rem;cursor:pointer;transition:all 0.2s;position:relative;overflow:hidden;}
.package-card:hover{border-color:rgba(0,210,180,0.3);transform:translateY(-2px);}
.package-card.selected{border-color:var(--accent);background:rgba(0,210,180,0.04);}
.package-card.selected::before{content:"";position:absolute;top:0;left:0;right:0;height:2px;background:var(--accent);}
.package-popular{position:absolute;top:0.6rem;right:0.6rem;background:var(--accent);color:#050A0E;font-size:0.65rem;font-weight:700;padding:0.15rem 0.5rem;border-radius:100px;letter-spacing:0.08em;}
.package-name{font-family:"Syne",sans-serif;font-size:0.95rem;font-weight:700;margin-bottom:0.5rem;}
.package-credits{font-family:"Syne",sans-serif;font-size:2rem;font-weight:800;color:var(--accent);line-height:1;}
.package-credits-label{font-size:0.75rem;color:var(--text-muted);margin-bottom:0.8rem;}
.package-bonus{font-size:0.78rem;color:var(--warning);margin-bottom:0.8rem;}
.package-price{font-family:"Syne",sans-serif;font-size:1.1rem;font-weight:700;}
.package-price-sub{font-size:0.74rem;color:var(--text-muted);}
/* HISTORY */
.tx-item{display:flex;align-items:center;gap:1rem;padding:0.8rem 0;border-bottom:1px solid var(--border);}
.tx-item:last-child{border-bottom:none;}
.tx-icon{width:36px;height:36px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:1.1rem;background:var(--surface2);flex-shrink:0;}
.tx-text{flex:1;}
.tx-desc{font-size:0.87rem;font-weight:500;}
.tx-date{font-size:0.75rem;color:var(--text-muted);}
.tx-amount{font-family:"Syne",sans-serif;font-size:0.9rem;font-weight:700;}
.menu-toggle{display:none;background:none;border:none;color:var(--text);font-size:1.3rem;cursor:pointer;}
@media(max-width:768px){.sidebar{display:none;position:fixed;left:0;top:64px;bottom:0;z-index:50;width:220px;}.sidebar.open{display:flex;}.menu-toggle{display:block;}.main-content{padding:1rem;}.packages-grid{grid-template-columns:1fr 1fr;}}
</style>
</head>
<body>
<nav class="app-nav">
  <div style="display:flex;align-items:center;gap:0.8rem;">
    <button class="menu-toggle" onclick="document.getElementById('sidebar').classList.toggle('open')">☰</button>
    <a href="/" class="logo">TAGR<span class="logo-reg">®</span></a>
  </div>
  <div class="nav-right">
    <select class="currency-sel" onchange="setCurrency(this.value);renderPackages();" id="currencySel">
      <option value="IDR">IDR</option><option value="USD">USD</option><option value="EUR">EUR</option>
      <option value="MYR">MYR</option><option value="SGD">SGD</option><option value="PHP">PHP</option><option value="THB">THB</option>
    </select>
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
    <a href="/dashboard/generate" class="sidebar-link"><span class="icon">⚡</span><span data-i18n="dash.generate">Generate Labels</span></a>
    <a href="/dashboard/orders" class="sidebar-link"><span class="icon">📦</span><span data-i18n="dash.orders">My Orders</span></a>
    <a href="/dashboard/labels" class="sidebar-link"><span class="icon">🏷️</span><span data-i18n="dash.labels">My Labels</span></a>
    <a href="/dashboard/topup" class="sidebar-link active"><span class="icon">💳</span><span data-i18n="dash.topup">Top Up</span></a>
    <div class="sidebar-credits">
      <div class="credits-label" data-i18n="dash.credits">Credits</div>
      <div class="credits-num" id="sidebarCredits">—</div>
    </div>
  </aside>

  <main class="main-content">
    <div class="page-title" data-i18n="topup.title">Top Up Credits</div>
    <div class="page-sub">1 Credit = 1 NFC Label</div>

    <div style="font-family:'Syne',sans-serif;font-weight:700;margin-bottom:1rem;" data-i18n="topup.select">Select Package</div>
    <div class="packages-grid" id="packagesGrid">
      <div class="empty-state"><div class="spinner"></div></div>
    </div>

    <div class="card card-accent" id="paySection" style="display:none;max-width:480px;">
      <div style="font-family:'Syne',sans-serif;font-weight:700;margin-bottom:1rem;">💳 Payment</div>
      <div id="selectedSummary" style="margin-bottom:1rem;"></div>
      <div class="alert alert-warning show" style="margin-bottom:1rem;">
        ⚠️ You will be redirected to Midtrans payment page. Make sure your Midtrans keys are configured.
      </div>
      <button class="btn btn-primary btn-full" id="payBtn" onclick="doTopup()">
        <span data-i18n="topup.pay">Pay Now</span>
      </button>
    </div>

    <div class="card" style="margin-top:1.5rem;">
      <div style="font-family:'Syne',sans-serif;font-weight:700;margin-bottom:1rem;" data-i18n="topup.history">Transaction History</div>
      <div id="txHistory"><div class="empty-state"><div class="icon">📋</div><h3>No transactions yet</h3></div></div>
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
var packages=[], selectedPkg=null;

function renderPackages(){
  if(!packages.length)return;
  document.getElementById('packagesGrid').innerHTML=packages.map(function(p,i){
    var isSelected=selectedPkg&&selectedPkg.id===p.id;
    var isPopular=i===2;
    var totalCredits=p.credits+(p.bonus||0);
    return '<div class="package-card'+(isSelected?' selected':'')+'" onclick="selectPackage(\''+p.id+'\')">'+
      (isPopular?'<div class="package-popular">POPULAR</div>':'')+
      '<div class="package-name">'+p.name+'</div>'+
      '<div class="package-credits">'+p.credits.toLocaleString()+'</div>'+
      '<div class="package-credits-label">credits</div>'+
      (p.bonus>0?'<div class="package-bonus">+'+p.bonus+' bonus credits</div>':'')+
      '<div class="package-price" data-price="'+p.price+'">'+fmtCurrency(p.price)+'</div>'+
      '<div class="package-price-sub">'+fmtCurrency(Math.round(p.price/totalCredits))+' per label</div>'+
      '</div>';
  }).join('');
}

function selectPackage(id){
  selectedPkg=packages.find(function(p){return p.id===id;});
  renderPackages();
  if(selectedPkg){
    var total=selectedPkg.credits+(selectedPkg.bonus||0);
    document.getElementById('selectedSummary').innerHTML=
      '<div style="background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:1rem;">'
      +'<div style="display:flex;justify-content:space-between;margin-bottom:0.5rem;"><span>Package</span><strong>'+selectedPkg.name+'</strong></div>'
      +'<div style="display:flex;justify-content:space-between;margin-bottom:0.5rem;"><span>Credits</span><strong style="color:var(--accent)">'+total.toLocaleString()+' credits</strong></div>'
      +'<div style="display:flex;justify-content:space-between;"><span>Total</span><strong data-price="'+selectedPkg.price+'">'+fmtCurrency(selectedPkg.price)+'</strong></div>'
      +'</div>';
    document.getElementById('paySection').style.display='block';
    document.getElementById('paySection').scrollIntoView({behavior:'smooth'});
  }
}

async function doTopup(){
  if(!selectedPkg){showToast('Please select a package first','error');return;}
  var btn=document.getElementById('payBtn');
  btn.disabled=true;btn.innerHTML='<div class="spinner spinner-dark"></div>';
  try{
    var r=await fetch('/api/payment/create',{method:'POST',
      headers:{'Content-Type':'application/json','Authorization':'Bearer '+getToken()},
      body:JSON.stringify({package_id:selectedPkg.id,user_id:_userId})});
    var d=await r.json();
    if(d.snap_token){
      // Open Midtrans Snap
      if(window.snap){
        window.snap.pay(d.snap_token,{
          onSuccess:function(result){showToast('Payment successful!','success');setTimeout(function(){location.reload();},2000);},
          onPending:function(result){showToast('Payment pending. Check your email.','warning');},
          onError:function(result){showToast('Payment failed. Please try again.','error');},
          onClose:function(){showToast('Payment cancelled.','warning');}
        });
      }else{
        window.open('https://app.midtrans.com/snap/v2/vtweb/'+d.snap_token,'_blank');
      }
    }else if(d.redirect_url){
      window.open(d.redirect_url,'_blank');
    }else{
      showToast(d.error||'Payment creation failed','error');
    }
  }catch(e){showToast('Error: '+e.message,'error');}
  btn.disabled=false;btn.innerHTML='<span data-i18n="topup.pay">Pay Now</span>';applyLang(currentLang);
}

async function loadHistory(){
  try{
    var r=await sbFetch('/rest/v1/credit_transactions?select=*&user_id=eq.'+_userId+'&order=created_at.desc&limit=20');
    var txs=await r.json();
    if(txs&&txs.length>0){
      document.getElementById('txHistory').innerHTML=txs.map(function(tx){
        var icon=tx.type==='topup'?'💳':tx.type==='deduct'?'🏷️':'💰';
        var color=tx.amount>0?'var(--success)':'var(--danger)';
        var sign=tx.amount>0?'+':'';
        return '<div class="tx-item">'
          +'<div class="tx-icon">'+icon+'</div>'
          +'<div class="tx-text"><div class="tx-desc">'+tx.description+'</div>'
          +'<div class="tx-date">'+new Date(tx.created_at).toLocaleString()+'</div></div>'
          +'<div class="tx-amount" style="color:'+color+'">'+sign+tx.amount+' cr</div>'
          +'</div>';
      }).join('');
    }
  }catch(e){}
}

async function init(){
  await initSupabase();
  _accessToken=getToken();_userId=getUserId();
  if(!_accessToken||!_userId){window.location.href='/login';return;}
  await loadProfile();
  if(_userProfile){
    document.getElementById('sidebarCredits').textContent=(_userProfile.credits||0).toLocaleString();
  }
  // Load packages
  try{
    var r=await sbFetch('/rest/v1/credit_packages?select=*&is_active=eq.true&order=sort_order.asc');
    packages=await r.json()||[];
    renderPackages();
  }catch(e){showToast('Error loading packages','error');}
  await loadHistory();
  document.getElementById('currencySel').value=currentCurrency;
  applyLang(currentLang);
}

// Load Midtrans Snap
var s=document.createElement('script');
s.src='https://app.sandbox.midtrans.com/snap/snap.js';
s.setAttribute('data-client-key','YOUR_MIDTRANS_CLIENT_KEY');
document.head.appendChild(s);

init();
</script>
</body></html>`;
}
