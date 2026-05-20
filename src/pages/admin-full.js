// TAGR Admin Panel — Full
import { getBaseStyles, getI18nJS } from './shared_inline.js';

export function getAdminFullPage() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>TAGR Admin Panel</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet"/>
<style>
${getBaseStyles()}
body{display:flex;flex-direction:column;min-height:100vh;}
.app-layout{display:flex;flex:1;}
.sidebar{width:240px;background:var(--surface);border-right:1px solid var(--border);padding:1.5rem 1rem;flex-shrink:0;display:flex;flex-direction:column;gap:0.3rem;}
.sidebar-sep{border:none;border-top:1px solid var(--border);margin:0.8rem 0;}
.sidebar-label{font-size:0.68rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--text-dim);padding:0 0.75rem;margin:0.5rem 0 0.2rem;}
.sidebar-link{display:flex;align-items:center;gap:0.65rem;padding:0.65rem 0.75rem;border-radius:8px;color:var(--text-muted);font-size:0.9rem;transition:all 0.2s;cursor:pointer;}
.sidebar-link:hover{background:var(--accent-dim);color:var(--text);}
.sidebar-link.active{background:var(--accent-dim);color:var(--accent);border:1px solid rgba(0,210,180,0.15);}
.sidebar-link .icon{font-size:1rem;width:20px;text-align:center;}
.main-content{flex:1;padding:2rem;overflow-y:auto;}
/* TABS */
.tab-content{display:none;} .tab-content.active{display:block;}
.page-title{font-family:"Syne",sans-serif;font-size:1.5rem;font-weight:800;margin-bottom:0.3rem;}
.page-sub{color:var(--text-muted);font-size:0.88rem;margin-bottom:1.5rem;}
/* STAT CARDS */
.stat-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:1rem;margin-bottom:1.5rem;}
.stat-card{background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:1.2rem;}
.stat-icon{font-size:1.3rem;margin-bottom:0.5rem;}
.stat-label{font-size:0.72rem;text-transform:uppercase;letter-spacing:0.08em;color:var(--text-muted);margin-bottom:0.3rem;}
.stat-value{font-family:"Syne",sans-serif;font-size:1.5rem;font-weight:800;}
/* SEARCH & FILTERS */
.toolbar{display:flex;gap:0.8rem;margin-bottom:1rem;flex-wrap:wrap;align-items:center;}
.search-input{background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:0.6rem 1rem;font-family:"DM Sans",sans-serif;font-size:0.88rem;color:var(--text);outline:none;min-width:200px;flex:1;}
.search-input:focus{border-color:rgba(0,210,180,0.4);}
/* MODAL */
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:500;display:flex;align-items:center;justify-content:center;padding:1rem;}
.modal-overlay.hidden{display:none;}
.modal{background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:2rem;width:100%;max-width:520px;position:relative;max-height:90vh;overflow-y:auto;}
.modal-title{font-family:"Syne",sans-serif;font-size:1.2rem;font-weight:800;margin-bottom:1.5rem;}
.modal-close{position:absolute;top:1rem;right:1rem;background:none;border:none;color:var(--text-muted);font-size:1.2rem;cursor:pointer;}
/* TAGS */
.brand-tag{display:inline-block;background:var(--accent-dim);border:1px solid rgba(0,210,180,0.2);color:var(--accent);padding:0.15rem 0.5rem;border-radius:4px;font-size:0.75rem;font-family:"Syne",monospace;letter-spacing:0.06em;}
.role-admin{background:rgba(255,75,110,0.1);border:1px solid rgba(255,75,110,0.2);color:var(--danger);padding:0.15rem 0.5rem;border-radius:4px;font-size:0.75rem;}
.role-user{background:var(--surface2);border:1px solid var(--border);color:var(--text-muted);padding:0.15rem 0.5rem;border-radius:4px;font-size:0.75rem;}
.menu-toggle{display:none;background:none;border:none;color:var(--text);font-size:1.3rem;cursor:pointer;}
@media(max-width:768px){.sidebar{display:none;position:fixed;left:0;top:64px;bottom:0;z-index:50;width:220px;}.sidebar.open{display:flex;}.menu-toggle{display:block;}.main-content{padding:1rem;}.stat-grid{grid-template-columns:1fr 1fr;}}
</style>
</head>
<body>
<nav class="app-nav">
  <div style="display:flex;align-items:center;gap:0.8rem;">
    <button class="menu-toggle" onclick="document.getElementById('sidebar').classList.toggle('open')">☰</button>
    <a href="/" class="logo">TAGR<span class="logo-reg">®</span></a>
    <span style="background:rgba(255,75,110,0.15);border:1px solid rgba(255,75,110,0.3);color:var(--danger);padding:0.15rem 0.6rem;border-radius:4px;font-size:0.72rem;font-weight:700;">ADMIN</span>
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
    <span id="adminEmail" style="font-size:0.82rem;color:var(--text-muted);"></span>
    <button class="btn btn-secondary btn-sm" onclick="clearSession();location.href='/login'">Logout</button>
  </div>
</nav>

