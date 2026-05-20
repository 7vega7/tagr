// TAGR My Labels Page
import { getBaseStyles, getI18nJS } from './shared_inline.js';

export function getLabelsPage() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>TAGR — My Labels</title>
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
.page-sub{color:var(--text-muted);font-size:0.9rem;margin-bottom:1.5rem;}
.toolbar{display:flex;gap:0.8rem;margin-bottom:1rem;flex-wrap:wrap;align-items:center;}
.search-input{background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:0.6rem 1rem;font-family:"DM Sans",sans-serif;font-size:0.88rem;color:var(--text);outline:none;flex:1;min-width:180px;}
.search-input:focus{border-color:rgba(0,210,180,0.4);}
.code-cell{font-family:"Syne",monospace;font-size:0.8rem;letter-spacing:0.08em;color:var(--accent);}
.copy-btn{background:none;border:1px solid var(--border);border-radius:4px;color:var(--text-muted);padding:0.18rem 0.5rem;font-size:0.72rem;cursor:pointer;transition:all 0.15s;}
.copy-btn:hover{border-color:var(--accent);color:var(--accent);}
.copy-btn.copied{border-color:var(--success);color:var(--success);}
.pagination{display:flex;gap:0.4rem;flex-wrap:wrap;margin-top:1rem;}
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
    <a href="/dashboard/orders" class="sidebar-link"><span class="icon">📦</span><span data-i18n="dash.orders">My Orders</span></a>
    <a href="/dashboard/labels" class="sidebar-link active"><span class="icon">🏷️</span><span data-i18n="dash.labels">My Labels</span></a>
    <a href="/dashboard/topup" class="sidebar-link"><span class="icon">💳</span><span data-i18n="dash.topup">Top Up</span></a>
    <div class="sidebar-credits">
      <div class="credits-label" data-i18n="dash.credits">Credits</div>
      <div class="credits-num" id="sidebarCredits">—</div>
    </div>
  </aside>
  <main class="main-content">
    <div class="page-title" data-i18n="dash.labels">My Labels</div>
    <div class="page-sub" id="labelSubtitle">All your registered NFC labels</div>
    <div class="toolbar">
      <input type="text" class="search-input" placeholder="Search by code, product, serial..." oninput="filterLabels(this.value)"/>
      <button class="btn btn-secondary btn-sm" onclick="exportCSV()">📄 Export CSV</button>
    </div>
    <div class="table-wrap">
      <table>
        <thead><tr><th>#</th><th>Label Code</th><th>Product</th><th>Serial Number</th><th>Scans</th><th>Status</th><th>Verify URL</th></tr></thead>
        <tbody id="labelsBody"></tbody>
      </table>
    </div>
    <div class="pagination" id="pagination"></div>
  </main>
</div>
<footer class="app-footer">
  <span class="footer-logo">TAGR</span>
  <span class="footer-copy" data-i18n="footer.copy">© 2025 TAGR. All rights reserved.</span>
</footer>
<div class="toast" id="toast"></div>
<script>
${getI18nJS()}
var allLabels=[], filtered=[], page=0, perPage=50;
var BASE_URL='https://tagr.irfanvegaibara.workers.dev';

function encodeForUrl(code){return btoa(code).replace(/\+/g,'-').replace(/\//g,'_').replace(/=/g,'');}

function renderTable(data, pg){
  var start=pg*perPage, slice=data.slice(start,start+perPage);
  document.getElementById('labelsBody').innerHTML=slice.map(function(l,i){
    var url=BASE_URL+'/verify?t='+encodeForUrl(l.code);
    var st=l.active?'<span class="badge badge-success">Active</span>':'<span class="badge badge-danger">Inactive</span>';
    return '<tr>'
      +'<td style="color:var(--text-dim)">'+(start+i+1)+'</td>'
      +'<td><span class="code-cell">'+l.code+'</span></td>'
      +'<td style="max-width:150px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+(l.product_name||'—')+'</td>'
      +'<td><span class="code-cell" style="color:var(--text-muted);font-size:0.76rem">'+(l.serial_number||'—')+'</span></td>'
      +'<td style="text-align:center">'+(l.scan_count||0)+'</td>'
      +'<td>'+st+'</td>'
      +'<td><button class="copy-btn" id="cp-'+(start+i)+'" onclick="copyUrl('+(start+i)+',\''+url+'\')">Copy URL</button></td>'
      +'</tr>';
  }).join('') || '<tr><td colspan="7" style="text-align:center;color:var(--text-muted);padding:2rem;">No labels found</td></tr>';
  var total=Math.ceil(data.length/perPage);
  document.getElementById('pagination').innerHTML=total>1?Array.from({length:total},function(_,i){
    return '<button class="btn btn-sm '+(i===pg?'btn-primary':'btn-secondary')+'" onclick="page='+i+';renderTable(filtered||allLabels,'+i+')">'+(i+1)+'</button>';
  }).join(''):'';
}

function filterLabels(q){
  filtered=q?allLabels.filter(function(l){var s=q.toLowerCase();return(l.code||'').toLowerCase().includes(s)||(l.product_name||'').toLowerCase().includes(s)||(l.serial_number||'').toLowerCase().includes(s);}):allLabels;
  page=0;renderTable(filtered,0);
}

function copyUrl(idx, url){
  navigator.clipboard.writeText(url).then(function(){
    var b=document.getElementById('cp-'+idx);
    if(b){b.textContent='✓ Copied';b.classList.add('copied');setTimeout(function(){b.textContent='Copy URL';b.classList.remove('copied');},2000);}
  });
}

function exportCSV(){
  if(!allLabels.length){showToast('No labels to export','error');return;}
  var rows=[['Code','Product','Serial Number','Scans','Status','Verify URL']].concat(allLabels.map(function(l){
    return[l.code,l.product_name||'',l.serial_number||'',l.scan_count||0,l.active?'Active':'Inactive',BASE_URL+'/verify?t='+encodeForUrl(l.code)];
  }));
  var csv=rows.map(function(r){return r.map(function(v){return'"'+String(v).replace(/"/g,'""')+'"';}).join(',');}).join('\n');
  var a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));a.download='my-labels.csv';a.click();
  showToast('Exported!','success');
}

async function init(){
  await initSupabase();
  _accessToken=getToken();_userId=getUserId();
  if(!_accessToken||!_userId){window.location.href='/login';return;}
  await loadProfile();
  if(_userProfile)document.getElementById('sidebarCredits').textContent=(_userProfile.credits||0).toLocaleString();
  try{
    var r=await sbFetch('/rest/v1/nfc_labels?select=*&owner_id=eq.'+_userId+'&order=created_at.desc&limit=5000');
    allLabels=await r.json()||[];
    filtered=allLabels;
    document.getElementById('labelSubtitle').textContent=allLabels.length.toLocaleString()+' labels registered';
    renderTable(allLabels,0);
  }catch(e){showToast('Error loading labels','error');}
  applyLang(currentLang);
}
init();
</script>
</body></html>`;
}
