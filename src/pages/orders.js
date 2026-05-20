// TAGR Orders Page
import { getBaseStyles, getI18nJS } from '../lib/shared.js';

export function getOrdersPage() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>TAGR — My Orders</title>
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
.order-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:1.5rem;margin-bottom:1rem;transition:border-color 0.2s;}
.order-card:hover{border-color:rgba(0,210,180,0.2);}
.order-header{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:1rem;flex-wrap:wrap;gap:0.5rem;}
.order-num{font-family:"Syne",sans-serif;font-size:0.9rem;font-weight:700;color:var(--accent);}
.order-date{font-size:0.78rem;color:var(--text-muted);}
.order-details{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:0.8rem;margin-top:0.8rem;}
.order-detail-item{}.order-detail-label{font-size:0.7rem;text-transform:uppercase;letter-spacing:0.08em;color:var(--text-dim);margin-bottom:0.2rem;}
.order-detail-val{font-size:0.9rem;font-weight:500;}
.tracking-section{margin-top:1rem;padding-top:1rem;border-top:1px solid var(--border);}
.tracking-num{font-family:"Syne",monospace;color:var(--accent);font-size:0.88rem;}
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
    <a href="/dashboard/generate" class="sidebar-link"><span class="icon">⚡</span><span data-i18n="dash.generate">Generate Labels</span></a>
    <a href="/dashboard/orders" class="sidebar-link active"><span class="icon">📦</span><span data-i18n="dash.orders">My Orders</span></a>
    <a href="/dashboard/labels" class="sidebar-link"><span class="icon">🏷️</span><span data-i18n="dash.labels">My Labels</span></a>
    <a href="/dashboard/topup" class="sidebar-link"><span class="icon">💳</span><span data-i18n="dash.topup">Top Up</span></a>
    <div class="sidebar-credits">
      <div class="credits-label" data-i18n="dash.credits">Credits</div>
      <div class="credits-num" id="sidebarCredits">—</div>
    </div>
  </aside>

  <main class="main-content">
    <div class="page-title" data-i18n="order.title">My Orders</div>
    <div class="page-sub">Track your NFC label shipments</div>
    <div id="ordersList"><div class="empty-state"><div class="spinner"></div></div></div>
  </main>
</div>

<footer class="app-footer">
  <span class="footer-logo">TAGR</span>
  <span class="footer-copy" data-i18n="footer.copy">© 2025 TAGR. All rights reserved.</span>
</footer>
<div class="toast" id="toast"></div>
<script>
${getI18nJS()}
var statusColors={pending:'warning',confirmed:'info',processing:'info',shipped:'accent',delivered:'success',cancelled:'danger'};
var statusIcons={pending:'⏳',confirmed:'✅',processing:'🔧',shipped:'🚚',delivered:'📬',cancelled:'❌'};

async function init(){
  await initSupabase();
  _accessToken=getToken();_userId=getUserId();
  if(!_accessToken||!_userId){window.location.href='/login';return;}
  await loadProfile();
  if(_userProfile)document.getElementById('sidebarCredits').textContent=(_userProfile.credits||0).toLocaleString();
  try{
    var r=await sbFetch('/rest/v1/orders?select=*&user_id=eq.'+_userId+'&order=created_at.desc');
    var orders=await r.json()||[];
    if(orders.length===0){
      document.getElementById('ordersList').innerHTML='<div class="empty-state"><div class="icon">📦</div><h3>No orders yet</h3><p>Generate labels to place your first order</p></div>';
      return;
    }
    document.getElementById('ordersList').innerHTML=orders.map(function(o){
      var sc=statusColors[o.status]||'muted';
      var si=statusIcons[o.status]||'📋';
      return '<div class="order-card">'
        +'<div class="order-header">'
        +'<div><div class="order-num">'+o.order_number+'</div><div class="order-date">'+new Date(o.created_at).toLocaleString()+'</div></div>'
        +'<span class="badge badge-'+sc+'">'+si+' '+t('order.status.'+o.status)+'</span>'
        +'</div>'
        +'<div class="order-details">'
        +'<div class="order-detail-item"><div class="order-detail-label">Labels</div><div class="order-detail-val" style="color:var(--accent)">'+o.label_quantity+'</div></div>'
        +'<div class="order-detail-item"><div class="order-detail-label">Credits Used</div><div class="order-detail-val">'+o.credits_used+'</div></div>'
        +'<div class="order-detail-item"><div class="order-detail-label">Courier</div><div class="order-detail-val">'+(o.courier||'—').toUpperCase()+' '+(o.courier_service||'')+'</div></div>'
        +'<div class="order-detail-item"><div class="order-detail-label">Recipient</div><div class="order-detail-val">'+(o.recipient_name||'—')+'</div></div>'
        +'<div class="order-detail-item"><div class="order-detail-label">Address</div><div class="order-detail-val" style="font-size:0.82rem">'+(o.city||'')+(o.province?', '+o.province:'')+'</div></div>'
        +'</div>'
        +(o.tracking_number?'<div class="tracking-section"><span style="color:var(--text-muted);font-size:0.82rem;">Tracking: </span><span class="tracking-num">'+o.tracking_number+'</span></div>':'')
        +'</div>';
    }).join('');
  }catch(e){showToast('Error loading orders','error');}
  applyLang(currentLang);
}
init();
</script>
</body></html>`;
}
