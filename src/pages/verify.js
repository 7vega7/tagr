// TAGR Verify Page — NFC tap only, no manual input

export function getVerifyPage(initialCode = '') {
  const safeCode = initialCode.replace(/[<>"'&]/g, '');
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>TAGR \u2014 Verify Label Authenticity</title>
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
      --danger: #FF4B6E;
      --warning: #F5A623;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
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
    .logo::after { content: '\u00ae'; font-size: 0.45em; vertical-align: super; color: var(--text-muted); margin-left: 2px; }
    .nav-right { display: flex; align-items: center; gap: 1.5rem; }
    .nav-link { color: var(--text-muted); text-decoration: none; font-size: 0.88rem; transition: color 0.2s; }
    .nav-link:hover { color: var(--text); }
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
    main {
      flex: 1;
      position: relative;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 60px 5vw;
    }
    .verify-container { width: 100%; max-width: 520px; text-align: center; }
    .waiting-state { animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both; }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to { opacity: 1; transform: none; }
    }
    .nfc-pulse-wrap {
      width: 160px; height: 160px;
      margin: 0 auto 2.5rem;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .pulse-ring {
      position: absolute;
      border-radius: 50%;
      border: 1.5px solid var(--accent);
      opacity: 0;
      animation: pulseRing 2.5s ease-out infinite;
    }
    .pulse-ring:nth-child(1) { width: 76px; height: 76px; animation-delay: 0s; }
    .pulse-ring:nth-child(2) { width: 112px; height: 112px; animation-delay: 0.7s; }
    .pulse-ring:nth-child(3) { width: 150px; height: 150px; animation-delay: 1.4s; }
    @keyframes pulseRing {
      0% { opacity: 0.7; transform: scale(0.5); }
      100% { opacity: 0; transform: scale(1); }
    }
    .nfc-center {
      width: 64px; height: 64px;
      background: var(--accent-dim);
      border: 1px solid rgba(0,210,180,0.3);
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.8rem;
      position: relative;
      z-index: 2;
    }
    .waiting-title {
      font-family: 'Syne', sans-serif;
      font-size: 1.9rem;
      font-weight: 800;
      letter-spacing: -0.02em;
      margin-bottom: 0.8rem;
    }
    .waiting-sub {
      color: var(--text-muted);
      font-size: 0.97rem;
      font-weight: 300;
      line-height: 1.7;
      max-width: 360px;
      margin: 0 auto;
    }
    .loading-state { animation: fadeUp 0.4s ease both; }
    .loading-spinner {
      width: 52px; height: 52px;
      border: 3px solid rgba(0,210,180,0.12);
      border-top-color: var(--accent);
      border-radius: 50%;
      animation: spin 0.9s linear infinite;
      margin: 0 auto 1.8rem;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    .loading-text {
      font-family: 'Syne', sans-serif;
      font-size: 1.05rem;
      font-weight: 600;
      color: var(--text-muted);
      letter-spacing: 0.06em;
    }
    .result-card {
      border-radius: 16px;
      padding: 2.5rem 2rem;
      text-align: left;
      position: relative;
      overflow: hidden;
      animation: resultIn 0.5s cubic-bezier(0.22,1,0.36,1) both;
    }
    @keyframes resultIn {
      from { opacity: 0; transform: scale(0.96) translateY(14px); }
      to { opacity: 1; transform: none; }
    }
    .card-authentic { background: rgba(0,210,180,0.04); border: 1px solid rgba(0,210,180,0.3); }
    .card-authentic::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; height: 2px;
      background: linear-gradient(90deg, transparent, var(--accent), transparent);
    }
    .card-fake { background: rgba(255,75,110,0.04); border: 1px solid rgba(255,75,110,0.3); }
    .card-fake::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; height: 2px;
      background: linear-gradient(90deg, transparent, var(--danger), transparent);
    }
    .card-error { background: rgba(245,166,35,0.04); border: 1px solid rgba(245,166,35,0.3); }
    .result-top { display: flex; align-items: center; gap: 1.2rem; margin-bottom: 1.5rem; }
    .result-icon {
      width: 56px; height: 56px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.7rem;
      flex-shrink: 0;
    }
    .icon-ok { background: rgba(0,210,180,0.12); }
    .icon-bad { background: rgba(255,75,110,0.12); }
    .icon-warn { background: rgba(245,166,35,0.12); }
    .result-title { font-family: 'Syne', sans-serif; font-size: 1.4rem; font-weight: 800; }
    .col-ok { color: var(--accent); }
    .col-bad { color: var(--danger); }
    .col-warn { color: var(--warning); }
    .result-sub { font-size: 0.87rem; color: var(--text-muted); margin-top: 0.3rem; line-height: 1.5; }
    .detail-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin-top: 1.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--border);
    }
    .detail-key { font-size: 0.7rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-dim); margin-bottom: 0.25rem; }
    .detail-val { font-size: 0.92rem; color: var(--text); font-weight: 500; }
    .code-mono { font-family: 'Syne', monospace; letter-spacing: 0.1em; }
    .scan-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      background: rgba(0,210,180,0.08);
      border: 1px solid rgba(0,210,180,0.2);
      border-radius: 100px;
      padding: 0.25rem 0.8rem;
      font-size: 0.78rem;
      color: var(--accent);
      margin-top: 1rem;
    }
    .scan-warning {
      margin-top: 1rem;
      padding: 0.8rem 1rem;
      background: rgba(245,166,35,0.06);
      border: 1px solid rgba(245,166,35,0.2);
      border-radius: 8px;
      font-size: 0.82rem;
      color: var(--warning);
      line-height: 1.6;
    }
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
      .result-card { padding: 1.8rem 1.3rem; }
      footer { flex-direction: column; gap: 0.5rem; text-align: center; }
    }
  </style>
</head>
<body>
<div class="bg-grid"></div>
<nav>
  <a href="/" class="logo">TAGR</a>
  <div class="nav-right">
    <a href="/" class="nav-link" data-i18n="nav.home">\u2190 Home</a>
    <div class="lang-selector">
      <button class="lang-btn" onclick="toggleLang()" id="langBtn">
        <span id="currentFlag">\uD83C\uDF10</span>
        <span id="currentLang">EN</span>
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
      </button>
      <div class="lang-dropdown" id="langDropdown">
        <div class="lang-option active" onclick="setLang('en')">\uD83C\uDDFA\uD83C\uDDF8 English</div>
        <div class="lang-option" onclick="setLang('id')">\uD83C\uDDEE\uD83C\uDDE9 Bahasa Indonesia</div>
        <div class="lang-option" onclick="setLang('zh')">\uD83C\uDDE8\uD83C\uDDF3 \u4E2D\u6587</div>
        <div class="lang-option" onclick="setLang('ar')">\uD83C\uDDF8\uD83C\uDDE6 \u0627\u0644\u0639\u0631\u0628\u064A\u0629</div>
        <div class="lang-option" onclick="setLang('fr')">\uD83C\uDDEB\uD83C\uDDF7 Fran\u00E7ais</div>
      </div>
    </div>
  </div>
