// TAGR Verify Page

export function getVerifyPage(initialCode = '') {
  const safeCode = initialCode.replace(/[<>"'&]/g, '');
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>TAGR — Verify Label Authenticity</title>
  <meta name="description" content="Verify the authenticity of your TAGR NFC-protected product." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap" rel="stylesheet" />
  <style>
    :root {
      --bg: #050A0E;
      --surface: #0C1419;
      --surface2: #121D24;
      --border: rgba(0,210,180,0.12);
      --accent: #00D2B4;
      --accent2: #00F0D0;
      --accent-dim: rgba(0,210,180,0.08);
      --text: #E8F4F2;
      --text-muted: #7A9EA8;
      --text-dim: #3D6070;
      --success: #00D2B4;
      --danger: #FF4B6E;
      --danger-dim: rgba(255,75,110,0.08);
      --warning: #F5A623;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      font-family: 'DM Sans', sans-serif;
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      overflow-x: hidden;
    }
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 0;
      opacity: 0.5;
    }

    /* NAV */
    nav {
      position: relative;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 5vw;
      height: 68px;
      background: rgba(5,10,14,0.9);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border);
    }
    .logo {
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: 1.5rem;
      letter-spacing: 0.12em;
      color: var(--accent);
      text-decoration: none;
    }
    .logo::after { content: '®'; font-size: 0.45em; vertical-align: super; color: var(--text-muted); margin-left: 2px; }
    .nav-right { display: flex; align-items: center; gap: 1.5rem; }
    .nav-link { color: var(--text-muted); text-decoration: none; font-size: 0.88rem; transition: color 0.2s; }
    .nav-link:hover { color: var(--text); }

    /* Language Selector */
    .lang-selector { position: relative; }
    .lang-btn {
      background: var(--surface2);
      border: 1px solid var(--border);
      color: var(--text-muted);
      padding: 0.35rem 0.8rem;
      border-radius: 4px;
      font-family: 'DM Sans', sans-serif;
      font-size: 0.82rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.4rem;
      transition: border-color 0.2s;
    }
    .lang-btn:hover { border-color: var(--accent); color: var(--text); }
    .lang-dropdown {
      display: none;
      position: absolute;
      top: calc(100% + 8px);
      right: 0;
      background: var(--surface2);
      border: 1px solid var(--border);
      border-radius: 6px;
      overflow: hidden;
      min-width: 150px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.5);
      z-index: 200;
    }
    .lang-dropdown.open { display: block; }
    .lang-option {
      padding: 0.6rem 1rem;
      font-size: 0.85rem;
      color: var(--text-muted);
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: background 0.15s, color 0.15s;
    }
    .lang-option:hover { background: var(--accent-dim); color: var(--text); }
    .lang-option.active { color: var(--accent); }

    /* MAIN LAYOUT */
    main {
      flex: 1;
      position: relative;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 60px 5vw;
    }
    .verify-container {
      width: 100%;
      max-width: 560px;
    }

    /* GRID BACKGROUND */
    .bg-grid {
      position: fixed;
      inset: 0;
      z-index: 1;
      background-image:
        linear-gradient(rgba(0,210,180,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,210,180,0.03) 1px, transparent 1px);
      background-size: 60px 60px;
      mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%);
    }

    /* HEADER */
    .verify-header {
      text-align: center;
      margin-bottom: 2.5rem;
      animation: slideDown 0.7s cubic-bezier(0.22,1,0.36,1) both;
    }
    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: none; }
    }
    .verify-icon {
      width: 80px; height: 80px;
      border-radius: 20px;
      background: var(--accent-dim);
      border: 1px solid rgba(0,210,180,0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1.5rem;
      font-size: 2rem;
      position: relative;
    }
    .verify-icon::before {
      content: '';
      position: absolute;
      inset: -4px;
      border-radius: 24px;
      border: 1px solid rgba(0,210,180,0.1);
    }
    .verify-header h1 {
      font-family: 'Syne', sans-serif;
      font-size: 2rem;
      font-weight: 800;
      letter-spacing: -0.02em;
      margin-bottom: 0.5rem;
    }
    .verify-header p {
      color: var(--text-muted);
      font-size: 0.95rem;
      font-weight: 300;
    }

    /* CARD */
    .verify-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 2rem;
      animation: cardReveal 0.7s cubic-bezier(0.22,1,0.36,1) 0.15s both;
      position: relative;
      overflow: hidden;
    }
    @keyframes cardReveal {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: none; }
    }
    .verify-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, var(--accent), transparent);
      opacity: 0.4;
    }

    /* INPUT GROUP */
    .input-group {
      margin-bottom: 1.2rem;
    }
    .input-label {
      display: block;
      font-size: 0.8rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--text-muted);
      margin-bottom: 0.6rem;
      font-weight: 500;
    }
    .input-wrap {
      position: relative;
      display: flex;
      align-items: center;
    }
    .code-input {
      width: 100%;
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 0.9rem 3rem 0.9rem 1.1rem;
      font-family: 'Syne', monospace;
      font-size: 1.1rem;
      font-weight: 600;
      letter-spacing: 0.15em;
      color: var(--text);
      transition: border-color 0.2s, box-shadow 0.2s;
      text-transform: uppercase;
      outline: none;
    }
    .code-input::placeholder {
      color: var(--text-dim);
      font-weight: 400;
      letter-spacing: 0.05em;
    }
    .code-input:focus {
      border-color: rgba(0,210,180,0.4);
      box-shadow: 0 0 0 3px rgba(0,210,180,0.06);
    }
    .input-clear {
      position: absolute;
      right: 0.75rem;
      background: none;
      border: none;
      color: var(--text-dim);
      cursor: pointer;
      padding: 0.25rem;
      display: none;
      transition: color 0.2s;
    }
    .input-clear:hover { color: var(--text-muted); }
    .input-clear.visible { display: block; }

    /* SUBMIT BUTTON */
    .verify-btn {
      width: 100%;
      background: var(--accent);
      color: #050A0E;
      border: none;
      border-radius: 8px;
      padding: 1rem;
      font-family: 'Syne', sans-serif;
      font-size: 1rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      cursor: pointer;
      transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      box-shadow: 0 0 20px rgba(0,210,180,0.2);
    }
    .verify-btn:hover:not(:disabled) {
      background: var(--accent2);
      transform: translateY(-1px);
      box-shadow: 0 0 32px rgba(0,210,180,0.35);
    }
    .verify-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

    /* SPINNER */
    .spinner {
      width: 18px; height: 18px;
      border: 2px solid rgba(5,10,14,0.3);
      border-top-color: #050A0E;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* DIVIDER */
    .divider {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin: 1.5rem 0;
      color: var(--text-dim);
      font-size: 0.78rem;
      letter-spacing: 0.08em;
    }
    .divider::before, .divider::after {
      content: '';
      flex: 1;
      height: 1px;
      background: var(--border);
    }

    /* SCAN INSTRUCTION */
    .scan-hint {
      background: var(--surface2);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 1rem 1.2rem;
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .scan-hint-icon { font-size: 1.5rem; flex-shrink: 0; }
    .scan-hint-text { font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; }
    .scan-hint-text strong { color: var(--text); font-weight: 500; }

    /* ─── RESULT STATES ─── */
    #result { margin-top: 1.5rem; display: none; }
    #result.visible { display: block; }

    .result-authentic {
      border-radius: 12px;
      padding: 1.8rem;
      border: 1px solid rgba(0,210,180,0.3);
      background: rgba(0,210,180,0.04);
      animation: resultReveal 0.5s cubic-bezier(0.22,1,0.36,1) both;
    }
    .result-fake {
      border-radius: 12px;
      padding: 1.8rem;
      border: 1px solid rgba(255,75,110,0.3);
      background: rgba(255,75,110,0.04);
      animation: resultReveal 0.5s cubic-bezier(0.22,1,0.36,1) both;
    }
    .result-error {
      border-radius: 12px;
      padding: 1.8rem;
      border: 1px solid rgba(245,166,35,0.3);
      background: rgba(245,166,35,0.04);
      animation: resultReveal 0.5s cubic-bezier(0.22,1,0.36,1) both;
    }
    @keyframes resultReveal {
      from { opacity: 0; transform: scale(0.97) translateY(10px); }
      to { opacity: 1; transform: none; }
    }

    .result-top {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.2rem;
    }
    .result-badge {
      width: 48px; height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      flex-shrink: 0;
    }
    .badge-authentic { background: rgba(0,210,180,0.12); }
    .badge-fake { background: rgba(255,75,110,0.12); }
    .badge-error { background: rgba(245,166,35,0.12); }

    .result-title {
      font-family: 'Syne', sans-serif;
      font-size: 1.25rem;
      font-weight: 800;
    }
    .authentic-title { color: var(--accent); }
    .fake-title { color: var(--danger); }
    .error-title { color: var(--warning); }

    .result-subtitle {
      font-size: 0.85rem;
      color: var(--text-muted);
      margin-top: 0.2rem;
    }

    /* Product detail rows */
    .detail-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.75rem;
      margin-top: 1.2rem;
      padding-top: 1.2rem;
      border-top: 1px solid var(--border);
    }
    .detail-item {}
    .detail-key {
      font-size: 0.72rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--text-dim);
      margin-bottom: 0.2rem;
    }
    .detail-val {
      font-size: 0.9rem;
      color: var(--text);
      font-weight: 500;
    }

    .scan-count-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.3rem;
      background: rgba(0,210,180,0.08);
      border: 1px solid rgba(0,210,180,0.2);
      border-radius: 100px;
      padding: 0.2rem 0.7rem;
      font-size: 0.78rem;
      color: var(--accent);
      margin-top: 0.5rem;
    }

    /* Warning for high scan count */
    .scan-warning {
      display: flex;
      align-items: flex-start;
      gap: 0.6rem;
      margin-top: 1rem;
      padding: 0.8rem 1rem;
      background: rgba(245,166,35,0.06);
      border: 1px solid rgba(245,166,35,0.2);
      border-radius: 8px;
      font-size: 0.82rem;
      color: var(--warning);
      line-height: 1.5;
    }

    /* FOOTER */
    footer {
      position: relative;
      z-index: 2;
      border-top: 1px solid var(--border);
      padding: 1.5rem 5vw;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: var(--surface);
    }
    .footer-logo { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.1rem; letter-spacing: 0.1em; color: var(--accent); text-decoration: none; }
    .footer-copy { font-size: 0.78rem; color: var(--text-dim); }

    @media (max-width: 480px) {
      .detail-grid { grid-template-columns: 1fr; }
      footer { flex-direction: column; gap: 0.5rem; text-align: center; }
    }
  </style>
