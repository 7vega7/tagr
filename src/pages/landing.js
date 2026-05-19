// BETAG Landing Page

export function getLandingPage() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>BETAG — NFC Anti-Counterfeiting Labels</title>
  <meta name="description" content="BETAG provides cutting-edge NFC-powered anti-counterfeiting labels to protect your brand and products." />
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
      --gold: #C9A84C;
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    html { scroll-behavior: smooth; }

    body {
      font-family: 'DM Sans', sans-serif;
      background: var(--bg);
      color: var(--text);
      overflow-x: hidden;
      line-height: 1.6;
    }

    /* ─── NOISE TEXTURE OVERLAY ─── */
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 0;
      opacity: 0.5;
    }

    /* ─── NAV ─── */
    nav {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 5vw;
      height: 68px;
      background: rgba(5,10,14,0.85);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border);
    }

    .logo {
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: 1.6rem;
      letter-spacing: 0.12em;
      color: var(--accent);
      text-decoration: none;
      position: relative;
    }
    .logo::after {
      content: '®';
      font-size: 0.45em;
      vertical-align: super;
      color: var(--text-muted);
      margin-left: 2px;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 2rem;
      list-style: none;
    }
    .nav-links a {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.88rem;
      letter-spacing: 0.04em;
      transition: color 0.2s;
    }
    .nav-links a:hover { color: var(--text); }

    .nav-cta {
      background: var(--accent);
      color: #050A0E !important;
      padding: 0.45rem 1.2rem;
      border-radius: 4px;
      font-weight: 600 !important;
      letter-spacing: 0.06em !important;
      transition: background 0.2s, transform 0.15s !important;
    }
    .nav-cta:hover { background: var(--accent2) !important; transform: translateY(-1px); }

    /* Language Selector */
    .lang-selector {
      position: relative;
    }
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
      min-width: 140px;
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

    /* ─── HERO ─── */
    .hero {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      padding: 100px 5vw 80px;
      overflow: hidden;
    }

    /* Animated grid background */
    .hero-grid {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(0,210,180,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,210,180,0.04) 1px, transparent 1px);
      background-size: 60px 60px;
      mask-image: radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 100%);
      animation: gridDrift 20s ease-in-out infinite alternate;
    }
    @keyframes gridDrift {
      from { transform: translateY(0); }
      to { transform: translateY(-20px); }
    }

    /* Glowing orbs */
    .orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      pointer-events: none;
    }
    .orb-1 {
      width: 500px; height: 500px;
      background: radial-gradient(circle, rgba(0,210,180,0.12) 0%, transparent 70%);
      top: -100px; left: -100px;
      animation: float1 8s ease-in-out infinite;
    }
    .orb-2 {
      width: 400px; height: 400px;
      background: radial-gradient(circle, rgba(0,150,255,0.08) 0%, transparent 70%);
      bottom: 0; right: -50px;
      animation: float2 10s ease-in-out infinite;
    }
    @keyframes float1 {
      0%,100% { transform: translate(0,0); }
      50% { transform: translate(30px, 20px); }
    }
    @keyframes float2 {
      0%,100% { transform: translate(0,0); }
      50% { transform: translate(-20px, -30px); }
    }

    .hero-inner {
      position: relative;
      z-index: 2;
      text-align: center;
      max-width: 800px;
      animation: heroReveal 1s cubic-bezier(0.22,1,0.36,1) both;
    }
    @keyframes heroReveal {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(0,210,180,0.08);
      border: 1px solid rgba(0,210,180,0.25);
      border-radius: 100px;
      padding: 0.35rem 1rem;
      font-size: 0.78rem;
      letter-spacing: 0.12em;
      color: var(--accent);
      margin-bottom: 2rem;
      text-transform: uppercase;
      font-weight: 500;
    }
    .badge-dot {
      width: 6px; height: 6px;
      border-radius: 50%;
      background: var(--accent);
      animation: pulse 2s ease-in-out infinite;
    }
    @keyframes pulse {
      0%,100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(0.7); }
    }

    .hero h1 {
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: clamp(2.8rem, 7vw, 5.5rem);
      line-height: 1.05;
      letter-spacing: -0.02em;
      margin-bottom: 1.5rem;
    }
    .hero h1 .line-accent {
      display: block;
      background: linear-gradient(90deg, var(--accent), #00A8FF);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero-sub {
      font-size: clamp(1rem, 2vw, 1.2rem);
      color: var(--text-muted);
      max-width: 520px;
      margin: 0 auto 2.5rem;
      line-height: 1.7;
      font-weight: 300;
    }

    .hero-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: var(--accent);
      color: #050A0E;
      padding: 0.85rem 2rem;
      border-radius: 6px;
      font-family: 'Syne', sans-serif;
      font-weight: 700;
      font-size: 0.95rem;
      letter-spacing: 0.06em;
      text-decoration: none;
      transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
      box-shadow: 0 0 24px rgba(0,210,180,0.25);
    }
    .btn-primary:hover {
      background: var(--accent2);
      transform: translateY(-2px);
      box-shadow: 0 0 40px rgba(0,210,180,0.4);
    }

    .btn-secondary {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: transparent;
      color: var(--text);
      padding: 0.85rem 2rem;
      border-radius: 6px;
      border: 1px solid var(--border);
      font-family: 'DM Sans', sans-serif;
      font-weight: 400;
      font-size: 0.95rem;
      text-decoration: none;
      transition: border-color 0.2s, background 0.2s, transform 0.15s;
    }
    .btn-secondary:hover {
      border-color: var(--accent);
      background: var(--accent-dim);
      transform: translateY(-2px);
    }

    /* NFC Chip Visual */
    .nfc-visual {
      margin: 3.5rem auto 0;
      width: 180px;
      height: 180px;
      position: relative;
    }
    .nfc-chip {
      width: 100%;
      height: 100%;
      border-radius: 24px;
      background: linear-gradient(135deg, #0C1C26, #14282E);
      border: 1px solid rgba(0,210,180,0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      box-shadow: 0 0 60px rgba(0,210,180,0.15), inset 0 1px 0 rgba(255,255,255,0.05);
    }
    .nfc-chip::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(0,210,180,0.05) 0%, transparent 60%);
    }
    .nfc-icon {
      width: 64px;
      height: 64px;
      color: var(--accent);
      position: relative;
      z-index: 2;
    }
    .nfc-rings {
      position: absolute;
      inset: -30px;
    }
    .ring {
      position: absolute;
      border-radius: 50%;
      border: 1px solid var(--accent);
      opacity: 0;
      animation: ringExpand 3s ease-out infinite;
    }
    .ring:nth-child(1) { inset: 30%; animation-delay: 0s; }
    .ring:nth-child(2) { inset: 15%; animation-delay: 0.8s; }
    .ring:nth-child(3) { inset: 0; animation-delay: 1.6s; }
    @keyframes ringExpand {
      0% { opacity: 0.8; transform: scale(0.6); }
      100% { opacity: 0; transform: scale(1.1); }
    }

    /* ─── STATS BAR ─── */
    .stats-bar {
      position: relative;
      z-index: 2;
      background: var(--surface);
      border-top: 1px solid var(--border);
      border-bottom: 1px solid var(--border);
      padding: 2rem 5vw;
    }
    .stats-inner {
      max-width: 1100px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 2rem;
      text-align: center;
    }
    .stat-item {}
    .stat-number {
      font-family: 'Syne', sans-serif;
      font-size: 2rem;
      font-weight: 800;
      color: var(--accent);
      line-height: 1;
    }
    .stat-label {
      font-size: 0.82rem;
      color: var(--text-muted);
      margin-top: 0.3rem;
      letter-spacing: 0.04em;
    }

    /* ─── SECTION SHARED ─── */
    section {
      position: relative;
      z-index: 2;
      padding: 100px 5vw;
    }
    .section-label {
      display: inline-block;
      font-size: 0.72rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--accent);
      margin-bottom: 1rem;
      font-weight: 600;
    }
    .section-title {
      font-family: 'Syne', sans-serif;
      font-size: clamp(1.8rem, 4vw, 3rem);
      font-weight: 800;
      line-height: 1.1;
      letter-spacing: -0.02em;
      margin-bottom: 1.2rem;
    }
    .section-sub {
      font-size: 1.05rem;
      color: var(--text-muted);
      max-width: 520px;
      line-height: 1.7;
      font-weight: 300;
    }
    .section-header {
      margin-bottom: 4rem;
    }

    /* ─── HOW IT WORKS ─── */
    .how-it-works { background: var(--surface); }
    .steps-grid {
      max-width: 1100px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 2px;
      border: 1px solid var(--border);
      border-radius: 16px;
      overflow: hidden;
    }
    .step-card {
      background: var(--bg);
      padding: 2.5rem 2rem;
      position: relative;
      transition: background 0.3s;
    }
    .step-card:hover { background: var(--surface2); }
    .step-num {
      font-family: 'Syne', sans-serif;
      font-size: 3.5rem;
      font-weight: 800;
      color: var(--accent-dim);
      line-height: 1;
      margin-bottom: 1.5rem;
      border: 2px solid var(--border);
      border-radius: 12px;
      width: 70px; height: 70px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.8rem;
      color: var(--accent);
    }
    .step-title {
      font-family: 'Syne', sans-serif;
      font-size: 1.1rem;
      font-weight: 700;
      margin-bottom: 0.7rem;
    }
    .step-desc {
      font-size: 0.9rem;
      color: var(--text-muted);
      line-height: 1.7;
    }

    /* ─── FEATURES ─── */
    .features-grid {
      max-width: 1100px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5px;
    }
    .feat-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 2rem;
      transition: transform 0.25s, border-color 0.25s, box-shadow 0.25s;
      position: relative;
      overflow: hidden;
    }
    .feat-card::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(0,210,180,0.04) 0%, transparent 60%);
      opacity: 0;
      transition: opacity 0.3s;
    }
    .feat-card:hover { transform: translateY(-4px); border-color: rgba(0,210,180,0.3); box-shadow: 0 12px 40px rgba(0,0,0,0.3); }
    .feat-card:hover::before { opacity: 1; }
    .feat-icon {
      width: 48px; height: 48px;
      border-radius: 10px;
      background: var(--accent-dim);
      border: 1px solid rgba(0,210,180,0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.2rem;
      font-size: 1.4rem;
    }
    .feat-title {
      font-family: 'Syne', sans-serif;
      font-size: 1.05rem;
      font-weight: 700;
      margin-bottom: 0.6rem;
    }
    .feat-desc {
      font-size: 0.88rem;
      color: var(--text-muted);
      line-height: 1.7;
    }

    /* ─── USE CASES ─── */
    .use-cases { background: var(--surface); }
    .usecase-list {
      max-width: 1100px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }
    .usecase-item {
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 1.5rem;
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      transition: border-color 0.2s, transform 0.2s;
    }
    .usecase-item:hover { border-color: rgba(0,210,180,0.3); transform: translateY(-2px); }
    .usecase-icon { font-size: 1.6rem; line-height: 1; flex-shrink: 0; }
    .usecase-label {
      font-family: 'Syne', sans-serif;
      font-size: 0.95rem;
      font-weight: 600;
      color: var(--text);
    }
    .usecase-sub { font-size: 0.8rem; color: var(--text-muted); margin-top: 0.25rem; }

    /* ─── CTA SECTION ─── */
    .cta-section {
      text-align: center;
      background: linear-gradient(180deg, var(--bg) 0%, #051018 100%);
    }
    .cta-box {
      max-width: 700px;
      margin: 0 auto;
      padding: 4rem;
      background: var(--surface);
      border: 1px solid rgba(0,210,180,0.2);
      border-radius: 20px;
      position: relative;
      overflow: hidden;
    }
    .cta-box::before {
      content: '';
      position: absolute;
      top: -100px; left: 50%;
      transform: translateX(-50%);
      width: 400px; height: 400px;
      background: radial-gradient(circle, rgba(0,210,180,0.08) 0%, transparent 70%);
      pointer-events: none;
    }
    .cta-box .section-title { font-size: 2rem; }
    .cta-box p {
      color: var(--text-muted);
      margin-bottom: 2rem;
      font-weight: 300;
    }

    /* ─── FOOTER ─── */
    footer {
      position: relative;
      z-index: 2;
      border-top: 1px solid var(--border);
      padding: 3rem 5vw;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 1rem;
      background: var(--surface);
    }
    .footer-logo {
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: 1.3rem;
      letter-spacing: 0.1em;
      color: var(--accent);
      text-decoration: none;
    }
    .footer-copy {
      font-size: 0.8rem;
      color: var(--text-dim);
    }
    .footer-links {
      display: flex;
      gap: 1.5rem;
    }
    .footer-links a {
      font-size: 0.82rem;
      color: var(--text-muted);
      text-decoration: none;
      transition: color 0.2s;
    }
    .footer-links a:hover { color: var(--accent); }

    /* ─── RESPONSIVE ─── */
    @media (max-width: 640px) {
      .nav-links { display: none; }
      .hero-actions { flex-direction: column; align-items: center; }
      .cta-box { padding: 2.5rem 1.5rem; }
      footer { flex-direction: column; text-align: center; }
    }

    /* ─── FADE-IN ANIMATION ─── */
    .fade-in {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.7s ease, transform 0.7s ease;
    }
    .fade-in.visible {
      opacity: 1;
      transform: none;
    }
  </style>
</head>
<body>

<!-- NAV -->
<nav>
  <a href="/" class="logo">BETAG</a>
  <ul class="nav-links">
    <li><a href="#how-it-works" data-i18n="nav.how">How It Works</a></li>
    <li><a href="#features" data-i18n="nav.features">Features</a></li>
    <li><a href="#use-cases" data-i18n="nav.usecases">Use Cases</a></li>
    <li><a href="/verify" class="nav-cta" data-i18n="nav.verify">Verify Label</a></li>
  </ul>
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
</nav>

<!-- HERO -->
<section class="hero">
  <div class="hero-grid"></div>
  <div class="orb orb-1"></div>
  <div class="orb orb-2"></div>
  <div class="hero-inner">
    <div class="hero-badge">
      <span class="badge-dot"></span>
      <span data-i18n="hero.badge">NFC-Powered Authentication</span>
    </div>
    <h1>
      <span data-i18n="hero.title1">Protect Your Brand.</span>
      <span class="line-accent" data-i18n="hero.title2">Eliminate Fakes.</span>
    </h1>
    <p class="hero-sub" data-i18n="hero.subtitle">
      BETAG's intelligent NFC labels let customers verify product authenticity instantly — stopping counterfeiters before they destroy your brand.
    </p>
    <div class="hero-actions">
      <a href="#contact" class="btn-primary">
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor"/></svg>
        <span data-i18n="hero.cta1">Get Started</span>
      </a>
      <a href="/verify" class="btn-secondary">
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" fill="currentColor"/></svg>
        <span data-i18n="hero.cta2">Verify a Label</span>
      </a>
    </div>
    <!-- NFC CHIP VISUAL -->
    <div class="nfc-visual">
      <div class="nfc-chip">
        <div class="nfc-rings">
          <div class="ring"></div>
          <div class="ring"></div>
          <div class="ring"></div>
        </div>
        <svg class="nfc-icon" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="16" width="48" height="32" rx="6" stroke="currentColor" stroke-width="2"/>
          <path d="M22 24v16M22 24l14 16M36 24v16" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="46" cy="32" r="5" stroke="currentColor" stroke-width="2"/>
          <circle cx="46" cy="32" r="2" fill="currentColor"/>
        </svg>
      </div>
    </div>
  </div>
</section>

<!-- STATS BAR -->
<div class="stats-bar">
  <div class="stats-inner">
    <div class="stat-item fade-in">
      <div class="stat-number">2.5T+</div>
      <div class="stat-label" data-i18n="stats.s1">Counterfeit goods market (USD)</div>
    </div>
    <div class="stat-item fade-in">
      <div class="stat-number">0.3s</div>
      <div class="stat-label" data-i18n="stats.s2">NFC tap-to-verify speed</div>
    </div>
    <div class="stat-item fade-in">
      <div class="stat-number">256-bit</div>
      <div class="stat-label" data-i18n="stats.s3">AES Encrypted chip data</div>
    </div>
    <div class="stat-item fade-in">
      <div class="stat-number">99.98%</div>
      <div class="stat-label" data-i18n="stats.s4">Detection accuracy rate</div>
    </div>
  </div>
</div>

<!-- HOW IT WORKS -->
<section class="how-it-works" id="how-it-works">
  <div style="max-width:1100px;margin:0 auto;">
    <div class="section-header fade-in">
      <span class="section-label" data-i18n="how.label">Process</span>
      <h2 class="section-title" data-i18n="how.title">How BETAG Works</h2>
      <p class="section-sub" data-i18n="how.sub">From label production to instant consumer verification — a seamless chain of trust.</p>
    </div>
    <div class="steps-grid">
      <div class="step-card fade-in">
        <div class="step-num">01</div>
        <div class="step-title" data-i18n="how.s1t">Label Encoding</div>
        <p class="step-desc" data-i18n="how.s1d">Each NFC chip is programmed with a unique, cryptographically-signed identifier and registered to your product.</p>
      </div>
      <div class="step-card fade-in">
        <div class="step-num">02</div>
        <div class="step-title" data-i18n="how.s2t">Product Application</div>
        <p class="step-desc" data-i18n="how.s2d">BETAG labels are applied to your products — tamper-evident and impossible to transfer without destruction.</p>
      </div>
      <div class="step-card fade-in">
        <div class="step-num">03</div>
        <div class="step-title" data-i18n="how.s3t">Consumer Tap</div>
        <p class="step-desc" data-i18n="how.s3d">A consumer taps any NFC-enabled smartphone to the label — no app required. Native browser verification launches instantly.</p>
      </div>
      <div class="step-card fade-in">
        <div class="step-num">04</div>
        <div class="step-title" data-i18n="how.s4t">Instant Result</div>
        <p class="step-desc" data-i18n="how.s4d">Our database validates the ID in real-time. Authentic or counterfeit — the consumer knows immediately with full product details.</p>
      </div>
    </div>
  </div>
</section>

<!-- FEATURES -->
<section id="features">
  <div style="max-width:1100px;margin:0 auto;">
    <div class="section-header fade-in">
      <span class="section-label" data-i18n="feat.label">Capabilities</span>
      <h2 class="section-title" data-i18n="feat.title">Built for Brands That Can't Afford Fakes</h2>
      <p class="section-sub" data-i18n="feat.sub">Every feature is engineered around one goal: making counterfeiting economically pointless.</p>
    </div>
    <div class="features-grid">
      <div class="feat-card fade-in">
        <div class="feat-icon">🔐</div>
        <div class="feat-title" data-i18n="feat.f1t">Cryptographic Security</div>
        <p class="feat-desc" data-i18n="feat.f1d">Each label contains a unique signed token — cloning the chip yields an invalid signature, detectable immediately.</p>
      </div>
      <div class="feat-card fade-in">
        <div class="feat-icon">📡</div>
        <div class="feat-title" data-i18n="feat.f2t">No App Required</div>
        <p class="feat-desc" data-i18n="feat.f2d">Works natively on iOS and Android via NFC. Consumers verify with a single tap — zero friction, zero downloads.</p>
      </div>
      <div class="feat-card fade-in">
        <div class="feat-icon">📊</div>
        <div class="feat-title" data-i18n="feat.f3t">Real-Time Analytics</div>
        <p class="feat-desc" data-i18n="feat.f3d">See where, when, and how often your labels are scanned. Detect unusual patterns that signal distribution leakage.</p>
      </div>
      <div class="feat-card fade-in">
        <div class="feat-icon">🏷️</div>
        <div class="feat-title" data-i18n="feat.f4t">Tamper Evident</div>
        <p class="feat-desc" data-i18n="feat.f4d">Physical tamper-evident construction ensures labels can't be peeled and reapplied without visible destruction.</p>
      </div>
      <div class="feat-card fade-in">
        <div class="feat-icon">🌐</div>
        <div class="feat-title" data-i18n="feat.f5t">Global Database</div>
        <p class="feat-desc" data-i18n="feat.f5d">Redundant, globally-distributed database ensures verification works instantly anywhere in the world.</p>
      </div>
      <div class="feat-card fade-in">
        <div class="feat-icon">⚙️</div>
        <div class="feat-title" data-i18n="feat.f6t">Custom Branding</div>
        <p class="feat-desc" data-i18n="feat.f6d">Labels are fully customizable to match your brand identity — size, shape, color, and printed design.</p>
      </div>
    </div>
  </div>
</section>

<!-- USE CASES -->
<section class="use-cases" id="use-cases">
  <div style="max-width:1100px;margin:0 auto;">
    <div class="section-header fade-in">
      <span class="section-label" data-i18n="uc.label">Industries</span>
      <h2 class="section-title" data-i18n="uc.title">Who Uses BETAG?</h2>
      <p class="section-sub" data-i18n="uc.sub">From luxury fashion to pharmaceuticals — any product that can be counterfeited should be protected.</p>
    </div>
    <div class="usecase-list">
      <div class="usecase-item fade-in">
        <span class="usecase-icon">👗</span>
        <div>
          <div class="usecase-label" data-i18n="uc.u1">Fashion & Apparel</div>
          <div class="usecase-sub" data-i18n="uc.u1s">Luxury goods, streetwear</div>
        </div>
      </div>
      <div class="usecase-item fade-in">
        <span class="usecase-icon">💊</span>
        <div>
          <div class="usecase-label" data-i18n="uc.u2">Pharmaceuticals</div>
          <div class="usecase-sub" data-i18n="uc.u2s">Medicine, supplements</div>
        </div>
      </div>
      <div class="usecase-item fade-in">
        <span class="usecase-icon">🍷</span>
        <div>
          <div class="usecase-label" data-i18n="uc.u3">Food & Beverage</div>
          <div class="usecase-sub" data-i18n="uc.u3s">Premium wines, spirits</div>
        </div>
      </div>
      <div class="usecase-item fade-in">
        <span class="usecase-icon">⌚</span>
        <div>
          <div class="usecase-label" data-i18n="uc.u4">Luxury Accessories</div>
          <div class="usecase-sub" data-i18n="uc.u4s">Watches, jewelry</div>
        </div>
      </div>
      <div class="usecase-item fade-in">
        <span class="usecase-icon">🔧</span>
        <div>
          <div class="usecase-label" data-i18n="uc.u5">Industrial Parts</div>
          <div class="usecase-sub" data-i18n="uc.u5s">Auto, aviation components</div>
        </div>
      </div>
      <div class="usecase-item fade-in">
        <span class="usecase-icon">🎮</span>
        <div>
          <div class="usecase-label" data-i18n="uc.u6">Electronics</div>
          <div class="usecase-sub" data-i18n="uc.u6s">Gadgets, accessories</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="cta-section" id="contact">
  <div class="cta-box fade-in">
    <span class="section-label" data-i18n="cta.label">Get Protected</span>
    <h2 class="section-title" data-i18n="cta.title">Ready to Eliminate Counterfeits?</h2>
    <p data-i18n="cta.sub">Talk to our team about protecting your products with BETAG's NFC anti-counterfeiting system.</p>
    <a href="mailto:hello@betag.id" class="btn-primary">
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor"/></svg>
      <span data-i18n="cta.btn">Contact Us</span>
    </a>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <a href="/" class="footer-logo">BETAG</a>
  <div class="footer-links">
    <a href="/verify" data-i18n="footer.verify">Verify Label</a>
    <a href="mailto:hello@betag.id" data-i18n="footer.contact">Contact</a>
    <a href="#" data-i18n="footer.privacy">Privacy Policy</a>
  </div>
  <p class="footer-copy" data-i18n="footer.copy">© 2025 BETAG. All rights reserved.</p>
</footer>

<script>
// ─── TRANSLATIONS ───
const i18n = {
  en: {
    "nav.how": "How It Works",
    "nav.features": "Features",
    "nav.usecases": "Use Cases",
    "nav.verify": "Verify Label",
    "hero.badge": "NFC-Powered Authentication",
    "hero.title1": "Protect Your Brand.",
    "hero.title2": "Eliminate Fakes.",
    "hero.subtitle": "BETAG's intelligent NFC labels let customers verify product authenticity instantly — stopping counterfeiters before they destroy your brand.",
    "hero.cta1": "Get Started",
    "hero.cta2": "Verify a Label",
    "stats.s1": "Counterfeit goods market (USD)",
    "stats.s2": "NFC tap-to-verify speed",
    "stats.s3": "AES Encrypted chip data",
    "stats.s4": "Detection accuracy rate",
    "how.label": "Process",
    "how.title": "How BETAG Works",
    "how.sub": "From label production to instant consumer verification — a seamless chain of trust.",
    "how.s1t": "Label Encoding",
    "how.s1d": "Each NFC chip is programmed with a unique, cryptographically-signed identifier and registered to your product.",
    "how.s2t": "Product Application",
    "how.s2d": "BETAG labels are applied to your products — tamper-evident and impossible to transfer without destruction.",
    "how.s3t": "Consumer Tap",
    "how.s3d": "A consumer taps any NFC-enabled smartphone to the label — no app required. Native browser verification launches instantly.",
    "how.s4t": "Instant Result",
    "how.s4d": "Our database validates the ID in real-time. Authentic or counterfeit — the consumer knows immediately with full product details.",
    "feat.label": "Capabilities",
    "feat.title": "Built for Brands That Can't Afford Fakes",
    "feat.sub": "Every feature is engineered around one goal: making counterfeiting economically pointless.",
    "feat.f1t": "Cryptographic Security",
    "feat.f1d": "Each label contains a unique signed token — cloning the chip yields an invalid signature, detectable immediately.",
    "feat.f2t": "No App Required",
    "feat.f2d": "Works natively on iOS and Android via NFC. Consumers verify with a single tap — zero friction, zero downloads.",
    "feat.f3t": "Real-Time Analytics",
    "feat.f3d": "See where, when, and how often your labels are scanned. Detect unusual patterns that signal distribution leakage.",
    "feat.f4t": "Tamper Evident",
    "feat.f4d": "Physical tamper-evident construction ensures labels can't be peeled and reapplied without visible destruction.",
    "feat.f5t": "Global Database",
    "feat.f5d": "Redundant, globally-distributed database ensures verification works instantly anywhere in the world.",
    "feat.f6t": "Custom Branding",
    "feat.f6d": "Labels are fully customizable to match your brand identity — size, shape, color, and printed design.",
    "uc.label": "Industries",
    "uc.title": "Who Uses BETAG?",
    "uc.sub": "From luxury fashion to pharmaceuticals — any product that can be counterfeited should be protected.",
    "uc.u1": "Fashion & Apparel", "uc.u1s": "Luxury goods, streetwear",
    "uc.u2": "Pharmaceuticals", "uc.u2s": "Medicine, supplements",
    "uc.u3": "Food & Beverage", "uc.u3s": "Premium wines, spirits",
    "uc.u4": "Luxury Accessories", "uc.u4s": "Watches, jewelry",
    "uc.u5": "Industrial Parts", "uc.u5s": "Auto, aviation components",
    "uc.u6": "Electronics", "uc.u6s": "Gadgets, accessories",
    "cta.label": "Get Protected",
    "cta.title": "Ready to Eliminate Counterfeits?",
    "cta.sub": "Talk to our team about protecting your products with BETAG's NFC anti-counterfeiting system.",
    "cta.btn": "Contact Us",
    "footer.verify": "Verify Label",
    "footer.contact": "Contact",
    "footer.privacy": "Privacy Policy",
    "footer.copy": "© 2025 BETAG. All rights reserved.",
  },
  id: {
    "nav.how": "Cara Kerja",
    "nav.features": "Fitur",
    "nav.usecases": "Kasus Penggunaan",
    "nav.verify": "Verifikasi Label",
    "hero.badge": "Autentikasi Berbasis NFC",
    "hero.title1": "Lindungi Merekmu.",
    "hero.title2": "Basmi Pemalsuan.",
    "hero.subtitle": "Label NFC cerdas BETAG memungkinkan pelanggan memverifikasi keaslian produk secara instan — menghentikan pemalsu sebelum merusak merek Anda.",
    "hero.cta1": "Mulai Sekarang",
    "hero.cta2": "Verifikasi Label",
    "stats.s1": "Pasar barang palsu (USD)",
    "stats.s2": "Kecepatan verifikasi NFC",
    "stats.s3": "Data chip terenkripsi AES",
    "stats.s4": "Tingkat akurasi deteksi",
    "how.label": "Proses",
    "how.title": "Cara Kerja BETAG",
    "how.sub": "Dari produksi label hingga verifikasi konsumen instan — rantai kepercayaan yang mulus.",
    "how.s1t": "Enkoding Label",
    "how.s1d": "Setiap chip NFC diprogram dengan pengenal unik yang ditandatangani secara kriptografis dan didaftarkan ke produk Anda.",
    "how.s2t": "Pemasangan Produk",
    "how.s2d": "Label BETAG dipasang pada produk Anda — tahan pembukaan dan tidak bisa dipindahkan tanpa kerusakan.",
    "how.s3t": "Ketukan Konsumen",
    "how.s3d": "Konsumen mengetuk smartphone NFC ke label — tanpa aplikasi. Verifikasi browser langsung berjalan.",
    "how.s4t": "Hasil Instan",
    "how.s4d": "Database kami memvalidasi ID secara real-time. Asli atau palsu — konsumen langsung mengetahuinya.",
    "feat.label": "Kemampuan",
    "feat.title": "Dibangun untuk Merek yang Tak Bisa Mentolerir Pemalsuan",
    "feat.sub": "Setiap fitur dirancang dengan satu tujuan: membuat pemalsuan tidak menguntungkan secara ekonomi.",
    "feat.f1t": "Keamanan Kriptografi",
    "feat.f1d": "Setiap label berisi token bertanda tangan unik — mengkloning chip menghasilkan tanda tangan tidak valid.",
    "feat.f2t": "Tanpa Aplikasi",
    "feat.f2d": "Bekerja secara native di iOS dan Android via NFC. Konsumen verifikasi dengan satu ketukan.",
    "feat.f3t": "Analitik Real-Time",
    "feat.f3d": "Lihat di mana, kapan, dan seberapa sering label Anda dipindai. Deteksi pola mencurigakan.",
    "feat.f4t": "Tahan Pembukaan",
    "feat.f4d": "Konstruksi fisik tahan pembukaan memastikan label tidak bisa dilepas dan dipasang ulang.",
    "feat.f5t": "Database Global",
    "feat.f5d": "Database terdistribusi global yang redundan memastikan verifikasi bekerja di seluruh dunia.",
    "feat.f6t": "Branding Kustom",
    "feat.f6d": "Label sepenuhnya dapat dikustomisasi sesuai identitas merek Anda.",
    "uc.label": "Industri",
    "uc.title": "Siapa Pengguna BETAG?",
    "uc.sub": "Dari fashion mewah hingga farmasi — produk apa pun yang bisa dipalsukan harus dilindungi.",
    "uc.u1": "Mode & Pakaian", "uc.u1s": "Barang mewah, streetwear",
    "uc.u2": "Farmasi", "uc.u2s": "Obat, suplemen",
    "uc.u3": "Makanan & Minuman", "uc.u3s": "Anggur premium, minuman keras",
    "uc.u4": "Aksesori Mewah", "uc.u4s": "Jam tangan, perhiasan",
    "uc.u5": "Suku Cadang Industri", "uc.u5s": "Komponen otomotif, penerbangan",
    "uc.u6": "Elektronik", "uc.u6s": "Gadget, aksesori",
    "cta.label": "Dapatkan Perlindungan",
    "cta.title": "Siap Membasmi Pemalsuan?",
    "cta.sub": "Hubungi tim kami tentang perlindungan produk Anda dengan sistem anti-pemalsuan NFC BETAG.",
    "cta.btn": "Hubungi Kami",
    "footer.verify": "Verifikasi Label",
    "footer.contact": "Kontak",
    "footer.privacy": "Kebijakan Privasi",
    "footer.copy": "© 2025 BETAG. Semua hak dilindungi.",
  },
  zh: {
    "nav.how": "工作原理",
    "nav.features": "功能特点",
    "nav.usecases": "应用场景",
    "nav.verify": "验证标签",
    "hero.badge": "NFC 驱动的身份验证",
    "hero.title1": "保护您的品牌。",
    "hero.title2": "杜绝假冒伪劣。",
    "hero.subtitle": "BETAG 智能 NFC 标签让消费者即时验证产品真伪——在假冒者破坏您的品牌之前将其阻止。",
    "hero.cta1": "立即开始",
    "hero.cta2": "验证标签",
    "stats.s1": "假冒商品市场（美元）",
    "stats.s2": "NFC 点击验证速度",
    "stats.s3": "AES 加密芯片数据",
    "stats.s4": "检测准确率",
    "how.label": "流程",
    "how.title": "BETAG 如何工作",
    "how.sub": "从标签生产到即时消费者验证——无缝的信任链。",
    "how.s1t": "标签编码",
    "how.s1d": "每个 NFC 芯片都被编程了唯一的加密签名标识符，并注册到您的产品。",
    "how.s2t": "产品应用",
    "how.s2d": "BETAG 标签贴于您的产品上——防篡改，无法在不破坏的情况下转移。",
    "how.s3t": "消费者点击",
    "how.s3d": "消费者用任何支持 NFC 的智能手机点击标签——无需应用，即时验证。",
    "how.s4t": "即时结果",
    "how.s4d": "我们的数据库实时验证 ID。真品还是假货——消费者立即知道。",
    "feat.label": "功能",
    "feat.title": "专为不能容忍假冒的品牌而建",
    "feat.sub": "每个功能都围绕一个目标设计：使假冒在经济上毫无意义。",
    "feat.f1t": "密码学安全",
    "feat.f1d": "每个标签包含唯一签名令牌——克隆芯片会产生无效签名，立即可检测。",
    "feat.f2t": "无需应用",
    "feat.f2d": "通过 NFC 在 iOS 和 Android 上原生运行。消费者一键验证，零摩擦。",
    "feat.f3t": "实时分析",
    "feat.f3d": "查看标签被扫描的时间、地点和频率。检测异常模式。",
    "feat.f4t": "防篡改",
    "feat.f4d": "物理防篡改设计确保标签无法被揭下并重新贴上。",
    "feat.f5t": "全球数据库",
    "feat.f5d": "冗余的全球分布式数据库确保验证在全球任何地方即时运行。",
    "feat.f6t": "自定义品牌",
    "feat.f6d": "标签完全可定制以匹配您的品牌形象。",
    "uc.label": "行业",
    "uc.title": "谁在使用 BETAG？",
    "uc.sub": "从奢侈时装到制药——任何可能被假冒的产品都应该受到保护。",
    "uc.u1": "时尚与服装", "uc.u1s": "奢侈品、街头服饰",
    "uc.u2": "制药", "uc.u2s": "药品、补充剂",
    "uc.u3": "食品与饮料", "uc.u3s": "高档葡萄酒、烈酒",
    "uc.u4": "奢侈配件", "uc.u4s": "手表、珠宝",
    "uc.u5": "工业零件", "uc.u5s": "汽车、航空组件",
    "uc.u6": "电子产品", "uc.u6s": "小工具、配件",
    "cta.label": "获得保护",
    "cta.title": "准备好杜绝假冒了吗？",
    "cta.sub": "与我们的团队联系，了解如何使用 BETAG 的 NFC 防伪系统保护您的产品。",
    "cta.btn": "联系我们",
    "footer.verify": "验证标签",
    "footer.contact": "联系方式",
    "footer.privacy": "隐私政策",
    "footer.copy": "© 2025 BETAG。保留所有权利。",
  },
  ar: {
    "nav.how": "كيف يعمل",
    "nav.features": "الميزات",
    "nav.usecases": "حالات الاستخدام",
    "nav.verify": "التحقق من الملصق",
    "hero.badge": "مصادقة بتقنية NFC",
    "hero.title1": "احمِ علامتك التجارية.",
    "hero.title2": "أزل المنتجات المزيفة.",
    "hero.subtitle": "ملصقات BETAG الذكية بتقنية NFC تتيح للعملاء التحقق من أصالة المنتج فوراً — وإيقاف المزيفين قبل أن يدمروا علامتك التجارية.",
    "hero.cta1": "ابدأ الآن",
    "hero.cta2": "تحقق من ملصق",
    "stats.s1": "سوق السلع المزيفة (دولار)",
    "stats.s2": "سرعة التحقق عبر NFC",
    "stats.s3": "بيانات الشريحة مشفرة AES",
    "stats.s4": "معدل دقة الكشف",
    "how.label": "العملية",
    "how.title": "كيف يعمل BETAG",
    "how.sub": "من إنتاج الملصق إلى التحقق الفوري للمستهلك — سلسلة ثقة سلسة.",
    "how.s1t": "ترميز الملصق",
    "how.s1d": "تتم برمجة كل شريحة NFC بمعرّف فريد موقّع تشفيرياً ومسجّل لمنتجك.",
    "how.s2t": "تطبيق المنتج",
    "how.s2d": "تُلصق ملصقات BETAG على منتجاتك — مقاومة للتلاعب ويستحيل نقلها دون تدمير.",
    "how.s3t": "نقرة المستهلك",
    "how.s3d": "ينقر المستهلك بأي هاتف ذكي يدعم NFC على الملصق — دون تطبيق. التحقق عبر المتصفح يبدأ فوراً.",
    "how.s4t": "نتيجة فورية",
    "how.s4d": "تتحقق قاعدة بياناتنا من المعرّف في الوقت الحقيقي. أصلي أم مزيف — يعرف المستهلك فوراً.",
    "feat.label": "القدرات",
    "feat.title": "مصمم للعلامات التجارية التي لا تتحمل التزوير",
    "feat.sub": "كل ميزة مصممة حول هدف واحد: جعل التزوير غير مجدٍ اقتصادياً.",
    "feat.f1t": "أمان تشفيري",
    "feat.f1d": "يحتوي كل ملصق على رمز موقّع فريد — استنساخ الشريحة ينتج توقيعاً غير صالح.",
    "feat.f2t": "لا يلزم تطبيق",
    "feat.f2d": "يعمل بشكل أصلي على iOS وAndroid عبر NFC. يتحقق المستهلكون بنقرة واحدة.",
    "feat.f3t": "تحليلات في الوقت الحقيقي",
    "feat.f3d": "اعرف أين ومتى وكم مرة يتم مسح ملصقاتك. اكشف الأنماط غير العادية.",
    "feat.f4t": "مقاوم للتلاعب",
    "feat.f4d": "التصميم الفيزيائي المقاوم للتلاعب يضمن عدم إمكانية إزالة الملصقات وإعادة تطبيقها.",
    "feat.f5t": "قاعدة بيانات عالمية",
    "feat.f5d": "قاعدة بيانات موزعة عالمياً تضمن عمل التحقق فوراً في أي مكان.",
    "feat.f6t": "علامة تجارية مخصصة",
    "feat.f6d": "الملصقات قابلة للتخصيص الكامل لتتناسب مع هوية علامتك التجارية.",
    "uc.label": "الصناعات",
    "uc.title": "من يستخدم BETAG؟",
    "uc.sub": "من الأزياء الفاخرة إلى الأدوية — أي منتج يمكن تزويره يجب حمايته.",
    "uc.u1": "الأزياء والملابس", "uc.u1s": "السلع الفاخرة، الملابس الشبابية",
    "uc.u2": "الصيدلانيات", "uc.u2s": "الأدوية والمكملات",
    "uc.u3": "الأغذية والمشروبات", "uc.u3s": "النبيذ الفاخر، المشروبات الكحولية",
    "uc.u4": "الإكسسوارات الفاخرة", "uc.u4s": "الساعات، المجوهرات",
    "uc.u5": "القطع الصناعية", "uc.u5s": "مكونات السيارات، الطيران",
    "uc.u6": "الإلكترونيات", "uc.u6s": "الأجهزة، الملحقات",
    "cta.label": "احصل على الحماية",
    "cta.title": "مستعد للقضاء على التزوير؟",
    "cta.sub": "تحدث إلى فريقنا حول حماية منتجاتك بنظام BETAG لمكافحة التزوير عبر NFC.",
    "cta.btn": "تواصل معنا",
    "footer.verify": "تحقق من الملصق",
    "footer.contact": "تواصل",
    "footer.privacy": "سياسة الخصوصية",
    "footer.copy": "© 2025 BETAG. جميع الحقوق محفوظة.",
  },
  fr: {
    "nav.how": "Comment ça marche",
    "nav.features": "Fonctionnalités",
    "nav.usecases": "Cas d'usage",
    "nav.verify": "Vérifier l'étiquette",
    "hero.badge": "Authentification par NFC",
    "hero.title1": "Protégez votre marque.",
    "hero.title2": "Éliminez les contrefaçons.",
    "hero.subtitle": "Les étiquettes NFC intelligentes de BETAG permettent aux clients de vérifier instantanément l'authenticité des produits — stoppant les contrefacteurs avant qu'ils ne détruisent votre marque.",
    "hero.cta1": "Commencer",
    "hero.cta2": "Vérifier une étiquette",
    "stats.s1": "Marché des contrefaçons (USD)",
    "stats.s2": "Vitesse de vérification NFC",
    "stats.s3": "Données chiffréess AES",
    "stats.s4": "Taux de détection précis",
    "how.label": "Processus",
    "how.title": "Comment fonctionne BETAG",
    "how.sub": "De la production de l'étiquette à la vérification instantanée du consommateur — une chaîne de confiance transparente.",
    "how.s1t": "Encodage de l'étiquette",
    "how.s1d": "Chaque puce NFC est programmée avec un identifiant unique signé cryptographiquement et enregistré à votre produit.",
    "how.s2t": "Application du produit",
    "how.s2d": "Les étiquettes BETAG sont appliquées sur vos produits — inviolables et impossibles à transférer sans destruction.",
    "how.s3t": "Tap du consommateur",
    "how.s3d": "Le consommateur touche l'étiquette avec un smartphone NFC — sans application. La vérification via navigateur se lance instantanément.",
    "how.s4t": "Résultat instantané",
    "how.s4d": "Notre base de données valide l'ID en temps réel. Authentique ou contrefait — le consommateur le sait immédiatement.",
    "feat.label": "Capacités",
    "feat.title": "Conçu pour les marques qui ne peuvent se permettre les faux",
    "feat.sub": "Chaque fonctionnalité est conçue autour d'un seul objectif : rendre la contrefaçon économiquement inutile.",
    "feat.f1t": "Sécurité cryptographique",
    "feat.f1d": "Chaque étiquette contient un jeton signé unique — cloner la puce produit une signature invalide.",
    "feat.f2t": "Sans application",
    "feat.f2d": "Fonctionne nativement sur iOS et Android via NFC. Les consommateurs vérifient d'un simple tap.",
    "feat.f3t": "Analytique en temps réel",
    "feat.f3d": "Voyez où, quand et combien de fois vos étiquettes sont scannées. Détectez les anomalies.",
    "feat.f4t": "Inviolable",
    "feat.f4d": "La construction inviolable garantit que les étiquettes ne peuvent être décollées et recollées.",
    "feat.f5t": "Base de données mondiale",
    "feat.f5d": "Une base de données mondiale redondante garantit une vérification instantanée partout dans le monde.",
    "feat.f6t": "Personnalisation",
    "feat.f6d": "Les étiquettes sont entièrement personnalisables pour correspondre à l'identité de votre marque.",
    "uc.label": "Industries",
    "uc.title": "Qui utilise BETAG ?",
    "uc.sub": "De la mode de luxe aux pharmaceutiques — tout produit pouvant être contrefait doit être protégé.",
    "uc.u1": "Mode & Prêt-à-porter", "uc.u1s": "Luxe, streetwear",
    "uc.u2": "Pharmaceutique", "uc.u2s": "Médicaments, compléments",
    "uc.u3": "Alimentation & Boissons", "uc.u3s": "Vins, spiritueux haut de gamme",
    "uc.u4": "Accessoires de luxe", "uc.u4s": "Montres, bijoux",
    "uc.u5": "Pièces industrielles", "uc.u5s": "Composants auto, aviation",
    "uc.u6": "Électronique", "uc.u6s": "Gadgets, accessoires",
    "cta.label": "Se protéger",
    "cta.title": "Prêt à éliminer les contrefaçons ?",
    "cta.sub": "Parlez à notre équipe de la protection de vos produits avec le système anti-contrefaçon NFC de BETAG.",
    "cta.btn": "Nous contacter",
    "footer.verify": "Vérifier l'étiquette",
    "footer.contact": "Contact",
    "footer.privacy": "Politique de confidentialité",
    "footer.copy": "© 2025 BETAG. Tous droits réservés.",
  }
};

const langMeta = {
  en: { flag: '🇺🇸', code: 'EN' },
  id: { flag: '🇮🇩', code: 'ID' },
  zh: { flag: '🇨🇳', code: '中' },
  ar: { flag: '🇸🇦', code: 'AR' },
  fr: { flag: '🇫🇷', code: 'FR' },
};

let currentLang = localStorage.getItem('betag_lang') || 'en';

function applyLang(lang) {
  if (!i18n[lang]) return;
  currentLang = lang;
  localStorage.setItem('betag_lang', lang);

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

function setLang(lang) {
  applyLang(lang);
  document.getElementById('langDropdown').classList.remove('open');
}

function toggleLang() {
  document.getElementById('langDropdown').classList.toggle('open');
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('.lang-selector')) {
    document.getElementById('langDropdown').classList.remove('open');
  }
});

// ─── INTERSECTION OBSERVER for fade-in ───
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.15 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Init
applyLang(currentLang);
</script>
</body>
</html>`;
}