</nav>
<main>
  <div class="verify-container">
    <div id="stateWaiting" style="display:none">
      <div class="waiting-state">
        <div class="nfc-pulse-wrap">
          <div class="pulse-ring"></div>
          <div class="pulse-ring"></div>
          <div class="pulse-ring"></div>
          <div class="nfc-center">\uD83D\uDCE1</div>
        </div>
        <h1 class="waiting-title" data-i18n="v.waitTitle">Tap Your Label</h1>
        <p class="waiting-sub" data-i18n="v.waitSub">Hold your NFC-enabled phone against the TAGR label to verify this product's authenticity.</p>
      </div>
    </div>
    <div id="stateLoading" style="display:none">
      <div class="loading-state">
        <div class="loading-spinner"></div>
        <div class="loading-text" data-i18n="v.loading">Verifying...</div>
      </div>
    </div>
    <div id="stateResult" style="display:none"></div>
  </div>
</main>
<footer>
  <a href="/" class="footer-logo">TAGR</a>
  <span class="footer-copy" data-i18n="footer.copy">\u00A9 2025 TAGR. All rights reserved.</span>
</footer>
<script>
const i18n = {
  en: {
    "nav.home": "\u2190 Home",
    "v.waitTitle": "Tap Your Label",
    "v.waitSub": "Hold your NFC-enabled phone against the TAGR label to verify this product's authenticity.",
    "v.loading": "Verifying...",
    "v.authentic.title": "Authentic Product",
    "v.authentic.sub": "This TAGR label is registered and valid.",
    "v.fake.title": "Not Recognized",
    "v.fake.sub": "This code was not found in the TAGR database. This product may be counterfeit.",
    "v.error.title": "Verification Error",
    "v.error.sub": "Could not complete verification. Please try again.",
    "v.detail.code": "Label Code",
    "v.detail.product": "Product",
    "v.detail.maker": "Manufacturer",
    "v.detail.serial": "Serial Number",
    "v.detail.manufactured": "Manufactured",
    "v.detail.issued": "Issued",
    "v.detail.scans": "Total Scans",
    "v.scanWarn": "\u26A0\uFE0F This label has been scanned many times. If unexpected, the product may have changed hands.",
    "footer.copy": "\u00A9 2025 TAGR. All rights reserved.",
  },
  id: {
    "nav.home": "\u2190 Beranda",
    "v.waitTitle": "Ketuk Label Anda",
    "v.waitSub": "Tempelkan ponsel NFC Anda ke label TAGR untuk memverifikasi keaslian produk ini.",
    "v.loading": "Memverifikasi...",
    "v.authentic.title": "Produk Asli",
    "v.authentic.sub": "Label TAGR ini terdaftar dan valid.",
    "v.fake.title": "Tidak Dikenali",
    "v.fake.sub": "Kode ini tidak ditemukan di database TAGR. Produk ini mungkin palsu.",
    "v.error.title": "Kesalahan Verifikasi",
    "v.error.sub": "Verifikasi tidak dapat diselesaikan. Silakan coba lagi.",
    "v.detail.code": "Kode Label",
    "v.detail.product": "Produk",
    "v.detail.maker": "Produsen",
    "v.detail.serial": "Nomor Seri",
    "v.detail.manufactured": "Tanggal Produksi",
    "v.detail.issued": "Diterbitkan",
    "v.detail.scans": "Total Pemindaian",
    "v.scanWarn": "\u26A0\uFE0F Label ini telah dipindai berkali-kali. Produk mungkin telah berpindah tangan.",
    "footer.copy": "\u00A9 2025 TAGR. Semua hak dilindungi.",
  },
  zh: {
    "nav.home": "\u2190 \u9996\u9875",
    "v.waitTitle": "\u70B9\u51FB\u60A8\u7684\u6807\u7B7E",
    "v.waitSub": "\u5C06\u652F\u6301 NFC \u7684\u624B\u673A\u9760\u8FD1 TAGR \u6807\u7B7E\u4EE5\u9A8C\u8BC1\u4EA7\u54C1\u771F\u5B9E\u6027\u3002",
    "v.loading": "\u9A8C\u8BC1\u4E2D...",
    "v.authentic.title": "\u6B63\u54C1",
    "v.authentic.sub": "\u6B64 TAGR \u6807\u7B7E\u5DF2\u6CE8\u518C\u4E14\u6709\u6548\u3002",
    "v.fake.title": "\u672A\u8BC6\u522B",
    "v.fake.sub": "\u5728 TAGR \u6570\u636E\u5E93\u4E2D\u672A\u627E\u5230\u6B64\u4EE3\u7801\u3002\u6B64\u4EA7\u54C1\u53EF\u80FD\u662F\u5047\u5192\u54C1\u3002",
    "v.error.title": "\u9A8C\u8BC1\u9519\u8BEF",
    "v.error.sub": "\u65E0\u6CD5\u5B8C\u6210\u9A8C\u8BC1\uFF0C\u8BF7\u91CD\u8BD5\u3002",
    "v.detail.code": "\u6807\u7B7E\u4EE3\u7801",
    "v.detail.product": "\u4EA7\u54C1",
    "v.detail.maker": "\u5236\u9020\u5546",
    "v.detail.serial": "\u5E8F\u5217\u53F7",
    "v.detail.manufactured": "\u751F\u4EA7\u65E5\u671F",
    "v.detail.issued": "\u53D1\u884C\u65F6\u95F4",
    "v.detail.scans": "\u603B\u626B\u63CF\u6B21\u6570",
    "v.scanWarn": "\u26A0\uFE0F \u6B64\u6807\u7B7E\u5DF2\u88AB\u591A\u6B21\u626B\u63CF\uFF0C\u4EA7\u54C1\u53EF\u80FD\u5DF2\u6613\u624B\u3002",
    "footer.copy": "\u00A9 2025 TAGR\u3002\u4FDD\u7559\u6240\u6709\u6743\u5229\u3002",
  },
  ar: {
    "nav.home": "\u2192 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629",
    "v.waitTitle": "\u0627\u0646\u0642\u0631 \u0639\u0644\u0649 \u0627\u0644\u0645\u0644\u0635\u0642",
    "v.waitSub": "\u0636\u0639 \u0647\u0627\u062A\u0641\u0643 \u0627\u0644\u0645\u062F\u0639\u0648\u0645 \u0628\u0640 NFC \u0639\u0644\u0649 \u0645\u0644\u0635\u0642 TAGR \u0644\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0623\u0635\u0627\u0644\u0629 \u0647\u0630\u0627 \u0627\u0644\u0645\u0646\u062A\u062C.",
    "v.loading": "\u062C\u0627\u0631\u0650 \u0627\u0644\u062A\u062D\u0642\u0642...",
    "v.authentic.title": "\u0645\u0646\u062A\u062C \u0623\u0635\u0644\u064A",
    "v.authentic.sub": "\u0645\u0644\u0635\u0642 TAGR \u0647\u0630\u0627 \u0645\u0633\u062C\u0644 \u0648\u0635\u0627\u0644\u062D.",
    "v.fake.title": "\u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641",
    "v.fake.sub": "\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u0631\u0645\u0632 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0628\u064A\u0627\u0646\u0627\u062A TAGR.",
    "v.error.title": "\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062A\u062D\u0642\u0642",
    "v.error.sub": "\u062A\u0639\u0630\u0631 \u0625\u062A\u0645\u0627\u0645 \u0627\u0644\u062A\u062D\u0642\u0642. \u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.",
    "v.detail.code": "\u0631\u0645\u0632 \u0627\u0644\u0645\u0644\u0635\u0642",
    "v.detail.product": "\u0627\u0644\u0645\u0646\u062A\u062C",
    "v.detail.maker": "\u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0645\u0635\u0646\u0639\u0629",
    "v.detail.serial": "\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u062A\u0633\u0644\u0633\u0644\u064A",
    "v.detail.manufactured": "\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0646\u062A\u0627\u062C",
    "v.detail.issued": "\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u062F\u0627\u0631",
    "v.detail.scans": "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0633\u062D",
    "v.scanWarn": "\u26A0\uFE0F \u062A\u0645 \u0645\u0633\u062D \u0647\u0630\u0627 \u0627\u0644\u0645\u0644\u0635\u0642 \u0639\u062F\u0629 \u0645\u0631\u0627\u062A. \u0642\u062F \u064A\u0643\u0648\u0646 \u0627\u0644\u0645\u0646\u062A\u062C \u0627\u0646\u062A\u0642\u0644 \u0645\u0646 \u064A\u062F \u0644\u0623\u062E\u0631\u0649.",
    "footer.copy": "\u00A9 2025 TAGR. \u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0642 \u0645\u062D\u0641\u0648\u0638\u0629.",
  },
  fr: {
    "nav.home": "\u2190 Accueil",
    "v.waitTitle": "Approchez votre \u00E9tiquette",
    "v.waitSub": "Approchez votre t\u00E9l\u00E9phone NFC de l'\u00E9tiquette TAGR pour v\u00E9rifier l'authenticit\u00E9 de ce produit.",
    "v.loading": "V\u00E9rification...",
    "v.authentic.title": "Produit authentique",
    "v.authentic.sub": "Cette \u00E9tiquette TAGR est enregistr\u00E9e et valide.",
    "v.fake.title": "Non reconnu",
    "v.fake.sub": "Ce code n'a pas \u00E9t\u00E9 trouv\u00E9 dans la base de donn\u00E9es TAGR.",
    "v.error.title": "Erreur de v\u00E9rification",
    "v.error.sub": "La v\u00E9rification n'a pas pu \u00EAtre compl\u00E9t\u00E9e.",
    "v.detail.code": "Code de l'\u00E9tiquette",
    "v.detail.product": "Produit",
    "v.detail.maker": "Fabricant",
    "v.detail.serial": "Num\u00E9ro de s\u00E9rie",
    "v.detail.manufactured": "Date de fabrication",
    "v.detail.issued": "\u00C9mis le",
    "v.detail.scans": "Scans totaux",
    "v.scanWarn": "\u26A0\uFE0F Cette \u00E9tiquette a \u00E9t\u00E9 scann\u00E9e plusieurs fois. Le produit a peut-\u00EAtre chang\u00E9 de mains.",
    "footer.copy": "\u00A9 2025 TAGR. Tous droits r\u00E9serv\u00E9s.",
  }
};