<div class="app-layout">
  <aside class="sidebar" id="sidebar">
    <div class="sidebar-label">Overview</div>
    <div class="sidebar-link active" onclick="showTab('overview')"><span class="icon">📊</span>Overview</div>
    <div class="sidebar-sep"></div>
    <div class="sidebar-label">Manage</div>
    <div class="sidebar-link" onclick="showTab('users')"><span class="icon">👥</span>Users</div>
    <div class="sidebar-link" onclick="showTab('labels')"><span class="icon">🏷️</span>Labels</div>
    <div class="sidebar-link" onclick="showTab('orders')"><span class="icon">📦</span>Orders</div>
    <div class="sidebar-link" onclick="showTab('payments')"><span class="icon">💳</span>Payments</div>
    <div class="sidebar-sep"></div>
    <div class="sidebar-label">Settings</div>
    <div class="sidebar-link" onclick="showTab('packages')"><span class="icon">💰</span>Credit Packages</div>
    <div class="sidebar-link" onclick="showTab('generate')"><span class="icon">⚡</span>Batch Generate</div>
    <div class="sidebar-sep"></div>
    <a href="/dashboard" style="display:flex;align-items:center;gap:0.65rem;padding:0.65rem 0.75rem;border-radius:8px;color:var(--text-muted);font-size:0.9rem;text-decoration:none;">
      <span class="icon">🏠</span>User Dashboard
    </a>
  </aside>

  <main class="main-content">

    <!-- OVERVIEW TAB -->
    <div class="tab-content active" id="tab-overview">
      <div class="page-title">Overview</div>
      <div class="page-sub">Platform statistics at a glance</div>
      <div class="stat-grid">
        <div class="stat-card"><div class="stat-icon">👥</div><div class="stat-label">Total Users</div><div class="stat-value" id="ovUsers">—</div></div>
        <div class="stat-card"><div class="stat-icon">🏷️</div><div class="stat-label">Total Labels</div><div class="stat-value" id="ovLabels">—</div></div>
        <div class="stat-card"><div class="stat-icon">📦</div><div class="stat-label">Total Orders</div><div class="stat-value" id="ovOrders">—</div></div>
        <div class="stat-card"><div class="stat-icon">💳</div><div class="stat-label">Revenue (IDR)</div><div class="stat-value" id="ovRevenue">—</div></div>
        <div class="stat-card"><div class="stat-icon">📡</div><div class="stat-label">Total Scans</div><div class="stat-value" id="ovScans">—</div></div>
      </div>
      <div class="card"><div style="font-family:'Syne',sans-serif;font-weight:700;margin-bottom:1rem;">Recent Signups</div><div id="recentUsers"></div></div>
    </div>

    <!-- USERS TAB -->
    <div class="tab-content" id="tab-users">
      <div class="page-title">Users</div>
      <div class="page-sub">Manage registered brands and their credits</div>
      <div class="toolbar">
        <input type="text" class="search-input" placeholder="Search by name, email, or brand..." oninput="filterUsers(this.value)" id="userSearch"/>
        <button class="btn btn-primary btn-sm" onclick="openAdjustCreditsModal()">💳 Adjust Credits</button>
      </div>
      <div class="table-wrap"><table>
        <thead><tr><th>Brand</th><th>Name / Email</th><th>Credits</th><th>Labels</th><th>Role</th><th>Joined</th><th>Actions</th></tr></thead>
        <tbody id="usersBody"></tbody>
      </table></div>
      <div id="usersPagination" style="margin-top:1rem;display:flex;gap:0.5rem;"></div>
    </div>

    <!-- LABELS TAB -->
    <div class="tab-content" id="tab-labels">
      <div class="page-title">Labels</div>
      <div class="page-sub">View, edit, and manage all NFC labels</div>
      <div class="toolbar">
        <input type="text" class="search-input" placeholder="Search by code, product, brand, serial..." oninput="filterLabels(this.value)" id="labelSearch"/>
        <select class="currency-sel" onchange="filterLabelsByBrand(this.value)" id="brandFilter" style="min-width:140px;">
          <option value="">All Brands</option>
        </select>
        <button class="btn btn-primary btn-sm" onclick="openAddLabelModal()">➕ Add Label</button>
        <button class="btn btn-secondary btn-sm" onclick="openBatchLabelModal()">⚡ Batch Add</button>
      </div>
      <div class="table-wrap"><table>
        <thead><tr><th>Code</th><th>Brand</th><th>Product</th><th>Serial</th><th>Owner</th><th>Scans</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody id="labelsBody"></tbody>
      </table></div>
      <div id="labelsPagination" style="margin-top:1rem;display:flex;gap:0.5rem;flex-wrap:wrap;"></div>
    </div>

    <!-- ORDERS TAB -->
    <div class="tab-content" id="tab-orders">
      <div class="page-title">Orders</div>
      <div class="page-sub">Manage label orders and shipments</div>
      <div class="toolbar">
        <input type="text" class="search-input" placeholder="Search orders..." id="orderSearch" oninput="filterOrders(this.value)"/>
        <select class="currency-sel" onchange="filterOrdersByStatus(this.value)" style="min-width:140px;">
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>
      <div class="table-wrap"><table>
        <thead><tr><th>Order #</th><th>User</th><th>Labels</th><th>Courier</th><th>Status</th><th>Tracking</th><th>Date</th><th>Actions</th></tr></thead>
        <tbody id="ordersBody"></tbody>
      </table></div>
    </div>

    <!-- PAYMENTS TAB -->
    <div class="tab-content" id="tab-payments">
      <div class="page-title">Payments</div>
      <div class="page-sub">Track all credit top-up transactions</div>
      <div class="table-wrap"><table>
        <thead><tr><th>Order ID</th><th>User</th><th>Package</th><th>Credits</th><th>Amount</th><th>Method</th><th>Status</th><th>Date</th></tr></thead>
        <tbody id="paymentsBody"></tbody>
      </table></div>
    </div>

    <!-- PACKAGES TAB -->
    <div class="tab-content" id="tab-packages">
      <div class="page-title">Credit Packages</div>
      <div class="page-sub">Manage pricing for credit top-ups</div>
      <button class="btn btn-primary btn-sm" onclick="openPackageModal()" style="margin-bottom:1rem;">➕ Add Package</button>
      <div class="table-wrap"><table>
        <thead><tr><th>Name</th><th>Credits</th><th>Bonus</th><th>Price (IDR)</th><th>Per Label</th><th>Active</th><th>Actions</th></tr></thead>
        <tbody id="packagesBody"></tbody>
      </table></div>
    </div>

    <!-- BATCH GENERATE TAB -->
    <div class="tab-content" id="tab-generate">
      <div class="page-title">Admin Batch Generate</div>
      <div class="page-sub">Generate labels for any brand without credit deduction</div>
      <div class="card card-accent">
        <div class="grid-2">
          <div class="field"><label>Select Brand / User</label>
            <select id="adminBrandSelect" class="field input"><option value="">— Select Brand —</option></select>
          </div>
          <div class="field"><label>Product Name</label><input type="text" id="adminProduct" placeholder="Product name"/></div>
          <div class="field"><label>Manufacturer</label><input type="text" id="adminManufacturer" placeholder="Manufacturer"/></div>
          <div class="field"><label>Country of Origin</label><input type="text" id="adminOrigin" placeholder="Indonesia"/></div>
          <div class="field"><label>Manufacture Date</label><input type="date" id="adminMfDate"/></div>
          <div class="field"><label>Expiry Date</label><input type="date" id="adminExpDate"/></div>
          <div class="field"><label>Quantity</label><input type="number" id="adminQty" value="100" min="1" max="10000"/></div>
          <div class="field"><label>Serial Prefix</label><input type="text" id="adminSerial" placeholder="SN-2026-"/></div>
        </div>
        <button class="btn btn-primary" onclick="adminGenerate()">⚡ Generate & Save</button>
      </div>
      <div id="adminGenResults" style="margin-top:1rem;"></div>
    </div>

  </main>
