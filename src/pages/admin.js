// TAGR Admin Panel

export function getAdminPage() {
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
:root{--bg:#050A0E;--surface:#0C1419;--surface2:#121D24;--surface3:#172028;--border:rgba(0,210,180,0.12);--accent:#00D2B4;--accent2:#00F0D0;--accent-dim:rgba(0,210,180,0.08);--text:#E8F4F2;--text-muted:#7A9EA8;--text-dim:#3D6070;--danger:#FF4B6E;--warning:#F5A623;--success:#00D2B4;}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
body{font-family:"DM Sans",sans-serif;background:var(--bg);color:var(--text);min-height:100vh;display:flex;flex-direction:column;}
/* NAV */
nav{display:flex;align-items:center;justify-content:space-between;padding:0 2rem;height:64px;background:rgba(5,10,14,0.95);border-bottom:1px solid var(--border);position:sticky;top:0;z-index:100;}
.logo{font-family:"Syne",sans-serif;font-weight:800;font-size:1.4rem;letter-spacing:0.12em;color:var(--accent);text-decoration:none;}
.logo span{font-size:0.7rem;background:rgba(0,210,180,0.12);border:1px solid rgba(0,210,180,0.25);color:var(--accent);padding:0.15rem 0.5rem;border-radius:4px;margin-left:0.5rem;letter-spacing:0.08em;vertical-align:middle;}
.nav-right{display:flex;align-items:center;gap:1rem;}
.user-badge{font-size:0.82rem;color:var(--text-muted);display:flex;align-items:center;gap:0.4rem;}
.btn-logout{background:transparent;border:1px solid var(--border);color:var(--text-muted);padding:0.3rem 0.8rem;border-radius:4px;font-size:0.82rem;cursor:pointer;transition:all 0.2s;font-family:"DM Sans",sans-serif;}
.btn-logout:hover{border-color:var(--danger);color:var(--danger);}
/* LAYOUT */
main{flex:1;padding:2rem;max-width:1200px;margin:0 auto;width:100%;}
/* LOGIN */
#loginScreen{display:flex;align-items:center;justify-content:center;min-height:calc(100vh - 64px);}
.login-card{background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:2.5rem;width:100%;max-width:400px;position:relative;overflow:hidden;}
.login-card::before{content:"";position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--accent),transparent);}
.login-title{font-family:"Syne",sans-serif;font-size:1.5rem;font-weight:800;margin-bottom:0.4rem;}
.login-sub{color:var(--text-muted);font-size:0.88rem;margin-bottom:2rem;}
/* FORM ELEMENTS */
.field{margin-bottom:1.2rem;}
.field label{display:block;font-size:0.75rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-muted);margin-bottom:0.5rem;font-weight:500;}
.field input,.field select{width:100%;background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:0.75rem 1rem;font-family:"DM Sans",sans-serif;font-size:0.92rem;color:var(--text);transition:border-color 0.2s,box-shadow 0.2s;outline:none;}
.field input:focus,.field select:focus{border-color:rgba(0,210,180,0.4);box-shadow:0 0 0 3px rgba(0,210,180,0.06);}
.field input::placeholder{color:var(--text-dim);}
.field select option{background:var(--surface2);}
/* BUTTONS */
.btn-primary{width:100%;background:var(--accent);color:#050A0E;border:none;border-radius:8px;padding:0.85rem;font-family:"Syne",sans-serif;font-size:0.95rem;font-weight:700;letter-spacing:0.06em;cursor:pointer;transition:background 0.2s,transform 0.15s,box-shadow 0.2s;display:flex;align-items:center;justify-content:center;gap:0.5rem;box-shadow:0 0 20px rgba(0,210,180,0.2);}
.btn-primary:hover:not(:disabled){background:var(--accent2);transform:translateY(-1px);box-shadow:0 0 32px rgba(0,210,180,0.35);}
.btn-primary:disabled{opacity:0.5;cursor:not-allowed;transform:none;}
.btn-secondary{background:var(--surface2);color:var(--text);border:1px solid var(--border);border-radius:8px;padding:0.7rem 1.2rem;font-family:"DM Sans",sans-serif;font-size:0.88rem;cursor:pointer;transition:all 0.2s;display:inline-flex;align-items:center;gap:0.4rem;}
.btn-secondary:hover{border-color:var(--accent);color:var(--accent);}
.btn-danger{background:transparent;color:var(--danger);border:1px solid rgba(255,75,110,0.3);border-radius:8px;padding:0.7rem 1.2rem;font-family:"DM Sans",sans-serif;font-size:0.88rem;cursor:pointer;transition:all 0.2s;}
.btn-danger:hover{background:rgba(255,75,110,0.08);}
/* ERROR */
.error-msg{background:rgba(255,75,110,0.08);border:1px solid rgba(255,75,110,0.25);border-radius:8px;padding:0.75rem 1rem;font-size:0.85rem;color:var(--danger);margin-bottom:1rem;display:none;}
.error-msg.show{display:block;}
/* ADMIN PANEL */
#adminPanel{display:none;}
.page-title{font-family:"Syne",sans-serif;font-size:1.8rem;font-weight:800;margin-bottom:0.4rem;}
.page-sub{color:var(--text-muted);font-size:0.92rem;margin-bottom:2rem;}
/* CARD */
.card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:1.8rem;margin-bottom:1.5rem;}
.card-title{font-family:"Syne",sans-serif;font-size:1rem;font-weight:700;margin-bottom:1.2rem;display:flex;align-items:center;gap:0.5rem;}
.card-title span{font-size:1.2rem;}
/* GRID */
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:1rem;}
.grid-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:1rem;}
/* GENERATE OPTIONS */
.gen-row{display:grid;grid-template-columns:1fr 1fr 1fr;gap:1rem;align-items:end;}
.toggle-group{display:flex;gap:0.5rem;}
.toggle-btn{flex:1;padding:0.6rem;border-radius:6px;border:1px solid var(--border);background:var(--bg);color:var(--text-muted);font-family:"DM Sans",sans-serif;font-size:0.85rem;cursor:pointer;transition:all 0.2s;text-align:center;}
.toggle-btn.active{background:var(--accent-dim);border-color:var(--accent);color:var(--accent);}
/* RESULTS TABLE */
.results-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem;flex-wrap:wrap;gap:0.8rem;}
.results-title{font-family:"Syne",sans-serif;font-size:1rem;font-weight:700;}
.results-actions{display:flex;gap:0.5rem;}
.badge{display:inline-flex;align-items:center;gap:0.3rem;background:var(--accent-dim);border:1px solid rgba(0,210,180,0.2);border-radius:100px;padding:0.2rem 0.7rem;font-size:0.75rem;color:var(--accent);}
.table-wrap{overflow-x:auto;border-radius:8px;border:1px solid var(--border);}
table{width:100%;border-collapse:collapse;font-size:0.85rem;}
thead{background:var(--surface2);}
th{padding:0.75rem 1rem;text-align:left;font-size:0.7rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-muted);font-weight:500;white-space:nowrap;}
td{padding:0.75rem 1rem;border-top:1px solid var(--border);vertical-align:middle;}
tr:hover td{background:rgba(0,210,180,0.02);}
.code-cell{font-family:"Syne",monospace;font-size:0.8rem;letter-spacing:0.08em;color:var(--accent);}
.url-cell{font-size:0.78rem;color:var(--text-muted);max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.copy-btn{background:none;border:1px solid var(--border);border-radius:4px;color:var(--text-muted);padding:0.2rem 0.5rem;font-size:0.72rem;cursor:pointer;transition:all 0.15s;white-space:nowrap;}
.copy-btn:hover{border-color:var(--accent);color:var(--accent);}
.copy-btn.copied{border-color:var(--success);color:var(--success);}
/* STATUS */
.status-dot{width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:0.4rem;}
.dot-pending{background:var(--warning);}
.dot-saved{background:var(--success);}
.dot-error{background:var(--danger);}
/* PROGRESS */
.progress-bar{height:4px;background:var(--border);border-radius:2px;overflow:hidden;margin-top:1rem;}
.progress-fill{height:100%;background:var(--accent);border-radius:2px;transition:width 0.3s ease;width:0%;}
/* SPINNER */
.spinner{width:16px;height:16px;border:2px solid rgba(5,10,14,0.3);border-top-color:#050A0E;border-radius:50%;animation:spin 0.8s linear infinite;}
@keyframes spin{to{transform:rotate(360deg);}}
/* TOAST */
.toast{position:fixed;bottom:2rem;right:2rem;background:var(--surface2);border:1px solid var(--border);border-radius:10px;padding:0.9rem 1.2rem;font-size:0.88rem;box-shadow:0 8px 32px rgba(0,0,0,0.4);z-index:9999;transform:translateY(100px);opacity:0;transition:all 0.3s cubic-bezier(0.22,1,0.36,1);display:flex;align-items:center;gap:0.6rem;}
.toast.show{transform:translateY(0);opacity:1;}
.toast.success{border-color:rgba(0,210,180,0.3);}
.toast.error{border-color:rgba(255,75,110,0.3);}
/* RESPONSIVE */
@media(max-width:640px){.grid-2,.grid-3,.gen-row{grid-template-columns:1fr;}.results-actions{flex-direction:column;}main{padding:1rem;}}
</style>
</head>
<body>
<nav>
  <a href="/" class="logo">TAGR <span>ADMIN</span></a>
  <div class="nav-right" id="navRight" style="display:none">
    <div class="user-badge">&#x1F464; <span id="userEmail"></span></div>
    <button class="btn-logout" onclick="logout()">Logout</button>
  </div>
</nav>

<!-- LOGIN -->
<div id="loginScreen">
  <div class="login-card">
    <div class="login-title">Admin Login</div>
    <div class="login-sub">Masuk untuk mengelola label TAGR</div>
    <div class="error-msg" id="loginError"></div>
    <div class="field">
      <label>Email</label>
      <input type="email" id="loginEmail" placeholder="admin@tagr.id" />
    </div>
    <div class="field">
      <label>Password</label>
      <input type="password" id="loginPassword" placeholder="••••••••" onkeydown="if(event.key==='Enter')doLogin()" />
    </div>
    <button class="btn-primary" id="loginBtn" onclick="doLogin()">
      <span>Masuk</span>
    </button>
  </div>
</div>

<!-- ADMIN PANEL -->
<main>
<div id="adminPanel">
  <div class="page-title">&#x1F3F7;&#xFE0F; Label Generator</div>
  <div class="page-sub">Generate batch label NFC dan URL verifikasi TAGR</div>

  <!-- PRODUCT INFO -->
  <div class="card">
    <div class="card-title"><span>&#x1F4E6;</span> Informasi Produk</div>
    <div class="grid-2">
      <div class="field">
        <label>Nama Produk *</label>
        <input type="text" id="productName" placeholder="Contoh: Sepatu Sneaker Limited" />
      </div>
      <div class="field">
        <label>Manufacturer *</label>
        <input type="text" id="manufacturer" placeholder="Contoh: PT Brand Indonesia" />
      </div>
      <div class="field">
        <label>Country of Origin</label>
        <input type="text" id="originCountry" placeholder="Contoh: Indonesia" />
      </div>
      <div class="field">
        <label>Tanggal Produksi</label>
        <input type="date" id="manufacturedAt" />
      </div>
      <div class="field">
        <label>Tanggal Kedaluwarsa</label>
        <input type="date" id="expiresAt" />
      </div>
    </div>
  </div>

  <!-- GENERATE OPTIONS -->
  <div class="card">
    <div class="card-title"><span>&#x2699;&#xFE0F;</span> Opsi Generate</div>
    <div class="gen-row">
      <div class="field">
        <label>Jumlah Label</label>
        <input type="number" id="totalLabels" value="10" min="1" max="500" placeholder="10" />
      </div>
      <div class="field">
        <label>Prefix Serial Number</label>
        <input type="text" id="serialPrefix" placeholder="Contoh: SN-2026-" />
      </div>
      <div class="field">
        <label>Urutan Serial Number</label>
        <div class="toggle-group">
          <button class="toggle-btn active" id="btnUrut" onclick="setSerial('urut')">&#x1F522; Urut</button>
          <button class="toggle-btn" id="btnAcak" onclick="setSerial('acak')">&#x1F3B2; Acak</button>
        </div>
      </div>
    </div>
    <div class="gen-row" style="margin-top:0">
      <div class="field">
        <label>Label Code</label>
        <div class="toggle-group">
          <button class="toggle-btn active" id="btnCodeAuto" onclick="setCodeMode('auto')">&#x1F504; Auto</button>
          <button class="toggle-btn" id="btnCodeManual" onclick="setCodeMode('manual')">&#x270F;&#xFE0F; Manual</button>
        </div>
      </div>
      <div class="field" id="codePrefixField" style="display:none">
        <label>Prefix Label Code</label>
        <input type="text" id="codePrefix" placeholder="Contoh: ABCD-2026-" />
      </div>
      <div class="field">
        <label>Base URL</label>
        <input type="text" id="baseUrl" value="https://tagr.irfanvegaibara.workers.dev" />
      </div>
    </div>
    <button class="btn-primary" id="generateBtn" onclick="generateLabels()" style="margin-top:0.5rem">
      <span>&#x26A1; Generate Labels</span>
    </button>
  </div>

  <!-- RESULTS -->
  <div class="card" id="resultsCard" style="display:none">
    <div class="results-header">
      <div>
        <div class="results-title">Hasil Generate</div>
        <div id="resultsBadge" style="margin-top:0.3rem"></div>
      </div>
      <div class="results-actions">
        <button class="btn-secondary" onclick="saveToSupabase()" id="saveBtn">
          &#x1F4BE; Simpan ke Database
        </button>
        <button class="btn-secondary" onclick="exportCSV()">
          &#x1F4C4; Export CSV
        </button>
        <button class="btn-danger" onclick="clearResults()">
          &#x1F5D1; Hapus
        </button>
      </div>
    </div>
    <div class="progress-bar" id="progressBar" style="display:none">
      <div class="progress-fill" id="progressFill"></div>
    </div>
    <div class="table-wrap" style="margin-top:1rem">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Label Code</th>
            <th>Serial Number</th>
            <th>Encoded URL</th>
            <th>Status</th>
            <th>Salin</th>
          </tr>
        </thead>
        <tbody id="resultsBody"></tbody>
      </table>
    </div>
  </div>
</div>
</main>

<div class="toast" id="toast"></div>

<script>
var SUPABASE_URL = '';
var SUPABASE_KEY = '';
var serialMode = 'urut';
var codeMode = 'auto';
var generatedLabels = [];
var currentUser = null;

// ── FETCH SUPABASE CONFIG ──
async function loadConfig() {
  try {
    var res = await fetch('/api/config');
    var data = await res.json();
    SUPABASE_URL = data.supabase_url || '';
    SUPABASE_KEY = data.supabase_key || '';
  } catch(e) {
    console.error('Config error', e);
  }
}

// ── LOGIN ──
async function doLogin() {
  var email = document.getElementById('loginEmail').value.trim();
  var pass = document.getElementById('loginPassword').value;
  var errEl = document.getElementById('loginError');
  var btn = document.getElementById('loginBtn');
  errEl.classList.remove('show');
  if (!email || !pass) { showError(errEl, 'Email dan password wajib diisi.'); return; }
  btn.disabled = true;
  btn.innerHTML = '<div class="spinner"></div>';
  try {
    var res = await fetch(SUPABASE_URL + '/auth/v1/token?grant_type=password', {
      method: 'POST',
      headers: { 'apikey': SUPABASE_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: pass })
    });
    var data = await res.json();
    if (data.access_token) {
      currentUser = data.user;
      localStorage.setItem('tagr_admin_token', data.access_token);
      localStorage.setItem('tagr_admin_email', email);
      showPanel(email);
    } else {
      showError(errEl, data.error_description || data.msg || 'Login gagal. Periksa email dan password.');
    }
  } catch(e) {
    showError(errEl, 'Koneksi gagal. Coba lagi.');
  }
  btn.disabled = false;
  btn.innerHTML = '<span>Masuk</span>';
}

function showError(el, msg) { el.textContent = msg; el.classList.add('show'); }

function showPanel(email) {
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('adminPanel').style.display = 'block';
  document.getElementById('navRight').style.display = 'flex';
  document.getElementById('userEmail').textContent = email;
}

function logout() {
  localStorage.removeItem('tagr_admin_token');
  localStorage.removeItem('tagr_admin_email');
  location.reload();
}

// ── TOGGLE ──
function setSerial(mode) {
  serialMode = mode;
  document.getElementById('btnUrut').classList.toggle('active', mode === 'urut');
  document.getElementById('btnAcak').classList.toggle('active', mode === 'acak');
}

function setCodeMode(mode) {
  codeMode = mode;
  document.getElementById('btnCodeAuto').classList.toggle('active', mode === 'auto');
  document.getElementById('btnCodeManual').classList.toggle('active', mode === 'manual');
  document.getElementById('codePrefixField').style.display = mode === 'manual' ? 'block' : 'none';
}

// ── GENERATE ──
function randCode() {
  var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  var r = '';
  for (var i = 0; i < 12; i++) {
    if (i === 4 || i === 8) r += '-';
    r += chars[Math.floor(Math.random() * chars.length)];
  }
  return r;
}

function randSerial(prefix, index, total) {
  if (serialMode === 'urut') {
    var pad = String(index + 1).padStart(String(total).length < 4 ? 5 : String(total).length + 1, '0');
    return (prefix || '') + pad;
  } else {
    var n = Math.floor(10000 + Math.random() * 89999);
    return (prefix || '') + n;
  }
}

function encodeForUrl(code) {
  return btoa(code).replace(/\\+/g, '-').replace(/\\//g, '_').replace(/=/g, '');
}

function generateLabels() {
  var productName = document.getElementById('productName').value.trim();
  var manufacturer = document.getElementById('manufacturer').value.trim();
  var total = parseInt(document.getElementById('totalLabels').value) || 10;
  var serialPrefix = document.getElementById('serialPrefix').value;
  var codePrefix = document.getElementById('codePrefix').value;
  var baseUrl = document.getElementById('baseUrl').value.trim().replace(/\\/+$/, '');
  var originCountry = document.getElementById('originCountry').value.trim();
  var manufacturedAt = document.getElementById('manufacturedAt').value;
  var expiresAt = document.getElementById('expiresAt').value;

  if (!productName || !manufacturer) {
    showToast('Nama produk dan manufacturer wajib diisi!', 'error');
    return;
  }
  if (total < 1 || total > 500) {
    showToast('Jumlah label harus antara 1 - 500', 'error');
    return;
  }

  generatedLabels = [];
  var usedCodes = new Set();

  for (var i = 0; i < total; i++) {
    var code;
    if (codeMode === 'auto') {
      do { code = randCode(); } while (usedCodes.has(code));
    } else {
      var pad = String(i + 1).padStart(5, '0');
      code = (codePrefix || 'TAGR-') + pad;
    }
    usedCodes.add(code);
    var serial = randSerial(serialPrefix, i, total);
    var token = encodeForUrl(code);
    var url = baseUrl + '/verify?t=' + token;
    generatedLabels.push({
      index: i + 1,
      code: code,
      serial_number: serial,
      product_name: productName,
      manufacturer: manufacturer,
      origin_country: originCountry || null,
      manufactured_at: manufacturedAt || null,
      expires_at: expiresAt || null,
      url: url,
      status: 'pending'
    });
  }

  renderResults();
  document.getElementById('resultsCard').style.display = 'block';
  document.getElementById('resultsCard').scrollIntoView({ behavior: 'smooth' });
  showToast(total + ' label berhasil digenerate!', 'success');
}

function renderResults() {
  var tbody = document.getElementById('resultsBody');
  var saved = generatedLabels.filter(function(l){ return l.status === 'saved'; }).length;
  var pending = generatedLabels.filter(function(l){ return l.status === 'pending'; }).length;
  var errors = generatedLabels.filter(function(l){ return l.status === 'error'; }).length;

  document.getElementById('resultsBadge').innerHTML =
    '<span class="badge">&#x1F4CB; Total: ' + generatedLabels.length + '</span> ' +
    (saved > 0 ? '<span class="badge" style="color:#00D2B4">&#x2705; Tersimpan: ' + saved + '</span> ' : '') +
    (pending > 0 ? '<span class="badge" style="color:#F5A623">&#x23F3; Pending: ' + pending + '</span> ' : '') +
    (errors > 0 ? '<span class="badge" style="color:#FF4B6E">&#x274C; Error: ' + errors + '</span>' : '');

  tbody.innerHTML = generatedLabels.map(function(label) {
    var dotClass = label.status === 'saved' ? 'dot-saved' : label.status === 'error' ? 'dot-error' : 'dot-pending';
    var statusText = label.status === 'saved' ? 'Tersimpan' : label.status === 'error' ? 'Error' : 'Pending';
    return '<tr id="row-' + label.index + '">'
      + '<td style="color:var(--text-dim)">' + label.index + '</td>'
      + '<td><span class="code-cell">' + label.code + '</span></td>'
      + '<td><span class="code-cell" style="color:var(--text-muted)">' + label.serial_number + '</span></td>'
      + '<td class="url-cell" title="' + label.url + '">' + label.url + '</td>'
      + '<td><span class="status-dot ' + dotClass + '"></span>' + statusText + '</td>'
      + '<td><button class="copy-btn" id="copy-' + label.index + '" onclick="copyUrl(' + label.index + ')">Salin URL</button></td>'
      + '</tr>';
  }).join('');
}

function copyUrl(index) {
  var label = generatedLabels.find(function(l){ return l.index === index; });
  if (!label) return;
  navigator.clipboard.writeText(label.url).then(function() {
    var btn = document.getElementById('copy-' + index);
    btn.textContent = '&#x2713; Disalin';
    btn.classList.add('copied');
    setTimeout(function(){ btn.textContent = 'Salin URL'; btn.classList.remove('copied'); }, 2000);
  });
}

// ── SAVE TO SUPABASE ──
async function saveToSupabase() {
  var token = localStorage.getItem('tagr_admin_token');
  if (!token) { showToast('Sesi habis, silakan login ulang.', 'error'); return; }
  var pending = generatedLabels.filter(function(l){ return l.status !== 'saved'; });
  if (pending.length === 0) { showToast('Semua label sudah tersimpan.', 'success'); return; }

  var btn = document.getElementById('saveBtn');
  btn.disabled = true;
  btn.innerHTML = '<div class="spinner"></div> Menyimpan...';

  var progressBar = document.getElementById('progressBar');
  var progressFill = document.getElementById('progressFill');
  progressBar.style.display = 'block';

  var saved = 0;
  var errors = 0;

  for (var i = 0; i < pending.length; i++) {
    var label = pending[i];
    try {
      var body = {
        code: label.code,
        product_name: label.product_name,
        manufacturer: label.manufacturer,
        serial_number: label.serial_number,
        origin_country: label.origin_country,
        manufactured_at: label.manufactured_at || undefined,
        expires_at: label.expires_at || undefined,
        scan_count: 0,
        active: true
      };
      var res = await fetch(SUPABASE_URL + '/rest/v1/nfc_labels', {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(body)
      });
      if (res.ok || res.status === 201) {
        label.status = 'saved';
        saved++;
      } else {
        var err = await res.json();
        label.status = 'error';
        label.error = err.message || 'Error';
        errors++;
      }
    } catch(e) {
      label.status = 'error';
      errors++;
    }
    progressFill.style.width = ((i + 1) / pending.length * 100) + '%';
    renderResults();
  }

  progressBar.style.display = 'none';
  btn.disabled = false;
  btn.innerHTML = '&#x1F4BE; Simpan ke Database';

  if (errors === 0) {
    showToast(saved + ' label berhasil disimpan ke database!', 'success');
  } else {
    showToast(saved + ' tersimpan, ' + errors + ' gagal.', 'error');
  }
}

// ── EXPORT CSV ──
function exportCSV() {
  if (generatedLabels.length === 0) { showToast('Tidak ada data untuk diexport.', 'error'); return; }
  var headers = ['No','Label Code','Serial Number','Product','Manufacturer','Country of Origin','Manufactured','Expires','Encoded URL'];
  var rows = generatedLabels.map(function(l) {
    return [
      l.index, l.code, l.serial_number, l.product_name, l.manufacturer,
      l.origin_country || '', l.manufactured_at || '', l.expires_at || '', l.url
    ].map(function(v){ return '"' + String(v).replace(/"/g, '""') + '"'; }).join(',');
  });
  var csv = [headers.join(',')].concat(rows).join('\\n');
  var blob = new Blob([csv], { type: 'text/csv' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = 'tagr-labels-' + new Date().toISOString().slice(0,10) + '.csv';
  a.click();
  URL.revokeObjectURL(url);
  showToast('CSV berhasil diexport!', 'success');
}

function clearResults() {
  generatedLabels = [];
  document.getElementById('resultsCard').style.display = 'none';
}

// ── TOAST ──
function showToast(msg, type) {
  var el = document.getElementById('toast');
  el.textContent = (type === 'success' ? '✅ ' : '❌ ') + msg;
  el.className = 'toast ' + type + ' show';
  setTimeout(function(){ el.classList.remove('show'); }, 3500);
}

// ── INIT ──
loadConfig().then(function() {
  var savedToken = localStorage.getItem('tagr_admin_token');
  var savedEmail = localStorage.getItem('tagr_admin_email');
  if (savedToken && savedEmail) {
    showPanel(savedEmail);
  }
});
</script>
</body>
</html>`;
}