</head>
<body>
<div class="bg-grid"></div>

<nav>
  <a href="/" class="logo">TAGR</a>
  <div class="nav-right">
    <a href="/" class="nav-link" data-i18n="nav.home">← Home</a>
    <div class="lang-selector">
      <button class="lang-btn" onclick="toggleLang()" id="langBtn">
        <span id="currentFlag">🌐</span>
        <span id="currentLang">EN</span>
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
      </button>
      <div class="lang-dropdown" id="langDropdown">
        <div class="lang-option active" onclick="setLang('en')">🇺🇸 English</div>
        <div class="lang-option" onclick="setLang('id')">🇮🇩 Bahasa Indonesia</div>
        <div class="lang-option" onclick="setLang('zh')">🇨🇳 中文</div>
        <div class="lang-option" onclick="setLang('ar')">🇸🇦 العربية</div>
        <div class="lang-option" onclick="setLang('fr')">🇫🇷 Français</div>
      </div>
    </div>
  </div>
</nav>

<main>
  <div class="verify-container">
    <div class="verify-header">
      <div class="verify-icon">📡</div>
      <h1 data-i18n="v.title">Verify Authenticity</h1>
      <p data-i18n="v.sub">Enter the code from your TAGR NFC label to confirm it is genuine.</p>
    </div>

    <div class="verify-card">
      <div class="input-group">
        <label class="input-label" for="codeInput" data-i18n="v.inputLabel">Label Code</label>
        <div class="input-wrap">
          <input
            type="text"
            id="codeInput"
            class="code-input"
            placeholder="XXXX-XXXX-XXXX"
            maxlength="20"
            autocomplete="off"
            autocorrect="off"
            spellcheck="false"
            value="${safeCode}"
          />
          <button class="input-clear" id="clearBtn" onclick="clearInput()" title="Clear">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          </button>
        </div>
      </div>

      <button class="verify-btn" id="verifyBtn" onclick="doVerify()">
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <span data-i18n="v.btn">Verify Label</span>
      </button>

      <div class="divider" data-i18n="v.or">or scan via NFC</div>

      <div class="scan-hint">
        <span class="scan-hint-icon">📱</span>
        <div class="scan-hint-text">
          <strong data-i18n="v.nfcTitle">Use Your Phone</strong><br>
          <span data-i18n="v.nfcDesc">Tap any NFC-enabled smartphone directly to the label. Your browser will open this page automatically with the code pre-filled.</span>
        </div>
      </div>

      <!-- RESULT AREA -->
      <div id="result"></div>
    </div>
  </div>