const langMeta = {
  en: { flag: '\uD83C\uDDFA\uD83C\uDDF8', code: 'EN' },
  id: { flag: '\uD83C\uDDEE\uD83C\uDDE9', code: 'ID' },
  zh: { flag: '\uD83C\uDDE8\uD83C\uDDF3', code: '\u4E2D' },
  ar: { flag: '\uD83C\uDDF8\uD83C\uDDE6', code: 'AR' },
  fr: { flag: '\uD83C\uDDEB\uD83C\uDDF7', code: 'FR' },
};

let currentLang = localStorage.getItem('tagr_lang') || 'en';
function t(k) { return (i18n[currentLang] && i18n[currentLang][k]) || k; }

function applyLang(lang) {
  if (!i18n[lang]) return;
  currentLang = lang;
  localStorage.setItem('tagr_lang', lang);
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
document.addEventListener('click', e => {
  if (!e.target.closest('.lang-selector')) document.getElementById('langDropdown').classList.remove('open');
});

function showState(s) {
  document.getElementById('stateWaiting').style.display = s === 'waiting' ? 'block' : 'none';
  document.getElementById('stateLoading').style.display = s === 'loading' ? 'block' : 'none';
  document.getElementById('stateResult').style.display = s === 'result' ? 'block' : 'none';
}

function fmtDate(val) {
  if (!val) return '\u2014';
  return new Date(val).toLocaleDateString(
    currentLang === 'zh' ? 'zh-CN' : currentLang === 'ar' ? 'ar-SA' : 'en-US',
    { year: 'numeric', month: 'short', day: 'numeric' }
  );
}

async function doVerify(code) {
  showState('loading');
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
  }
}