</div>

<!-- MODALS -->
<div class="modal-overlay hidden" id="modalOverlay">
  <div class="modal" id="modalContent">
    <button class="modal-close" onclick="closeModal()">✕</button>
    <div id="modalBody"></div>
  </div>
</div>

<footer class="app-footer">
  <span class="footer-logo">TAGR</span>
  <span class="footer-copy">© 2025 TAGR Admin Panel</span>
</footer>
<div class="toast" id="toast"></div>

<script>
${getI18nJS()}
var allUsers=[], allLabels=[], allOrders=[], allPayments=[], allPackages=[];
var labelPage=0, labelPerPage=50;

function showTab(name){
  document.querySelectorAll('.tab-content').forEach(function(t){t.classList.remove('active');});
  document.querySelectorAll('.sidebar-link').forEach(function(l){l.classList.remove('active');});
  var tab=document.getElementById('tab-'+name);
  if(tab)tab.classList.add('active');
  document.querySelectorAll('.sidebar-link').forEach(function(l){if(l.textContent.toLowerCase().includes(name.toLowerCase()))l.classList.add('active');});
  if(name==='users'&&!allUsers.length)loadUsers();
  if(name==='labels'&&!allLabels.length)loadLabels();
  if(name==='orders'&&!allOrders.length)loadOrders();
  if(name==='payments'&&!allPayments.length)loadPayments();
  if(name==='packages'&&!allPackages.length)loadPackages();
  if(name==='generate')loadBrandsForSelect();
}

function openModal(html){document.getElementById('modalBody').innerHTML=html;document.getElementById('modalOverlay').classList.remove('hidden');}
function closeModal(){document.getElementById('modalOverlay').classList.add('hidden');}

// ── USERS ──
async function loadUsers(){
  try{
    var r=await sbFetch('/rest/v1/profiles?select=*,nfc_labels(id)&order=created_at.desc&limit=200');
    allUsers=await r.json()||[];
    renderUsers(allUsers);
  }catch(e){showToast('Error loading users','error');}
}

