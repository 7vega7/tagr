// TAGR Dashboard — Main
import { getBaseStyles, getI18nJS } from './shared_inline.js';

export function getDashboardPage() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>TAGR — Dashboard</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet"/>
<style>
${getBaseStyles()}
body{display:flex;flex-direction:column;min-height:100vh;}
/* SIDEBAR LAYOUT */
.app-layout{display:flex;flex:1;min-height:calc(100vh - 64px);}
.sidebar{width:240px;background:var(--surface);border-right:1px solid var(--border);padding:1.5rem 1rem;flex-shrink:0;display:flex;flex-direction:column;gap:0.3rem;}
.sidebar-label{font-size:0.68rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--text-dim);padding:0 0.75rem;margin:0.8rem 0 0.3rem;}
.sidebar-link{display:flex;align-items:center;gap:0.65rem;padding:0.65rem 0.75rem;border-radius:8px;color:var(--text-muted);font-size:0.9rem;transition:all 0.2s;cursor:pointer;text-decoration:none;}
.sidebar-link:hover{background:var(--accent-dim);color:var(--text);}
.sidebar-link.active{background:var(--accent-dim);color:var(--accent);border:1px solid rgba(0,210,180,0.15);}
.sidebar-link .icon{font-size:1.1rem;width:20px;text-align:center;}
.sidebar-credits{margin-top:auto;background:var(--surface2);border:1px solid var(--border);border-radius:10px;padding:1rem;text-align:center;}
.credits-num{font-family:"Syne",sans-serif;font-size:1.8rem;font-weight:800;color:var(--accent);}
.credits-label{font-size:0.75rem;color:var(--text-muted);margin-bottom:0.6rem;}
/* MAIN CONTENT */
.main-content{flex:1;padding:2rem;overflow-y:auto;}
.page-header{margin-bottom:2rem;}
.page-title{font-family:"Syne",sans-serif;font-size:1.6rem;font-weight:800;letter-spacing:-0.02em;}
.page-sub{color:var(--text-muted);font-size:0.9rem;margin-top:0.3rem;}
/* STAT CARDS */
.stat-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:1rem;margin-bottom:2rem;}
.stat-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:1.3rem;}
.stat-label{font-size:0.74rem;letter-spacing:0.08em;text-transform:uppercase;color:var(--text-muted);margin-bottom:0.5rem;}
.stat-value{font-family:"Syne",sans-serif;font-size:1.7rem;font-weight:800;color:var(--text);line-height:1;}
.stat-sub{font-size:0.78rem;color:var(--text-dim);margin-top:0.3rem;}
.stat-icon{font-size:1.5rem;margin-bottom:0.6rem;}
/* QUICK ACTIONS */
.quick-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;margin-bottom:2rem;}
.quick-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:1.5rem;cursor:pointer;transition:all 0.25s;text-decoration:none;display:block;}
.quick-card:hover{border-color:var(--accent);transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,0.2);}
.quick-icon{font-size:1.8rem;margin-bottom:0.8rem;}
.quick-title{font-family:"Syne",sans-serif;font-size:1rem;font-weight:700;margin-bottom:0.3rem;}
.quick-sub{font-size:0.82rem;color:var(--text-muted);}
/* ACTIVITY */
.activity-item{display:flex;align-items:center;gap:1rem;padding:0.8rem 0;border-bottom:1px solid var(--border);}
.activity-item:last-child{border-bottom:none;}
.activity-icon{width:36px;height:36px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0;}
.activity-text{flex:1;}
.activity-title{font-size:0.88rem;font-weight:500;}
.activity-time{font-size:0.76rem;color:var(--text-muted);}
.activity-amount{font-family:"Syne",sans-serif;font-size:0.9rem;font-weight:700;}
/* MOBILE */
.menu-toggle{display:none;background:none;border:none;color:var(--text);font-size:1.3rem;cursor:pointer;padding:0.3rem;}
@media(max-width:768px){
  .sidebar{display:none;position:fixed;left:0;top:64px;bottom:0;z-index:50;width:220px;}
  .sidebar.open{display:flex;}
  .menu-toggle{display:block;}
  .main-content{padding:1rem;}
}
</style>
</head>
<body>
<nav class="app-nav">
  <div style="display:flex;align-items:center;gap:0.8rem;">
    <button class="menu-toggle" onclick="toggleSidebar()">☰</button>
    <a href="/" class="logo">TAGR<span class="logo-reg">®</span></a>
  </div>
  <div class="nav-right">
    <select class="currency-sel" onchange="setCurrency(this.value)" id="currencySel">
      <option value="IDR">IDR</option>
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <option value="MYR">MYR</option>
      <option value="SGD">SGD</option>
      <option value="PHP">PHP</option>
      <option value="THB">THB</option>
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
    <button class="btn btn-secondary btn-sm" onclick="doLogout()" data-i18n="nav.logout">Logout</button>
  </div>