</main>

<footer>
  <a href="/" class="footer-logo">TAGR</a>
  <span class="footer-copy" data-i18n="footer.copy">© 2025 TAGR. All rights reserved.</span>
</footer>

<script>
// ─── TRANSLATIONS ───
const i18n = {
  en: {
    "nav.home": "← Home",
    "v.title": "Verify Authenticity",
    "v.sub": "Enter the code from your TAGR NFC label to confirm it is genuine.",
    "v.inputLabel": "Label Code",
    "v.btn": "Verify Label",
    "v.or": "or scan via NFC",
    "v.nfcTitle": "Use Your Phone",
    "v.nfcDesc": "Tap any NFC-enabled smartphone directly to the label. Your browser will open this page automatically with the code pre-filled.",
    "v.authentic.title": "Authentic Product",
    "v.authentic.sub": "This TAGR label is registered and valid.",
    "v.fake.title": "Not Recognized",
    "v.fake.sub": "This code was not found in the TAGR database. This product may be counterfeit.",
    "v.error.title": "Verification Error",
    "v.error.sub": "Could not complete the verification. Please try again.",
    "v.detail.code": "Label Code",
    "v.detail.product": "Product",
    "v.detail.maker": "Manufacturer",
    "v.detail.issued": "Issued",
    "v.detail.scans": "Total Scans",
    "v.scanWarn": "⚠️ This label has been scanned many times. If you did not expect this, the product may have exchanged hands or been reused.",
    "footer.copy": "© 2025 TAGR. All rights reserved.",
  },
  id: {
    "nav.home": "← Beranda",
    "v.title": "Verifikasi Keaslian",
    "v.sub": "Masukkan kode dari label NFC TAGR Anda untuk memastikan keasliannya.",
    "v.inputLabel": "Kode Label",
    "v.btn": "Verifikasi Label",
    "v.or": "atau pindai via NFC",
    "v.nfcTitle": "Gunakan Ponsel Anda",
    "v.nfcDesc": "Ketuk ponsel NFC langsung ke label. Browser Anda akan membuka halaman ini secara otomatis dengan kode terisi.",
    "v.authentic.title": "Produk Asli",
    "v.authentic.sub": "Label TAGR ini terdaftar dan valid.",
    "v.fake.title": "Tidak Dikenali",
    "v.fake.sub": "Kode ini tidak ditemukan di database TAGR. Produk ini mungkin palsu.",
    "v.error.title": "Kesalahan Verifikasi",
    "v.error.sub": "Verifikasi tidak dapat diselesaikan. Silakan coba lagi.",
    "v.detail.code": "Kode Label",
    "v.detail.product": "Produk",
    "v.detail.maker": "Produsen",
    "v.detail.issued": "Diterbitkan",
    "v.detail.scans": "Total Pemindaian",
    "v.scanWarn": "⚠️ Label ini telah dipindai berkali-kali. Jika Anda tidak mengharapkan ini, produk mungkin telah berpindah tangan.",
    "footer.copy": "© 2025 TAGR. Semua hak dilindungi.",
  },
  zh: {
    "nav.home": "← 首页",
    "v.title": "验证真实性",
    "v.sub": "输入您的 TAGR NFC 标签上的代码以确认其真实性。",
    "v.inputLabel": "标签代码",
    "v.btn": "验证标签",
    "v.or": "或通过 NFC 扫描",
    "v.nfcTitle": "使用您的手机",
    "v.nfcDesc": "将任何支持 NFC 的智能手机直接点击标签，浏览器将自动打开此页面并预填代码。",
    "v.authentic.title": "正品",
    "v.authentic.sub": "此 TAGR 标签已注册且有效。",
    "v.fake.title": "未识别",
    "v.fake.sub": "在 TAGR 数据库中未找到此代码。此产品可能是假冒品。",
    "v.error.title": "验证错误",
    "v.error.sub": "无法完成验证，请重试。",
    "v.detail.code": "标签代码",
    "v.detail.product": "产品",
    "v.detail.maker": "制造商",
    "v.detail.issued": "发行时间",
    "v.detail.scans": "总扫描次数",
    "v.scanWarn": "⚠️ 此标签已被多次扫描。如果您未预期此情况，产品可能已易手或被重复使用。",
    "footer.copy": "© 2025 TAGR。保留所有权利。",
  },
  ar: {
    "nav.home": "→ الرئيسية",
    "v.title": "التحقق من الأصالة",
    "v.sub": "أدخل الرمز من ملصق NFC الخاص بـ TAGR للتأكد من أصالته.",
    "v.inputLabel": "رمز الملصق",
    "v.btn": "التحقق من الملصق",
    "v.or": "أو امسح عبر NFC",
    "v.nfcTitle": "استخدم هاتفك",
    "v.nfcDesc": "انقر بأي هاتف ذكي يدعم NFC مباشرة على الملصق. سيفتح متصفحك هذه الصفحة تلقائياً مع ملء الرمز مسبقاً.",
    "v.authentic.title": "منتج أصلي",
    "v.authentic.sub": "ملصق TAGR هذا مسجل وصالح.",
    "v.fake.title": "غير معروف",
    "v.fake.sub": "لم يتم العثور على هذا الرمز في قاعدة بيانات TAGR. قد يكون هذا المنتج مزوراً.",
    "v.error.title": "خطأ في التحقق",
    "v.error.sub": "تعذر إتمام التحقق. يرجى المحاولة مرة أخرى.",
    "v.detail.code": "رمز الملصق",
    "v.detail.product": "المنتج",
    "v.detail.maker": "الشركة المصنعة",
    "v.detail.issued": "تاريخ الإصدار",
    "v.detail.scans": "إجمالي المسح",
    "v.scanWarn": "⚠️ تم مسح هذا الملصق عدة مرات. إذا لم تتوقع ذلك، فقد يكون المنتج انتقل من يد لأخرى.",
    "footer.copy": "© 2025 TAGR. جميع الحقوق محفوظة.",
  },
  fr: {
    "nav.home": "← Accueil",
    "v.title": "Vérifier l'authenticité",
    "v.sub": "Saisissez le code de votre étiquette NFC TAGR pour confirmer qu'elle est authentique.",
    "v.inputLabel": "Code de l'étiquette",
    "v.btn": "Vérifier l'étiquette",
    "v.or": "ou scanner via NFC",
    "v.nfcTitle": "Utilisez votre téléphone",
    "v.nfcDesc": "Approchez un smartphone NFC de l'étiquette. Votre navigateur ouvrira cette page automatiquement avec le code pré-rempli.",
    "v.authentic.title": "Produit authentique",
    "v.authentic.sub": "Cette étiquette TAGR est enregistrée et valide.",
    "v.fake.title": "Non reconnu",
    "v.fake.sub": "Ce code n'a pas été trouvé dans la base de données TAGR. Ce produit pourrait être contrefait.",
    "v.error.title": "Erreur de vérification",
    "v.error.sub": "La vérification n'a pas pu être complétée. Veuillez réessayer.",
    "v.detail.code": "Code de l'étiquette",
    "v.detail.product": "Produit",
    "v.detail.maker": "Fabricant",
    "v.detail.issued": "Émis le",
    "v.detail.scans": "Scans totaux",
    "v.scanWarn": "⚠️ Cette étiquette a été scannée plusieurs fois. Si vous ne l'attendiez pas, le produit a peut-être changé de mains.",
    "footer.copy": "© 2025 TAGR. Tous droits réservés.",
  }
};
const langMeta = {
  en: { flag: '🇺🇸', code: 'EN' },
  id: { flag: '🇮🇩', code: 'ID' },
  zh: { flag: '🇨🇳', code: '中' },
  ar: { flag: '🇸🇦', code: 'AR' },
  fr: { flag: '🇫🇷', code: 'FR' },
};
let currentLang = localStorage.getItem('TAGR_lang') || 'en';