function renderUsers(users){
  document.getElementById('usersBody').innerHTML=users.map(function(u){
    var labelCount=u.nfc_labels?u.nfc_labels.length:0;
    return '<tr>'
      +'<td><span class="brand-tag">'+u.brand_prefix+'</span><br><small style="color:var(--text-muted)">'+u.brand_name+'</small></td>'
      +'<td><div>'+u.full_name+'</div><small style="color:var(--text-muted)">'+u.email+'</small></td>'
      +'<td><strong style="color:var(--accent)">'+( u.credits||0).toLocaleString()+'</strong></td>'
      +'<td>'+labelCount+'</td>'
      +'<td><span class="'+(u.role==='admin'?'role-admin':'role-user')+'">'+u.role+'</span></td>'
      +'<td style="color:var(--text-muted);font-size:0.8rem">'+new Date(u.created_at).toLocaleDateString()+'</td>'
      +'<td><div style="display:flex;gap:0.4rem;">'
      +'<button class="btn btn-secondary btn-sm" onclick="openEditUserModal(\''+u.id+'\')">Edit</button>'
      +'<button class="btn btn-secondary btn-sm" onclick="openCreditModal(\''+u.id+'\',\''+u.full_name+'\','+u.credits+')">Credits</button>'
      +'<button class="btn btn-danger btn-sm" onclick="toggleUserStatus(\''+u.id+'\','+u.is_active+')">'+(u.is_active?'Deactivate':'Activate')+'</button>'
      +'</div></td>'
      +'</tr>';
  }).join('') || '<tr><td colspan="7" class="empty-state">No users found</td></tr>';
}

function filterUsers(q){
  var f=allUsers.filter(function(u){var s=q.toLowerCase();return(u.email||'').toLowerCase().includes(s)||(u.full_name||'').toLowerCase().includes(s)||(u.brand_name||'').toLowerCase().includes(s)||(u.brand_prefix||'').toLowerCase().includes(s);});
  renderUsers(f);
}

function openCreditModal(userId, name, current){
  openModal('<div class="modal-title">💳 Adjust Credits — '+name+'</div>'
    +'<div class="field"><label>Current Credits</label><input type="text" value="'+current+'" disabled/></div>'
    +'<div class="field"><label>Adjustment (+/-)</label><input type="number" id="creditAdj" placeholder="e.g. 100 or -50"/></div>'
    +'<div class="field"><label>Reason</label><input type="text" id="creditReason" placeholder="Admin adjustment reason"/></div>'
    +'<button class="btn btn-primary btn-full" onclick="applyCredit(\''+userId+'\','+current+')">Apply</button>');
}

async function applyCredit(userId, current){
  var adj=parseInt(document.getElementById('creditAdj').value)||0;
  var reason=document.getElementById('creditReason').value||'Admin adjustment';
  if(adj===0){showToast('Enter a non-zero adjustment','error');return;}
  var newBal=current+adj;
  if(newBal<0){showToast('Cannot set credits below 0','error');return;}
  try{
    await sbFetch('/rest/v1/profiles?id=eq.'+userId,{method:'PATCH',headers:{'Prefer':'return=minimal'},body:JSON.stringify({credits:newBal})});
    await sbFetch('/rest/v1/credit_transactions',{method:'POST',headers:{'Prefer':'return=minimal'},body:JSON.stringify({user_id:userId,type:'admin_adjust',amount:adj,balance_after:newBal,description:reason})});
    showToast('Credits updated!','success');closeModal();loadUsers();
  }catch(e){showToast('Error: '+e.message,'error');}
}

async function toggleUserStatus(userId, isActive){
  await sbFetch('/rest/v1/profiles?id=eq.'+userId,{method:'PATCH',headers:{'Prefer':'return=minimal'},body:JSON.stringify({is_active:!isActive})});
  showToast('User status updated','success');loadUsers();
}

// ── LABELS ──
async function loadLabels(){
  try{
    var r=await sbFetch('/rest/v1/nfc_labels?select=*,profiles(brand_name,brand_prefix,email)&order=created_at.desc&limit=200');
    allLabels=await r.json()||[];
    // Populate brand filter
    var brands=[...new Set(allLabels.map(function(l){return l.brand_prefix||'—';}))];
    document.getElementById('brandFilter').innerHTML='<option value="">All Brands</option>'+brands.map(function(b){return '<option value="'+b+'">'+b+'</option>';}).join('');
    renderLabels(allLabels, 0);
  }catch(e){showToast('Error loading labels','error');}
}

function renderLabels(labels, page){
  var start=page*labelPerPage, end=start+labelPerPage;
  var slice=labels.slice(start,end);
  document.getElementById('labelsBody').innerHTML=slice.map(function(l){
    var statusBadge=l.active?'<span class="badge badge-success">Active</span>':'<span class="badge badge-danger">Inactive</span>';
    var owner=l.profiles?l.profiles.brand_prefix:l.brand_prefix||'—';
    return '<tr>'
      +'<td><span class="code-text">'+l.code+'</span></td>'
      +'<td><span class="brand-tag">'+owner+'</span></td>'
      +'<td style="max-width:150px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+( l.product_name||'—')+'</td>'
      +'<td><span class="code-text" style="font-size:0.78rem;color:var(--text-muted)">'+( l.serial_number||'—')+'</span></td>'
      +'<td style="color:var(--text-muted);font-size:0.8rem">'+(l.profiles?l.profiles.email:l.owner_id||'Admin')+'</td>'
      +'<td style="text-align:center">'+( l.scan_count||0)+'</td>'
      +'<td>'+statusBadge+'</td>'
      +'<td><div style="display:flex;gap:0.4rem;">'
      +'<button class="btn btn-secondary btn-sm" onclick="openEditLabelModal(\''+l.id+'\')">Edit</button>'
      +'<button class="btn btn-danger btn-sm" onclick="deleteLabel(\''+l.id+'\')"">Del</button>'
      +'</div></td>'
      +'</tr>';
  }).join('') || '<tr><td colspan="8" style="text-align:center;color:var(--text-muted);padding:2rem;">No labels found</td></tr>';
  // Pagination
  var totalPages=Math.ceil(labels.length/labelPerPage);
  document.getElementById('labelsPagination').innerHTML=Array.from({length:totalPages},function(_,i){
    return '<button class="btn btn-sm '+(i===page?'btn-primary':'btn-secondary')+'" onclick="renderLabels(filteredLabels||allLabels,'+i+')">'+(i+1)+'</button>';
  }).join('');
}