function renderResult(data) {
  const el = document.getElementById('stateResult');

  if (data.error && data.error !== 'network') {
    el.innerHTML =
      '<div class="result-card card-error">' +
        '<div class="result-top">' +
          '<div class="result-icon icon-warn">\u26A0\uFE0F</div>' +
          '<div>' +
            '<div class="result-title col-warn">' + t('v.error.title') + '</div>' +
            '<div class="result-sub">' + t('v.error.sub') + '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
    showState('result');
    return;
  }

  if (data.valid) {
    const scans = data.scan_count || 1;
    el.innerHTML =
      '<div class="result-card card-authentic">' +
        '<div class="result-top">' +
          '<div class="result-icon icon-ok">\u2705</div>' +
          '<div>' +
            '<div class="result-title col-ok">' + t('v.authentic.title') + '</div>' +
            '<div class="result-sub">' + t('v.authentic.sub') + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="detail-grid">' +
          '<div>' +
            '<div class="detail-key">' + t('v.detail.product') + '</div>' +
            '<div class="detail-val">' + (data.product_name || '\u2014') + '</div>' +
          '</div>' +
          '<div>' +
            '<div class="detail-key">' + t('v.detail.maker') + '</div>' +
            '<div class="detail-val">' + (data.manufacturer || '\u2014') + '</div>' +
          '</div>' +
          '<div>' +
            '<div class="detail-key">' + t('v.detail.serial') + '</div>' +
            '<div class="detail-val code-mono">' + (data.serial_number || '\u2014') + '</div>' +
          '</div>' +
          '<div>' +
            '<div class="detail-key">' + t('v.detail.manufactured') + '</div>' +
            '<div class="detail-val">' + fmtDate(data.manufactured_at) + '</div>' +
          '</div>' +
          '<div>' +
            '<div class="detail-key">' + t('v.detail.issued') + '</div>' +
            '<div class="detail-val">' + fmtDate(data.issued_at) + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="scan-badge">\uD83D\uDCE1 ' + t('v.detail.scans') + ': ' + scans + '</div>' +
        (scans > 50 ? '<div class="scan-warning">' + t('v.scanWarn') + '</div>' : '') +
      '</div>';
  } else {
    el.innerHTML =
      '<div class="result-card card-fake">' +
        '<div class="result-top">' +
          '<div class="result-icon icon-bad">\u274C</div>' +
          '<div>' +
            '<div class="result-title col-bad">' + t('v.fake.title') + '</div>' +
            '<div class="result-sub">' + t('v.fake.sub') + '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
  }
  showState('result');
}