</nav>

<div class="app-layout">
  <!-- SIDEBAR -->
  <aside class="sidebar" id="sidebar">
    <a href="/dashboard" class="sidebar-link active">
      <span class="icon">🏠</span><span data-i18n="nav.dashboard">Dashboard</span>
    </a>
    <a href="/dashboard/generate" class="sidebar-link">
      <span class="icon">⚡</span><span data-i18n="dash.generate">Generate Labels</span>
    </a>
    <a href="/dashboard/orders" class="sidebar-link">
      <span class="icon">📦</span><span data-i18n="dash.orders">My Orders</span>
    </a>
    <a href="/dashboard/labels" class="sidebar-link">
      <span class="icon">🏷️</span><span data-i18n="dash.labels">My Labels</span>
    </a>
    <div class="sidebar-label">Account</div>
    <a href="/dashboard/topup" class="sidebar-link">
      <span class="icon">💳</span><span data-i18n="dash.topup">Top Up</span>
    </a>
    <a href="/dashboard/profile" class="sidebar-link">
      <span class="icon">👤</span><span>Profile</span>
    </a>
    <div class="sidebar-credits">
      <div class="credits-label" data-i18n="dash.credits">Credits</div>
      <div class="credits-num" id="sidebarCredits">—</div>
      <a href="/dashboard/topup" class="btn btn-primary btn-sm btn-full" style="margin-top:0.5rem" data-i18n="dash.topup">Top Up</a>
    </div>
  </aside>

  <!-- MAIN -->
  <main class="main-content">
    <div class="page-header">
      <div class="page-title" id="welcomeTitle">Dashboard</div>
      <div class="page-sub" id="brandSub"></div>
    </div>

    <!-- STATS -->
    <div class="stat-grid">
      <div class="stat-card">
        <div class="stat-icon">💳</div>
        <div class="stat-label" data-i18n="dash.credits">Credits</div>
        <div class="stat-value" id="statCredits">—</div>
        <div class="stat-sub">Available balance</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">🏷️</div>
        <div class="stat-label">Total Labels</div>
        <div class="stat-value" id="statLabels">—</div>
        <div class="stat-sub">Generated labels</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">📦</div>
        <div class="stat-label" data-i18n="dash.orders">Orders</div>
        <div class="stat-value" id="statOrders">—</div>
        <div class="stat-sub">Total orders</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">📡</div>
        <div class="stat-label">Total Scans</div>
        <div class="stat-value" id="statScans">—</div>
        <div class="stat-sub">Label verifications</div>
      </div>
    </div>

    <!-- QUICK ACTIONS -->
    <div class="quick-grid">
      <a href="/dashboard/generate" class="quick-card">
        <div class="quick-icon">⚡</div>
        <div class="quick-title" data-i18n="dash.generate">Generate Labels</div>
        <div class="quick-sub">Create NFC labels for your products</div>
      </a>
      <a href="/dashboard/topup" class="quick-card">
        <div class="quick-icon">💳</div>
        <div class="quick-title" data-i18n="dash.topup">Top Up Credits</div>
        <div class="quick-sub">Add credits via Midtrans</div>
      </a>
      <a href="/dashboard/orders" class="quick-card">
        <div class="quick-icon">📦</div>
        <div class="quick-title" data-i18n="dash.orders">My Orders</div>
        <div class="quick-sub">Track your label shipments</div>
      </a>
    </div>

    <!-- RECENT ACTIVITY -->
    <div class="card card-accent">
      <div style="font-family:'Syne',sans-serif;font-weight:700;margin-bottom:1rem;" data-i18n="dash.recent">Recent Activity</div>
      <div id="activityList">
        <div class="empty-state">
          <div class="icon">📋</div>
          <h3 data-i18n="dash.no_activity">No activity yet</h3>
        </div>
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
function toggleSidebar(){document.getElementById('sidebar').classList.toggle('open');}
function doLogout(){clearSession();window.location.href='/login';}