function t(key) { return (i18n[currentLang] && i18n[currentLang][key]) || key; }

function applyLang(lang) {
  if (!i18n[lang]) return;
  currentLang = lang;
  localStorage.setItem('TAGR_lang', lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (i18n[lang][key]) el.textContent = i18n[lang][key];
  });
  document.getElementById('currentFlag').textContent = langMeta[lang].flag;
  document.getElementById('currentLang').textContent = langMeta[lang].code;
  document.querySelectorAll('.lang-option').forEach((opt, i) => {
    opt.classList.toggle('active', Object.keys(langMeta)[i] === lang);
  });
}
function setLang(lang) { applyLang(lang); document.getElementById('langDropdown').classList.remove('open'); }
function toggleLang() { document.getElementById('langDropdown').classList.toggle('open'); }
document.addEventListener('click', (e) => {
  if (!e.target.closest('.lang-selector')) document.getElementById('langDropdown').classList.remove('open');
});

// ─── INPUT BEHAVIOR ───
const codeInput = document.getElementById('codeInput');
const clearBtn = document.getElementById('clearBtn');

codeInput.addEventListener('input', () => {
  clearBtn.classList.toggle('visible', codeInput.value.length > 0);
  // Auto-format: insert dash at positions 4 and 9
  let v = codeInput.value.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
  if (v.length > 4) v = v.slice(0,4) + '-' + v.slice(4);
  if (v.length > 9) v = v.slice(0,9) + '-' + v.slice(9);
  codeInput.value = v;
});

codeInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') doVerify();
});

function clearInput() {
  codeInput.value = '';
  clearBtn.classList.remove('visible');
  document.getElementById('result').className = '';
  document.getElementById('result').innerHTML = '';
  document.getElementById('result').style.display = 'none';
  codeInput.focus();
}

// ─── VERIFY ───
async function doVerify() {
  const code = codeInput.value.trim();
  if (!code) { codeInput.focus(); return; }

  const btn = document.getElementById('verifyBtn');
  const resultEl = document.getElementById('result');

  btn.disabled = true;
  btn.innerHTML = '<div class="spinner"></div>';

  resultEl.style.display = 'none';
  resultEl.innerHTML = '';

  try {
    const res = await fetch('/api/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });
    const data = await res.json();
    renderResult(data);
  } catch (err) {
    renderResult({ valid: false, error: 'network' });
  } finally {
    btn.disabled = false;
    btn.innerHTML = \`
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <span>\${t('v.btn')}</span>
    \`;
  }
}

function renderResult(data) {
  const resultEl = document.getElementById('result');
  resultEl.style.display = 'block';
  resultEl.className = 'visible';

  if (data.error && data.error !== 'network') {
    resultEl.innerHTML = \`
      <div class="result-error">
        <div class="result-top">
          <div class="result-badge badge-error">⚠️</div>
          <div>
            <div class="result-title error-title">\${t('v.error.title')}</div>
            <div class="result-subtitle">\${t('v.error.sub')}</div>
          </div>
        </div>
      </div>\`;
    return;
  }

  if (data.valid) {
    const issuedFormatted = data.issued_at
      ? new Date(data.issued_at).toLocaleDateString(currentLang === 'zh' ? 'zh-CN' : currentLang === 'ar' ? 'ar-SA' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' })
      : '—';
    const scanCount = data.scan_count || 1;
    const highScans = scanCount > 50;

    resultEl.innerHTML = \`
      <div class="result-authentic">
        <div class="result-top">
          <div class="result-badge badge-authentic">✅</div>
          <div>
            <div class="result-title authentic-title">\${t('v.authentic.title')}</div>
            <div class="result-subtitle">\${t('v.authentic.sub')}</div>
          </div>
        </div>
        <div class="detail-grid">
          <div class="detail-item">
            <div class="detail-key">\${t('v.detail.code')}</div>
            <div class="detail-val">\${data.code || '—'}</div>
          </div>
          <div class="detail-item">
            <div class="detail-key">\${t('v.detail.product')}</div>
            <div class="detail-val">\${data.product_name || '—'}</div>
          </div>
          <div class="detail-item">
            <div class="detail-key">\${t('v.detail.maker')}</div>
            <div class="detail-val">\${data.manufacturer || '—'}</div>
          </div>
          <div class="detail-item">
            <div class="detail-key">\${t('v.detail.issued')}</div>
            <div class="detail-val">\${issuedFormatted}</div>
          </div>
        </div>
        <div class="scan-count-badge">
          📡 \${t('v.detail.scans')}: \${scanCount}
        </div>
        \${highScans ? \`<div class="scan-warning">\${t('v.scanWarn')}</div>\` : ''}
      </div>\`;
  } else {
    resultEl.innerHTML = \`
      <div class="result-fake">
        <div class="result-top">
          <div class="result-badge badge-fake">❌</div>
          <div>
            <div class="result-title fake-title">\${t('v.fake.title')}</div>
            <div class="result-subtitle">\${t('v.fake.sub')}</div>
          </div>
        </div>
        \${data.code ? \`<div class="detail-grid"><div class="detail-item"><div class="detail-key">\${t('v.detail.code')}</div><div class="detail-val">\${data.code}</div></div></div>\` : ''}
      </div>\`;
  }

  resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ─── INIT ───
applyLang(currentLang);

// Auto-verify if code pre-filled from URL
const preCode = '${safeCode}';
if (preCode) {
  clearBtn.classList.add('visible');
  setTimeout(() => doVerify(), 600);
}
</script>
</body>
</html>`;
}