applyLang(currentLang);
const preCode = '${safeCode}';
if (preCode) {
  doVerify(preCode);
} else {
  showState('waiting');
}
</script>
</body>
</html>`;
}
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
      max-width: 520px;
      text-align: center;
    }

    /* WAITING STATE */
    .waiting-state { animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both; }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to { opacity: 1; transform: none; }
    }

    .nfc-pulse-wrap {
      width: 160px;
      height: 160px;
      margin: 0 auto 2.5rem;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .pulse-ring {
      position: absolute;
      border-radius: 50%;
      border: 1.5px solid var(--accent);
      opacity: 0;
      animation: pulseRing 2.5s ease-out infinite;
    }
    .pulse-ring:nth-child(1) { width: 76px; height: 76px; animation-delay: 0s; }
    .pulse-ring:nth-child(2) { width: 112px; height: 112px; animation-delay: 0.7s; }
    .pulse-ring:nth-child(3) { width: 150px; height: 150px; animation-delay: 1.4s; }
    @keyframes pulseRing {
      0% { opacity: 0.7; transform: scale(0.5); }
      100% { opacity: 0; transform: scale(1); }
    }
    .nfc-center {
      width: 64px; height: 64px;
      background: var(--accent-dim);
      border: 1px solid rgba(0,210,180,0.3);
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.8rem;
      position: relative;
      z-index: 2;
    }

    .waiting-title {
      font-family: 'Syne', sans-serif;
      font-size: 1.9rem;
      font-weight: 800;
      letter-spacing: -0.02em;
      margin-bottom: 0.8rem;
    }
    .waiting-sub {
      color: var(--text-muted);
      font-size: 0.97rem;
      font-weight: 300;
      line-height: 1.7;
      max-width: 360px;
      margin: 0 auto;
    }

    /* LOADING STATE */
    .loading-state { animation: fadeUp 0.4s ease both; }
    .loading-spinner {
      width: 52px; height: 52px;
      border: 3px solid rgba(0,210,180,0.12);
      border-top-color: var(--accent);
      border-radius: 50%;
      animation: spin 0.9s linear infinite;
      margin: 0 auto 1.8rem;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    .loading-text {
      font-family: 'Syne', sans-serif;
      font-size: 1.05rem;
      font-weight: 600;
      color: var(--text-muted);
      letter-spacing: 0.06em;
    }

    /* RESULT CARD */
    .result-card {
      border-radius: 16px;
      padding: 2.5rem 2rem;
      text-align: left;
      position: relative;
      overflow: hidden;
      animation: resultIn 0.5s cubic-bezier(0.22,1,0.36,1) both;
    }
    @keyframes resultIn {
      from { opacity: 0; transform: scale(0.96) translateY(14px); }
      to { opacity: 1; transform: none; }
    }
    .card-authentic {
      background: rgba(0,210,180,0.04);
      border: 1px solid rgba(0,210,180,0.3);
    }
    .card-authentic::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; height: 2px;
      background: linear-gradient(90deg, transparent, var(--accent), transparent);
    }
    .card-fake {
      background: rgba(255,75,110,0.04);
      border: 1px solid rgba(255,75,110,0.3);
    }
    .card-fake::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; height: 2px;
      background: linear-gradient(90deg, transparent, var(--danger), transparent);
    }
    .card-error {
      background: rgba(245,166,35,0.04);
      border: 1px solid rgba(245,166,35,0.3);
    }

    .result-top {
      display: flex;
      align-items: center;
      gap: 1.2rem;
      margin-bottom: 1.5rem;
    }
    .result-icon {
      width: 56px; height: 56px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.7rem;
      flex-shrink: 0;
    }
    .icon-ok { background: rgba(0,210,180,0.12); }
    .icon-bad { background: rgba(255,75,110,0.12); }
    .icon-warn { background: rgba(245,166,35,0.12); }

    .result-title {
      font-family: 'Syne', sans-serif;
      font-size: 1.4rem;
      font-weight: 800;
    }
    .col-ok { color: var(--accent); }
    .col-bad { color: var(--danger); }
    .col-warn { color: var(--warning); }
    .result-sub { font-size: 0.87rem; color: var(--text-muted); margin-top: 0.3rem; line-height: 1.5; }

    .detail-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin-top: 1.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--border);
    }
    .detail-key { font-size: 0.7rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-dim); margin-bottom: 0.25rem; }
    .detail-val { font-size: 0.92rem; color: var(--text); font-weight: 500; }
    .code-mono { font-family: 'Syne', monospace; letter-spacing: 0.1em; }

    .scan-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      background: rgba(0,210,180,0.08);
      border: 1px solid rgba(0,210,180,0.2);
      border-radius: 100px;
      padding: 0.25rem 0.8rem;
      font-size: 0.78rem;
      color: var(--accent);
      margin-top: 1rem;
    }
    .scan-warning {
      margin-top: 1rem;
      padding: 0.8rem 1rem;
      background: rgba(245,166,35,0.06);
      border: 1px solid rgba(245,166,35,0.2);
      border-radius: 8px;
      font-size: 0.82rem;
      color: var(--warning);
      line-height: 1.6;
    }

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
      .result-card { padding: 1.8rem 1.3rem; }
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
    <div id="stateWaiting" style="display:none">
      <div class="waiting-state">
        <div class="nfc-pulse-wrap">
          <div class="pulse-ring"></div>
          <div class="pulse-ring"></div>
          <div class="pulse-ring"></div>
          <div class="nfc-center">📡</div>
        </div>
        <h1 class="waiting-title" data-i18n="v.waitTitle">Tap Your Label</h1>
        <p class="waiting-sub" data-i18n="v.waitSub">Hold your NFC-enabled phone against the TAGR label to verify this product's authenticity.</p>
      </div>
    </div>

    <div id="stateLoading" style="display:none">
      <div class="loading-state">
        <div class="loading-spinner"></div>
        <div class="loading-text" data-i18n="v.loading">Verifying...</div>
      </div>
    </div>

    <div id="stateResult" style="display:none"></div>
  </div>
</main>

<footer>
  <a href="/" class="footer-logo">TAGR</a>
  <span class="footer-copy" data-i18n="footer.copy">© 2025 TAGR. All rights reserved.</span>
</footer>

<script>
const i18n = {
  en: {
    "nav.home": "← Home",
    "v.waitTitle": "Tap Your Label",
    "v.waitSub": "Hold your NFC-enabled phone against the TAGR label to verify this product's authenticity.",
    "v.loading": "Verifying...",
    "v.authentic.title": "Authentic Product",
    "v.authentic.sub": "This TAGR label is registered and valid.",
    "v.fake.title": "Not Recognized",
    "v.fake.sub": "This code was not found in the TAGR database. This product may be counterfeit.",
    "v.error.title": "Verification Error",
    "v.error.sub": "Could not complete verification. Please try again.",
    "v.detail.code": "Label Code",
    "v.detail.product": "Product",
    "v.detail.maker": "Manufacturer",
    "v.detail.serial": "Serial Number",
    "v.detail.manufactured": "Manufactured",
    "v.detail.issued": "Issued",
    "v.detail.scans": "Total Scans",
    "v.scanWarn": "⚠️ This label has been scanned many times. If unexpected, the product may have changed hands.",
    "footer.copy": "© 2025 TAGR. All rights reserved.",
  },
  id: {
    "nav.home": "← Beranda",
    "v.waitTitle": "Ketuk Label Anda",
    "v.waitSub": "Tempelkan ponsel NFC Anda ke label TAGR untuk memverifikasi keaslian produk ini.",
    "v.loading": "Memverifikasi...",
    "v.authentic.title": "Produk Asli",
    "v.authentic.sub": "Label TAGR ini terdaftar dan valid.",
    "v.fake.title": "Tidak Dikenali",
    "v.fake.sub": "Kode ini tidak ditemukan di database TAGR. Produk ini mungkin palsu.",
    "v.error.title": "Kesalahan Verifikasi",
    "v.error.sub": "Verifikasi tidak dapat diselesaikan. Silakan coba lagi.",
    "v.detail.code": "Kode Label",
    "v.detail.product": "Produk",
    "v.detail.maker": "Produsen",
    "v.detail.serial": "Nomor Seri",
    "v.detail.manufactured": "Tanggal Produksi",
    "v.detail.issued": "Diterbitkan",
    "v.detail.scans": "Total Pemindaian",
    "v.scanWarn": "⚠️ Label ini telah dipindai berkali-kali. Produk mungkin telah berpindah tangan.",
    "footer.copy": "© 2025 TAGR. Semua hak dilindungi.",
  },
  zh: {
    "nav.home": "← 首页",
    "v.waitTitle": "点击您的标签",
    "v.waitSub": "将支持 NFC 的手机靠近 TAGR 标签以验证产品真实性。",
    "v.loading": "验证中...",
    "v.authentic.title": "正品",
    "v.authentic.sub": "此 TAGR 标签已注册且有效。",
    "v.fake.title": "未识别",
    "v.fake.sub": "在 TAGR 数据库中未找到此代码。此产品可能是假冒品。",
    "v.error.title": "验证错误",
    "v.error.sub": "无法完成验证，请重试。",
    "v.detail.code": "标签代码",
    "v.detail.product": "产品",
    "v.detail.maker": "制造商",
    "v.detail.serial": "序列号",
    "v.detail.manufactured": "生产日期",
    "v.detail.issued": "发行时间",
    "v.detail.scans": "总扫描次数",
    "v.scanWarn": "⚠️ 此标签已被多次扫描，产品可能已易手。",
    "footer.copy": "© 2025 TAGR。保留所有权利。",
  },
  ar: {
    "nav.home": "→ الرئيسية",
    "v.waitTitle": "انقر على الملصق",
    "v.waitSub": "ضع هاتفك المدعوم بـ NFC على ملصق TAGR للتحقق من أصالة هذا المنتج.",
    "v.loading": "جارٍ التحقق...",
    "v.authentic.title": "منتج أصلي",
    "v.authentic.sub": "ملصق TAGR هذا مسجل وصالح.",
    "v.fake.title": "غير معروف",
    "v.fake.sub": "لم يتم العثور على هذا الرمز في قاعدة بيانات TAGR.",
    "v.error.title": "خطأ في التحقق",
    "v.error.sub": "تعذر إتمام التحقق. يرجى المحاولة مرة أخرى.",
    "v.detail.code": "رمز الملصق",
    "v.detail.product": "المنتج",
    "v.detail.maker": "الشركة المصنعة",
    "v.detail.serial": "الرقم التسلسلي",
    "v.detail.manufactured": "تاريخ الإنتاج",
    "v.detail.issued": "تاريخ الإصدار",
    "v.detail.scans": "إجمالي المسح",
    "v.scanWarn": "⚠️ تم مسح هذا الملصق عدة مرات. قد يكون المنتج انتقل من يد لأخرى.",
    "footer.copy": "© 2025 TAGR. جميع الحقوق محفوظة.",
  },
  fr: {
    "nav.home": "← Accueil",
    "v.waitTitle": "Approchez votre étiquette",
    "v.waitSub": "Approchez votre téléphone NFC de l'étiquette TAGR pour vérifier l'authenticité de ce produit.",
    "v.loading": "Vérification...",
    "v.authentic.title": "Produit authentique",
    "v.authentic.sub": "Cette étiquette TAGR est enregistrée et valide.",
    "v.fake.title": "Non reconnu",
    "v.fake.sub": "Ce code n'a pas été trouvé dans la base de données TAGR.",
    "v.error.title": "Erreur de vérification",
    "v.error.sub": "La vérification n'a pas pu être complétée.",
    "v.detail.code": "Code de l'étiquette",
    "v.detail.product": "Produit",
    "v.detail.maker": "Fabricant",
    "v.detail.serial": "Numéro de série",
    "v.detail.manufactured": "Date de fabrication",
    "v.detail.issued": "Émis le",
    "v.detail.scans": "Scans totaux",
    "v.scanWarn": "⚠️ Cette étiquette a été scannée plusieurs fois. Le produit a peut-être changé de mains.",
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

let currentLang = localStorage.getItem('tagr_lang') || 'en';
function t(k) { return (i18n[currentLang] && i18n[currentLang][k]) || k; }

function applyLang(lang) {
  if (!i18n[lang]) return;
  currentLang = lang;
  localStorage.setItem('tagr_lang', lang);
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
document.addEventListener('click', e => {
  if (!e.target.closest('.lang-selector')) document.getElementById('langDropdown').classList.remove('open');
});

function showState(s) {
  document.getElementById('stateWaiting').style.display = s === 'waiting' ? 'block' : 'none';
  document.getElementById('stateLoading').style.display = s === 'loading' ? 'block' : 'none';
  document.getElementById('stateResult').style.display = s === 'result' ? 'block' : 'none';
}

async function doVerify(code) {
  showState('loading');
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
  }
}

function renderResult(data) {
  const el = document.getElementById('stateResult');

  if (data.error && data.error !== 'network') {
    el.innerHTML = \`
      <div class="result-card card-error">
        <div class="result-top">
          <div class="result-icon icon-warn">⚠️</div>
          <div>
            <div class="result-title col-warn">\${t('v.error.title')}</div>
            <div class="result-sub">\${t('v.error.sub')}</div>
          </div>
        </div>
      </div>\`;
    showState('result');
    return;
  }

  if (data.valid) {
    const issued = data.issued_at
      ? new Date(data.issued_at).toLocaleDateString(
          currentLang === 'zh' ? 'zh-CN' : currentLang === 'ar' ? 'ar-SA' : 'en-US',
          { year: 'numeric', month: 'short', day: 'numeric' })
      : '—';
    const manufactured = data.manufactured_at
      ? new Date(data.manufactured_at).toLocaleDateString(
          currentLang === 'zh' ? 'zh-CN' : currentLang === 'ar' ? 'ar-SA' : 'en-US',
          { year: 'numeric', month: 'short', day: 'numeric' })
      : '—';
    const scans = data.scan_count || 1;
    el.innerHTML = \`
      <div class="result-card card-authentic">
        <div class="result-top">
          <div class="result-icon icon-ok">✅</div>
          <div>
            <div class="result-title col-ok">\${t('v.authentic.title')}</div>
            <div class="result-sub">\${t('v.authentic.sub')}</div>
          </div>
        </div>
        <div class="detail-grid">
          <div>
            <div class="detail-key">\${t('v.detail.code')}</div>
            <div class="detail-val code-mono">\${data.code || '—'}</div>
          </div>
          <div>
            <div class="detail-key">\${t('v.detail.product')}</div>
            <div class="detail-val">\${data.product_name || '—'}</div>
          </div>
          <div>
            <div class="detail-key">\${t('v.detail.maker')}</div>
            <div class="detail-val">\${data.manufacturer || '—'}</div>
          </div>
          <div>
            <div class="detail-key">\${t('v.detail.serial')}</div>
            <div class="detail-val code-mono">\${data.serial_number || '—'}</div>
          </div>
          <div>
            <div class="detail-key">\${t('v.detail.manufactured')}</div>
            <div class="detail-val">\${manufactured}</div>
          </div>
          <div>
            <div class="detail-key">\${t('v.detail.issued')}</div>
            <div class="detail-val">\${issued}</div>
          </div>
        </div>
        <div class="scan-badge">📡 \${t('v.detail.scans')}: \${scans}</div>
        \${scans > 50 ? \`<div class="scan-warning">\${t('v.scanWarn')}</div>\` : ''}
      </div>\`;
  } else {
    el.innerHTML = \`
      <div class="result-card card-fake">
        <div class="result-top">
          <div class="result-icon icon-bad">❌</div>
          <div>
            <div class="result-title col-bad">\${t('v.fake.title')}</div>
            <div class="result-sub">\${t('v.fake.sub')}</div>
          </div>
        </div>
        \${data.code ? \`
        <div class="detail-grid">
          <div>
            <div class="detail-key">\${t('v.detail.code')}</div>
            <div class="detail-val code-mono">\${data.code}</div>
          </div>
        </div>\` : ''}
      </div>\`;
  }
  showState('result');
}

// INIT
applyLang(currentLang);
const preCode = '${safeCode}';
if (preCode) {
  doVerify(preCode);
} else {
  showState('waiting');
}
</script>
</body>
</html>`;
}
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
      max-width: 520px;
      text-align: center;
    }

    /* WAITING STATE */
    .waiting-state { animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both; }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to { opacity: 1; transform: none; }
    }

    .nfc-pulse-wrap {
      width: 160px;
      height: 160px;
      margin: 0 auto 2.5rem;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .pulse-ring {
      position: absolute;
      border-radius: 50%;
      border: 1.5px solid var(--accent);
      opacity: 0;
      animation: pulseRing 2.5s ease-out infinite;
    }
    .pulse-ring:nth-child(1) { width: 76px; height: 76px; animation-delay: 0s; }
    .pulse-ring:nth-child(2) { width: 112px; height: 112px; animation-delay: 0.7s; }
    .pulse-ring:nth-child(3) { width: 150px; height: 150px; animation-delay: 1.4s; }
    @keyframes pulseRing {
      0% { opacity: 0.7; transform: scale(0.5); }
      100% { opacity: 0; transform: scale(1); }
    }
    .nfc-center {
      width: 64px; height: 64px;
      background: var(--accent-dim);
      border: 1px solid rgba(0,210,180,0.3);
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.8rem;
      position: relative;
      z-index: 2;
    }

    .waiting-title {
      font-family: 'Syne', sans-serif;
      font-size: 1.9rem;
      font-weight: 800;
      letter-spacing: -0.02em;
      margin-bottom: 0.8rem;
    }
    .waiting-sub {
      color: var(--text-muted);
      font-size: 0.97rem;
      font-weight: 300;
      line-height: 1.7;
      max-width: 360px;
      margin: 0 auto;
    }

    /* LOADING STATE */
    .loading-state { animation: fadeUp 0.4s ease both; }
    .loading-spinner {
      width: 52px; height: 52px;
      border: 3px solid rgba(0,210,180,0.12);
      border-top-color: var(--accent);
      border-radius: 50%;
      animation: spin 0.9s linear infinite;
      margin: 0 auto 1.8rem;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    .loading-text {
      font-family: 'Syne', sans-serif;
      font-size: 1.05rem;
      font-weight: 600;
      color: var(--text-muted);
      letter-spacing: 0.06em;
    }

    /* RESULT CARD */
    .result-card {
      border-radius: 16px;
      padding: 2.5rem 2rem;
      text-align: left;
      position: relative;
      overflow: hidden;
      animation: resultIn 0.5s cubic-bezier(0.22,1,0.36,1) both;
    }
    @keyframes resultIn {
      from { opacity: 0; transform: scale(0.96) translateY(14px); }
      to { opacity: 1; transform: none; }
    }
    .card-authentic {
      background: rgba(0,210,180,0.04);
      border: 1px solid rgba(0,210,180,0.3);
    }
    .card-authentic::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; height: 2px;
      background: linear-gradient(90deg, transparent, var(--accent), transparent);
    }
    .card-fake {
      background: rgba(255,75,110,0.04);
      border: 1px solid rgba(255,75,110,0.3);
    }
    .card-fake::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; height: 2px;
      background: linear-gradient(90deg, transparent, var(--danger), transparent);
    }
    .card-error {
      background: rgba(245,166,35,0.04);
      border: 1px solid rgba(245,166,35,0.3);
    }

    .result-top {
      display: flex;
      align-items: center;
      gap: 1.2rem;
      margin-bottom: 1.5rem;
    }
    .result-icon {
      width: 56px; height: 56px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.7rem;
      flex-shrink: 0;
    }
    .icon-ok { background: rgba(0,210,180,0.12); }
    .icon-bad { background: rgba(255,75,110,0.12); }
    .icon-warn { background: rgba(245,166,35,0.12); }

    .result-title {
      font-family: 'Syne', sans-serif;
      font-size: 1.4rem;
      font-weight: 800;
    }
    .col-ok { color: var(--accent); }
    .col-bad { color: var(--danger); }
    .col-warn { color: var(--warning); }
    .result-sub { font-size: 0.87rem; color: var(--text-muted); margin-top: 0.3rem; line-height: 1.5; }

    .detail-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin-top: 1.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--border);
    }
    .detail-key { font-size: 0.7rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-dim); margin-bottom: 0.25rem; }
    .detail-val { font-size: 0.92rem; color: var(--text); font-weight: 500; }
    .code-mono { font-family: 'Syne', monospace; letter-spacing: 0.1em; }

    .scan-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      background: rgba(0,210,180,0.08);
      border: 1px solid rgba(0,210,180,0.2);
      border-radius: 100px;
      padding: 0.25rem 0.8rem;
      font-size: 0.78rem;
      color: var(--accent);
      margin-top: 1rem;
    }
    .scan-warning {
      margin-top: 1rem;
      padding: 0.8rem 1rem;
      background: rgba(245,166,35,0.06);
      border: 1px solid rgba(245,166,35,0.2);
      border-radius: 8px;
      font-size: 0.82rem;
      color: var(--warning);
      line-height: 1.6;
    }

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
      .result-card { padding: 1.8rem 1.3rem; }
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
    <div id="stateWaiting" style="display:none">
      <div class="waiting-state">
        <div class="nfc-pulse-wrap">
          <div class="pulse-ring"></div>
          <div class="pulse-ring"></div>
          <div class="pulse-ring"></div>
          <div class="nfc-center">📡</div>
        </div>
        <h1 class="waiting-title" data-i18n="v.waitTitle">Tap Your Label</h1>
        <p class="waiting-sub" data-i18n="v.waitSub">Hold your NFC-enabled phone against the TAGR label to verify this product's authenticity.</p>
      </div>
    </div>

    <div id="stateLoading" style="display:none">
      <div class="loading-state">
        <div class="loading-spinner"></div>
        <div class="loading-text" data-i18n="v.loading">Verifying...</div>
      </div>
    </div>

    <div id="stateResult" style="display:none"></div>
  </div>