var filteredLabels=null;
function filterLabels(q){filteredLabels=allLabels.filter(function(l){var s=q.toLowerCase();return(l.code||'').toLowerCase().includes(s)||(l.product_name||'').toLowerCase().includes(s)||(l.serial_number||'').toLowerCase().includes(s)||(l.brand_prefix||'').toLowerCase().includes(s);});renderLabels(filteredLabels,0);}
function filterLabelsByBrand(b){filteredLabels=b?allLabels.filter(function(l){return l.brand_prefix===b;}):allLabels;renderLabels(filteredLabels,0);}

function openEditLabelModal(id){
  var l=allLabels.find(function(x){return x.id===id;});
  if(!l)return;
  openModal('<div class="modal-title">Edit Label</div>'
    +'<div class="field"><label>Code</label><input type="text" id="elCode" value="'+l.code+'" disabled/></div>'
    +'<div class="field"><label>Product Name</label><input type="text" id="elProduct" value="'+(l.product_name||'')+'"/></div>'
    +'<div class="field"><label>Manufacturer</label><input type="text" id="elMfr" value="'+(l.manufacturer||'')+'"/></div>'
    +'<div class="field"><label>Serial Number</label><input type="text" id="elSerial" value="'+(l.serial_number||'')+'"/></div>'
    +'<div class="field"><label>Country of Origin</label><input type="text" id="elOrigin" value="'+(l.origin_country||'')+'"/></div>'
    +'<div class="grid-2">'
    +'<div class="field"><label>Manufactured</label><input type="date" id="elMfDate" value="'+(l.manufactured_at?l.manufactured_at.slice(0,10):'')+'"/></div>'
    +'<div class="field"><label>Expires</label><input type="date" id="elExpDate" value="'+(l.expires_at?l.expires_at.slice(0,10):'')+'"/></div>'
    +'</div>'
    +'<div class="field"><label>Active</label><select id="elActive"><option value="true"'+(l.active?' selected':'')+'>Active</option><option value="false"'+(!l.active?' selected':'')+'>Inactive</option></select></div>'
    +'<button class="btn btn-primary btn-full" onclick="saveLabel(\''+id+'\')">Save Changes</button>');
}

async function saveLabel(id){
  var body={product_name:document.getElementById('elProduct').value,manufacturer:document.getElementById('elMfr').value,serial_number:document.getElementById('elSerial').value,origin_country:document.getElementById('elOrigin').value,manufactured_at:document.getElementById('elMfDate').value||null,expires_at:document.getElementById('elExpDate').value||null,active:document.getElementById('elActive').value==='true'};
  await sbFetch('/rest/v1/nfc_labels?id=eq.'+id,{method:'PATCH',headers:{'Prefer':'return=minimal'},body:JSON.stringify(body)});
  showToast('Label updated!','success');closeModal();allLabels=[];loadLabels();
}

async function deleteLabel(id){
  if(!confirm('Delete this label? This cannot be undone.'))return;
  await sbFetch('/rest/v1/nfc_labels?id=eq.'+id,{method:'DELETE',headers:{'Prefer':'return=minimal'}});
  showToast('Label deleted','success');allLabels=[];loadLabels();
}

function openAddLabelModal(){
  openModal('<div class="modal-title">Add Label</div>'
    +'<div class="field"><label>Label Code</label><input type="text" id="alCode" placeholder="e.g. BRAND-XXXX-XXXX"/></div>'
    +'<div class="field"><label>Brand Prefix (owner)</label><select id="alBrand"><option value="">— Select —</option>'+allUsers.map(function(u){return '<option value="'+u.id+'|'+u.brand_prefix+'">'+u.brand_prefix+' — '+u.brand_name+'</option>';}).join('')+'</select></div>'
    +'<div class="field"><label>Product Name</label><input type="text" id="alProduct"/></div>'
    +'<div class="field"><label>Manufacturer</label><input type="text" id="alMfr"/></div>'
    +'<div class="field"><label>Serial Number</label><input type="text" id="alSerial"/></div>'
    +'<button class="btn btn-primary btn-full" onclick="addLabel()">Add Label</button>');
}