async function loadDashboard(){
  await initSupabase();
  _accessToken=getToken();_userId=getUserId();
  if(!_accessToken||!_userId){window.location.href='/login';return;}
  await loadProfile();
  if(_userProfile){
    document.getElementById('welcomeTitle').textContent=t('dash.welcome')+', '+(_userProfile.full_name||_userProfile.email||'');
    document.getElementById('brandSub').textContent=_userProfile.brand_name+' · Prefix: '+_userProfile.brand_prefix;
    document.getElementById('statCredits').textContent=(_userProfile.credits||0).toLocaleString();
    document.getElementById('sidebarCredits').textContent=(_userProfile.credits||0).toLocaleString();
    if(_userProfile.role==='admin'){
      var adminLink=document.createElement('a');
      adminLink.href='/admin';adminLink.className='sidebar-link';
      adminLink.innerHTML='<span class="icon">⚙️</span><span>Admin Panel</span>';
      document.getElementById('sidebar').insertBefore(adminLink,document.querySelector('.sidebar-credits'));
    }
  }
  // Load stats
  try{
    var lr=await sbFetch('/rest/v1/nfc_labels?select=id,scan_count&owner_id=eq.'+_userId);
    var labels=await lr.json();
    document.getElementById('statLabels').textContent=(labels||[]).length.toLocaleString();
    var totalScans=(labels||[]).reduce(function(s,l){return s+(l.scan_count||0);},0);
    document.getElementById('statScans').textContent=totalScans.toLocaleString();
  }catch(e){}
  try{
    var or=await sbFetch('/rest/v1/orders?select=id&user_id=eq.'+_userId);
    var orders=await or.json();
    document.getElementById('statOrders').textContent=(orders||[]).length.toLocaleString();
  }catch(e){}
  // Activity
  try{
    var tr=await sbFetch('/rest/v1/credit_transactions?select=*&user_id=eq.'+_userId+'&order=created_at.desc&limit=10');
    var txs=await tr.json();
    if(txs&&txs.length>0){
      document.getElementById('activityList').innerHTML=txs.map(function(tx){
        var icon=tx.type==='topup'?'💳':tx.type==='deduct'?'🏷️':'💰';
        var color=tx.amount>0?'var(--success)':'var(--danger)';
        var sign=tx.amount>0?'+':'';
        return '<div class="activity-item">'
          +'<div class="activity-icon" style="background:var(--surface2)">'+icon+'</div>'
          +'<div class="activity-text"><div class="activity-title">'+tx.description+'</div>'
          +'<div class="activity-time">'+new Date(tx.created_at).toLocaleDateString()+'</div></div>'
          +'<div class="activity-amount" style="color:'+color+'">'+sign+tx.amount+' cr</div>'
          +'</div>';
      }).join('');
    }
  }catch(e){}
  // Currency
  document.getElementById('currencySel').value=currentCurrency;
  applyLang(currentLang);
}
loadDashboard();
</script>
</body></html>`;
}