</main>

<footer>
  <a href="/" class="footer-logo">TAGR</a>
  <span class="footer-copy" data-i18n="footer.copy">© 2025 TAGR. All rights reserved.</span>
</footer>

<script>
const i18n = {
  en: {
    "nav.home": "← Home",
    "v.waitTitle": "Tap Your Label",
    "v.waitSub": "Hold your NFC-enabled phone against the TAGR label to verify this product's authenticity.",
    "v.loading": "Verifying...",
    "v.authentic.title": "Authentic Product",
    "v.authentic.sub": "This TAGR label is registered and valid.",
    "v.fake.title": "Not Recognized",
    "v.fake.sub": "This code was not found in the TAGR database. This product may be counterfeit.",
    "v.error.title": "Verification Error",
    "v.error.sub": "Could not complete verification. Please try again.",
    "v.detail.code": "Label Code",
    "v.detail.product": "Product",
    "v.detail.maker": "Manufacturer",
    "v.detail.issued": "Issued",
    "v.detail.scans": "Total Scans",
    "v.scanWarn": "⚠️ This label has been scanned many times. If unexpected, the product may have changed hands.",
    "footer.copy": "© 2025 TAGR. All rights reserved.",
  },
  id: {
    "nav.home": "← Beranda",
    "v.waitTitle": "Ketuk Label Anda",
    "v.waitSub": "Tempelkan ponsel NFC Anda ke label TAGR untuk memverifikasi keaslian produk ini.",
    "v.loading": "Memverifikasi...",
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
    "v.scanWarn": "⚠️ Label ini telah dipindai berkali-kali. Produk mungkin telah berpindah tangan.",
    "footer.copy": "© 2025 TAGR. Semua hak dilindungi.",
  },
  zh: {
    "nav.home": "← 首页",
    "v.waitTitle": "点击您的标签",
    "v.waitSub": "将支持 NFC 的手机靠近 TAGR 标签以验证产品真实性。",
    "v.loading": "验证中...",
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
    "v.scanWarn": "⚠️ 此标签已被多次扫描，产品可能已易手。",
    "footer.copy": "© 2025 TAGR。保留所有权利。",
  },
  ar: {
    "nav.home": "→ الرئيسية",
    "v.waitTitle": "انقر على الملصق",
    "v.waitSub": "ضع هاتفك المدعوم بـ NFC على ملصق TAGR للتحقق من أصالة هذا المنتج.",
    "v.loading": "جارٍ التحقق...",
    "v.authentic.title": "منتج أصلي",
    "v.authentic.sub": "ملصق TAGR هذا مسجل وصالح.",
    "v.fake.title": "غير معروف",
    "v.fake.sub": "لم يتم العثور على هذا الرمز في قاعدة بيانات TAGR.",
    "v.error.title": "خطأ في التحقق",
    "v.error.sub": "تعذر إتمام التحقق. يرجى المحاولة مرة أخرى.",
    "v.detail.code": "رمز الملصق",
    "v.detail.product": "المنتج",
    "v.detail.maker": "الشركة المصنعة",
    "v.detail.issued": "تاريخ الإصدار",
    "v.detail.scans": "إجمالي المسح",
    "v.scanWarn": "⚠️ تم مسح هذا الملصق عدة مرات. قد يكون المنتج انتقل من يد لأخرى.",
    "footer.copy": "© 2025 TAGR. جميع الحقوق محفوظة.",
  },
  fr: {
    "nav.home": "← Accueil",
    "v.waitTitle": "Approchez votre étiquette",
    "v.waitSub": "Approchez votre téléphone NFC de l'étiquette TAGR pour vérifier l'authenticité de ce produit.",
    "v.loading": "Vérification...",
    "v.authentic.title": "Produit authentique",
    "v.authentic.sub": "Cette étiquette TAGR est enregistrée et valide.",
    "v.fake.title": "Non reconnu",
    "v.fake.sub": "Ce code n'a pas été trouvé dans la base de données TAGR.",
    "v.error.title": "Erreur de vérification",
    "v.error.sub": "La vérification n'a pas pu être complétée.",
    "v.detail.code": "Code de l'étiquette",
    "v.detail.product": "Produit",
    "v.detail.maker": "Fabricant",
    "v.detail.issued": "Émis le",
    "v.detail.scans": "Scans totaux",
    "v.scanWarn": "⚠️ Cette étiquette a été scannée plusieurs fois. Le produit a peut-être changé de mains.",
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

let currentLang = localStorage.getItem('tagr_lang') || 'en';
function t(k) { return (i18n[currentLang] && i18n[currentLang][k]) || k; }

function applyLang(lang) {
  if (!i18n[lang]) return;
  currentLang = lang;
  localStorage.setItem('tagr_lang', lang);
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
document.addEventListener('click', e => {
  if (!e.target.closest('.lang-selector')) document.getElementById('langDropdown').classList.remove('open');
});

function showState(s) {
  document.getElementById('stateWaiting').style.display = s === 'waiting' ? 'block' : 'none';
  document.getElementById('stateLoading').style.display = s === 'loading' ? 'block' : 'none';
  document.getElementById('stateResult').style.display = s === 'result' ? 'block' : 'none';
}

async function doVerify(code) {
  showState('loading');
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
  }
}

function renderResult(data) {
  const el = document.getElementById('stateResult');

  if (data.error && data.error !== 'network') {
    el.innerHTML = \`
      <div class="result-card card-error">
        <div class="result-top">
          <div class="result-icon icon-warn">⚠️</div>
          <div>
            <div class="result-title col-warn">\${t('v.error.title')}</div>
            <div class="result-sub">\${t('v.error.sub')}</div>
          </div>
        </div>
      </div>\`;
    showState('result');
    return;
  }

  if (data.valid) {
    const issued = data.issued_at
      ? new Date(data.issued_at).toLocaleDateString(
          currentLang === 'zh' ? 'zh-CN' : currentLang === 'ar' ? 'ar-SA' : 'en-US',
          { year: 'numeric', month: 'short', day: 'numeric' })
      : '—';
    const scans = data.scan_count || 1;
    el.innerHTML = \`
      <div class="result-card card-authentic">
        <div class="result-top">
          <div class="result-icon icon-ok">✅</div>
          <div>
            <div class="result-title col-ok">\${t('v.authentic.title')}</div>
            <div class="result-sub">\${t('v.authentic.sub')}</div>
          </div>
        </div>
        <div class="detail-grid">
          <div>
            <div class="detail-key">\${t('v.detail.code')}</div>
            <div class="detail-val code-mono">\${data.code || '—'}</div>
          </div>
          <div>
            <div class="detail-key">\${t('v.detail.product')}</div>
            <div class="detail-val">\${data.product_name || '—'}</div>
          </div>
          <div>
            <div class="detail-key">\${t('v.detail.maker')}</div>
            <div class="detail-val">\${data.manufacturer || '—'}</div>
          </div>
          <div>
            <div class="detail-key">\${t('v.detail.issued')}</div>
            <div class="detail-val">\${issued}</div>
          </div>
        </div>
        <div class="scan-badge">📡 \${t('v.detail.scans')}: \${scans}</div>
        \${scans > 50 ? \`<div class="scan-warning">\${t('v.scanWarn')}</div>\` : ''}
      </div>\`;
  } else {
    el.innerHTML = \`
      <div class="result-card card-fake">
        <div class="result-top">
          <div class="result-icon icon-bad">❌</div>
          <div>
            <div class="result-title col-bad">\${t('v.fake.title')}</div>
            <div class="result-sub">\${t('v.fake.sub')}</div>
          </div>
        </div>
        \${data.code ? \`
        <div class="detail-grid">
          <div>
            <div class="detail-key">\${t('v.detail.code')}</div>
            <div class="detail-val code-mono">\${data.code}</div>
          </div>
        </div>\` : ''}
      </div>\`;
  }
  showState('result');
}

// INIT
applyLang(currentLang);
const preCode = '${safeCode}';
if (preCode) {
  doVerify(preCode);
} else {
  showState('waiting');
}
</script>
</body>
</html>`;
}