async function addLabel(){
  var code=document.getElementById('alCode').value.trim().toUpperCase();
  var brandVal=document.getElementById('alBrand').value;
  var product=document.getElementById('alProduct').value.trim();
  var mfr=document.getElementById('alMfr').value.trim();
  var serial=document.getElementById('alSerial').value.trim();
  if(!code||!brandVal){showToast('Code and brand are required','error');return;}
  // Check duplicate
  var chk=await sbFetch('/rest/v1/nfc_labels?code=eq.'+code+'&limit=1');
  var chkData=await chk.json();
  if(chkData&&chkData.length>0){showToast('Code already exists! Use a unique code.','error');return;}
  var parts=brandVal.split('|');
  var ownerId=parts[0], brandPrefix=parts[1];
  var r=await sbFetch('/rest/v1/nfc_labels',{method:'POST',headers:{'Prefer':'return=minimal'},body:JSON.stringify({code:code,product_name:product,manufacturer:mfr,serial_number:serial,brand_prefix:brandPrefix,owner_id:ownerId,scan_count:0,active:true})});
  if(r.ok||r.status===201){showToast('Label added!','success');closeModal();allLabels=[];loadLabels();}
  else showToast('Error adding label','error');
}

// ── ORDERS ──
async function loadOrders(){
  try{
    var r=await sbFetch('/rest/v1/orders?select=*,profiles(brand_name,email)&order=created_at.desc&limit=100');
    allOrders=await r.json()||[];
    renderOrders(allOrders);
  }catch(e){}
}

function renderOrders(orders){
  var statusColors={pending:'warning',confirmed:'info',processing:'info',shipped:'accent',delivered:'success',cancelled:'danger'};
  document.getElementById('ordersBody').innerHTML=orders.map(function(o){
    var sc=statusColors[o.status]||'muted';
    return '<tr>'
      +'<td><span class="code-text" style="font-size:0.78rem">'+o.order_number+'</span></td>'
      +'<td>'+(o.profiles?o.profiles.brand_name:'—')+'<br><small style="color:var(--text-muted)">'+(o.profiles?o.profiles.email:'')+'</small></td>'
      +'<td style="text-align:center">'+o.label_quantity+'</td>'
      +'<td>'+(o.courier||'—').toUpperCase()+' '+(o.courier_service||'')+'</td>'
      +'<td><span class="badge badge-'+sc+'">'+o.status+'</span></td>'
      +'<td style="font-size:0.8rem;color:var(--text-muted)">'+(o.tracking_number||'—')+'</td>'
      +'<td style="font-size:0.8rem;color:var(--text-muted)">'+new Date(o.created_at).toLocaleDateString()+'</td>'
      +'<td><button class="btn btn-secondary btn-sm" onclick="openShipModal(\''+o.id+'\',\''+o.status+'\')">Update</button></td>'
      +'</tr>';
  }).join('');
}

function filterOrders(q){var f=allOrders.filter(function(o){return(o.order_number||'').toLowerCase().includes(q.toLowerCase());});renderOrders(f);}
function filterOrdersByStatus(s){renderOrders(s?allOrders.filter(function(o){return o.status===s;}):allOrders);}

function openShipModal(id, status){
  openModal('<div class="modal-title">Update Order</div>'
    +'<div class="field"><label>Status</label><select id="shipStatus">'
    +'<option value="pending"'+(status==='pending'?' selected':'')+'>Pending</option>'
    +'<option value="confirmed"'+(status==='confirmed'?' selected':'')+'>Confirmed</option>'
    +'<option value="processing"'+(status==='processing'?' selected':'')+'>Processing</option>'
    +'<option value="shipped"'+(status==='shipped'?' selected':'')+'>Shipped</option>'
    +'<option value="delivered"'+(status==='delivered'?' selected':'')+'>Delivered</option>'
    +'<option value="cancelled"'+(status==='cancelled'?' selected':'')+'>Cancelled</option>'
    +'</select></div>'
    +'<div class="field"><label>Tracking Number</label><input type="text" id="trackingNum" placeholder="e.g. JNE001234567"/></div>'
    +'<button class="btn btn-primary btn-full" onclick="updateOrder(\''+id+'\')">Update Order</button>');
}

async function updateOrder(id){
  var status=document.getElementById('shipStatus').value;
  var tracking=document.getElementById('trackingNum').value;
  var body={status:status};
  if(tracking)body.tracking_number=tracking;
  if(status==='shipped')body.shipped_at=new Date().toISOString();
  if(status==='delivered')body.delivered_at=new Date().toISOString();
  await sbFetch('/rest/v1/orders?id=eq.'+id,{method:'PATCH',headers:{'Prefer':'return=minimal'},body:JSON.stringify(body)});
  showToast('Order updated!','success');closeModal();allOrders=[];loadOrders();
}

// ── PAYMENTS ──
async function loadPayments(){
  try{
    var r=await sbFetch('/rest/v1/payments?select=*,profiles(brand_name,email),credit_packages(name)&order=created_at.desc&limit=100');
    allPayments=await r.json()||[];
    var statusColors={success:'success',pending:'warning',failed:'danger',expired:'muted',cancelled:'danger'};
    document.getElementById('paymentsBody').innerHTML=allPayments.map(function(p){
      var sc=statusColors[p.status]||'muted';
      return '<tr>'
        +'<td style="font-size:0.78rem"><span class="code-text">'+p.midtrans_order_id+'</span></td>'
        +'<td>'+(p.profiles?p.profiles.brand_name:'—')+'</td>'
        +'<td>'+(p.credit_packages?p.credit_packages.name:'—')+'</td>'
        +'<td style="color:var(--accent);font-weight:700">'+p.credits_amount+'</td>'
        +'<td>Rp '+(p.amount||0).toLocaleString('id-ID')+'</td>'
        +'<td style="color:var(--text-muted)">'+(p.payment_method||'—')+'</td>'
        +'<td><span class="badge badge-'+sc+'">'+p.status+'</span></td>'
        +'<td style="font-size:0.78rem;color:var(--text-muted)">'+new Date(p.created_at).toLocaleDateString()+'</td>'
        +'</tr>';
    }).join('');
  }catch(e){}
}

// ── PACKAGES ──
async function loadPackages(){
  try{
    var r=await sbFetch('/rest/v1/credit_packages?select=*&order=sort_order.asc');
    allPackages=await r.json()||[];
    document.getElementById('packagesBody').innerHTML=allPackages.map(function(p){
      var perLabel=Math.round(p.price/(p.credits+(p.bonus||0)));
      return '<tr>'
        +'<td><strong>'+p.name+'</strong></td>'
        +'<td style="color:var(--accent);font-weight:700">'+p.credits.toLocaleString()+'</td>'
        +'<td style="color:var(--warning)">'+(p.bonus||0)+'</td>'
        +'<td>Rp '+p.price.toLocaleString('id-ID')+'</td>'
        +'<td style="color:var(--text-muted)">Rp '+perLabel.toLocaleString('id-ID')</td>'
        +'<td><span class="badge '+(p.is_active?'badge-success':'badge-danger')+'">'+(p.is_active?'Active':'Inactive')+'</span></td>'
        +'<td><div style="display:flex;gap:0.4rem;">'
        +'<button class="btn btn-secondary btn-sm" onclick="openEditPackageModal(\''+p.id+'\')">Edit</button>'
        +'<button class="btn btn-danger btn-sm" onclick="togglePackage(\''+p.id+'\','+p.is_active+')">'+(p.is_active?'Disable':'Enable')+'</button>'
        +'</div></td>'
        +'</tr>';
    }).join('');
  }catch(e){}
}

function openPackageModal(pkg){
  openModal('<div class="modal-title">'+(pkg?'Edit':'Add')+' Package</div>'
    +'<div class="grid-2">'
    +'<div class="field"><label>Name</label><input type="text" id="pkgName" value="'+(pkg?pkg.name:'')+'" placeholder="e.g. Starter 100"/></div>'
    +'<div class="field"><label>Credits</label><input type="number" id="pkgCredits" value="'+(pkg?pkg.credits:100)+'"/></div>'
    +'<div class="field"><label>Bonus Credits</label><input type="number" id="pkgBonus" value="'+(pkg?pkg.bonus:0)+'"/></div>'
    +'<div class="field"><label>Price (IDR)</label><input type="number" id="pkgPrice" value="'+(pkg?pkg.price:45000)+'"/></div>'
    +'</div>'
    +'<button class="btn btn-primary btn-full" onclick="savePackage('+(pkg?'\''+pkg.id+'\'':'')+')">Save</button>');
}

function openEditPackageModal(id){openPackageModal(allPackages.find(function(p){return p.id===id;}));}

async function savePackage(id){
  var body={name:document.getElementById('pkgName').value,credits:parseInt(document.getElementById('pkgCredits').value),bonus:parseInt(document.getElementById('pkgBonus').value)||0,price:parseInt(document.getElementById('pkgPrice').value),is_active:true};
  if(id)await sbFetch('/rest/v1/credit_packages?id=eq.'+id,{method:'PATCH',headers:{'Prefer':'return=minimal'},body:JSON.stringify(body)});
  else await sbFetch('/rest/v1/credit_packages',{method:'POST',headers:{'Prefer':'return=minimal'},body:JSON.stringify(body)});
  showToast('Package saved!','success');closeModal();allPackages=[];loadPackages();
}

async function togglePackage(id, active){
  await sbFetch('/rest/v1/credit_packages?id=eq.'+id,{method:'PATCH',headers:{'Prefer':'return=minimal'},body:JSON.stringify({is_active:!active})});
  showToast('Package updated','success');allPackages=[];loadPackages();
}

// ── ADMIN GENERATE ──
async function loadBrandsForSelect(){
  if(allUsers.length===0)await loadUsers();
  document.getElementById('adminBrandSelect').innerHTML='<option value="">— Select Brand —</option>'+allUsers.map(function(u){return '<option value="'+u.id+'|'+u.brand_prefix+'">'+u.brand_prefix+' — '+u.brand_name+'</option>';}).join('');
}

function encodeForUrl(code){return btoa(code).replace(/\\+/g,'-').replace(/\\//g,'_').replace(/=/g,'');}

async function adminGenerate(){
  var brandVal=document.getElementById('adminBrandSelect').value;
  var product=document.getElementById('adminProduct').value.trim();
  var mfr=document.getElementById('adminManufacturer').value.trim();
  var qty=parseInt(document.getElementById('adminQty').value)||100;
  if(!brandVal||!product||!mfr){showToast('Brand, product, and manufacturer required','error');return;}
  var parts=brandVal.split('|');
  var ownerId=parts[0], brandPrefix=parts[1];
  var origin=document.getElementById('adminOrigin').value.trim();
  var mfDate=document.getElementById('adminMfDate').value||null;
  var expDate=document.getElementById('adminExpDate').value||null;
  var serialPrefix=document.getElementById('adminSerial').value;
  var usedCodes=new Set();
  // Check existing codes for this brand
  var existR=await sbFetch('/rest/v1/nfc_labels?select=code&brand_prefix=eq.'+brandPrefix);
  var existData=await existR.json()||[];
  existData.forEach(function(l){usedCodes.add(l.code);});
  var labels=[];
  var chars='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  for(var i=0;i<qty;i++){
    var code;
    do{var r='';for(var j=0;j<8;j++){if(j===4)r+='-';r+=chars[Math.floor(Math.random()*chars.length)];}code=brandPrefix+'-'+r;}while(usedCodes.has(code));
    usedCodes.add(code);
    var pad=String(i+1).padStart(6,'0');
    labels.push({code:code,serial_number:(serialPrefix||'')+pad,product_name:product,manufacturer:mfr,origin_country:origin||null,manufactured_at:mfDate||undefined,expires_at:expDate||undefined,brand_prefix:brandPrefix,owner_id:ownerId,scan_count:0,active:true});
  }
  var saved=0,errors=0;
  var resultsEl=document.getElementById('adminGenResults');
  resultsEl.innerHTML='<div class="progress"><div class="progress-fill" id="agFill"></div></div><div id="agStatus" style="margin-top:0.5rem;color:var(--text-muted);">Saving...</div>';
  for(var k=0;k<labels.length;k++){
    var res=await sbFetch('/rest/v1/nfc_labels',{method:'POST',headers:{'Prefer':'return=minimal'},body:JSON.stringify(labels[k])});
    if(res.ok||res.status===201)saved++;else errors++;
    document.getElementById('agFill').style.width=((k+1)/labels.length*100)+'%';
  }
  var baseUrl='https://tagr.irfanvegaibara.workers.dev';
  var csvRows=[['Code','Serial','Product','URL']].concat(labels.slice(0,saved).map(function(l){return[l.code,l.serial_number,l.product_name,baseUrl+'/verify?t='+encodeForUrl(l.code)];}));
  var csv=csvRows.map(function(r){return r.map(function(v){return '"'+v+'"';}).join(',');}).join('\\n');
  var blob=new Blob([csv],{type:'text/csv'});
  var url=URL.createObjectURL(blob);
  resultsEl.innerHTML='<div class="alert alert-success show">✅ '+saved+' labels saved'+(errors>0?', '+errors+' errors':'')+'. <a href="'+url+'" download="labels-'+brandPrefix+'.csv" style="color:var(--accent);">Download CSV</a></div>';
  if(errors===0)showToast(saved+' labels generated!','success');
  else showToast(saved+' saved, '+errors+' errors','warning');
  allLabels=[];
}

// ── OVERVIEW ──
async function loadOverview(){
  try{
    var [ur,lr,or,pr]=await Promise.all([
      sbFetch('/rest/v1/profiles?select=id&limit=1000'),
      sbFetch('/rest/v1/nfc_labels?select=id,scan_count&limit=1000'),
      sbFetch('/rest/v1/orders?select=id&limit=1000'),
      sbFetch('/rest/v1/payments?select=amount&status=eq.success&limit=1000'),
    ]);
    var u=await ur.json()||[],l=await lr.json()||[],o=await or.json()||[],p=await pr.json()||[];
    document.getElementById('ovUsers').textContent=u.length;
    document.getElementById('ovLabels').textContent=l.length.toLocaleString();
    document.getElementById('ovOrders').textContent=o.length;
    document.getElementById('ovRevenue').textContent='Rp '+(p.reduce(function(s,x){return s+(x.amount||0);},0)/1000000).toFixed(1)+'M';
    document.getElementById('ovScans').textContent=l.reduce(function(s,x){return s+(x.scan_count||0);},0).toLocaleString();
    // Recent users
    var rur=await sbFetch('/rest/v1/profiles?select=*&order=created_at.desc&limit=5');
    var ru=await rur.json()||[];
    document.getElementById('recentUsers').innerHTML=ru.map(function(u){
      return '<div class="activity-item" style="display:flex;align-items:center;gap:1rem;padding:0.6rem 0;border-bottom:1px solid var(--border);">'
        +'<div style="width:36px;height:36px;border-radius:8px;background:var(--accent-dim);display:flex;align-items:center;justify-content:center;">🏷️</div>'
        +'<div style="flex:1;"><div style="font-size:0.88rem;font-weight:500">'+u.brand_name+'</div><div style="font-size:0.76rem;color:var(--text-muted)">'+u.email+'</div></div>'
        +'<span class="brand-tag">'+u.brand_prefix+'</span>'
        +'</div>';
    }).join('');
  }catch(e){}
}

async function init(){
  await initSupabase();
  _accessToken=getToken();_userId=getUserId();
  if(!_accessToken||!_userId){window.location.href='/login';return;}
  await loadProfile();
  if(!_userProfile||_userProfile.role!=='admin'){showToast('Access denied','error');setTimeout(function(){window.location.href='/dashboard';},2000);return;}
  document.getElementById('adminEmail').textContent=_userProfile.email||'';
  await loadOverview();
  applyLang(currentLang);
}
init();
</script>
</body></html>`;
}
