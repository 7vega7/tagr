// TAGR Shared UI Components & Utilities

export const CURRENCIES = {
  IDR: { symbol: 'Rp', name: 'Indonesian Rupiah', rate: 1 },
  USD: { symbol: '$', name: 'US Dollar', rate: 0.000063 },
  EUR: { symbol: '€', name: 'Euro', rate: 0.000058 },
  MYR: { symbol: 'RM', name: 'Malaysian Ringgit', rate: 0.00029 },
  SGD: { symbol: 'S$', name: 'Singapore Dollar', rate: 0.000084 },
  PHP: { symbol: '₱', name: 'Philippine Peso', rate: 0.0036 },
  THB: { symbol: '฿', name: 'Thai Baht', rate: 0.0022 },
};

export function formatCurrency(amountIDR, currency = 'IDR') {
  const cur = CURRENCIES[currency] || CURRENCIES.IDR;
  const amount = amountIDR * cur.rate;
  if (currency === 'IDR') {
    return 'Rp ' + Math.round(amount).toLocaleString('id-ID');
  }
  return cur.symbol + amount.toFixed(2);
}

export function getNavHTML(activePage = '', lang = 'en') {
  return `
<nav class="app-nav">
  <a href="/" class="logo">TAGR<span class="logo-reg">®</span></a>
  <div class="nav-center" id="navLinks"></div>
  <div class="nav-right">
    <div class="lang-selector">
      <button class="lang-btn" onclick="toggleLang()" id="langBtn">
        <span id="currentFlag">🌐</span>
        <span id="currentLang">EN</span>
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
    <div id="navAuthArea"></div>
  </div>
</nav>`;
}

export function getBaseStyles() {
  return `
:root{
  --bg:#050A0E;--surface:#0C1419;--surface2:#121D24;--surface3:#172028;
  --border:rgba(0,210,180,0.12);--border2:rgba(0,210,180,0.2);
  --accent:#00D2B4;--accent2:#00F0D0;--accent-dim:rgba(0,210,180,0.08);
  --text:#E8F4F2;--text-muted:#7A9EA8;--text-dim:#3D6070;
  --danger:#FF4B6E;--warning:#F5A623;--success:#00D2B4;--info:#0099FF;
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{font-family:"DM Sans",sans-serif;background:var(--bg);color:var(--text);min-height:100vh;overflow-x:hidden;}
a{color:inherit;text-decoration:none;}

/* NAV */
.app-nav{position:sticky;top:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:0 2rem;height:64px;background:rgba(5,10,14,0.95);backdrop-filter:blur(20px);border-bottom:1px solid var(--border);}
.logo{font-family:"Syne",sans-serif;font-weight:800;font-size:1.4rem;letter-spacing:0.12em;color:var(--accent);}
.logo-reg{font-size:0.45em;vertical-align:super;color:var(--text-muted);}
.nav-right{display:flex;align-items:center;gap:1rem;}

/* LANG SELECTOR */
.lang-selector{position:relative;}
.lang-btn{background:var(--surface2);border:1px solid var(--border);color:var(--text-muted);padding:0.3rem 0.7rem;border-radius:4px;font-family:"DM Sans",sans-serif;font-size:0.8rem;cursor:pointer;display:flex;align-items:center;gap:0.35rem;transition:border-color 0.2s;}
.lang-btn:hover{border-color:var(--accent);color:var(--text);}
.lang-dropdown{display:none;position:absolute;top:calc(100% + 8px);right:0;background:var(--surface2);border:1px solid var(--border);border-radius:6px;overflow:hidden;min-width:160px;box-shadow:0 8px 32px rgba(0,0,0,0.5);z-index:200;}
.lang-dropdown.open{display:block;}
.lang-option{padding:0.55rem 1rem;font-size:0.83rem;color:var(--text-muted);cursor:pointer;display:flex;align-items:center;gap:0.5rem;transition:background 0.15s,color 0.15s;}
.lang-option:hover{background:var(--accent-dim);color:var(--text);}
.lang-option.active{color:var(--accent);}

/* BUTTONS */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:0.4rem;border:none;border-radius:8px;padding:0.7rem 1.4rem;font-family:"Syne",sans-serif;font-weight:700;font-size:0.9rem;letter-spacing:0.04em;cursor:pointer;transition:all 0.2s;}
.btn-primary{background:var(--accent);color:#050A0E;box-shadow:0 0 20px rgba(0,210,180,0.2);}
.btn-primary:hover:not(:disabled){background:var(--accent2);transform:translateY(-1px);box-shadow:0 0 32px rgba(0,210,180,0.35);}
.btn-secondary{background:var(--surface2);color:var(--text);border:1px solid var(--border);}
.btn-secondary:hover:not(:disabled){border-color:var(--accent);color:var(--accent);}
.btn-danger{background:transparent;color:var(--danger);border:1px solid rgba(255,75,110,0.3);}
.btn-danger:hover:not(:disabled){background:rgba(255,75,110,0.08);}
.btn-sm{padding:0.4rem 0.9rem;font-size:0.8rem;}
.btn-full{width:100%;}
.btn:disabled{opacity:0.5;cursor:not-allowed;transform:none;}

/* FORMS */
.field{margin-bottom:1.1rem;}
.field label{display:block;font-size:0.74rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-muted);margin-bottom:0.45rem;font-weight:500;}
.field input,.field select,.field textarea{width:100%;background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:0.72rem 1rem;font-family:"DM Sans",sans-serif;font-size:0.92rem;color:var(--text);transition:border-color 0.2s,box-shadow 0.2s;outline:none;}
.field input:focus,.field select:focus,.field textarea:focus{border-color:rgba(0,210,180,0.4);box-shadow:0 0 0 3px rgba(0,210,180,0.06);}
.field input::placeholder{color:var(--text-dim);}
.field .hint{font-size:0.76rem;color:var(--text-dim);margin-top:0.3rem;}
.field select option{background:var(--surface2);}

/* CARDS */
.card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:1.5rem;}
.card-accent{position:relative;overflow:hidden;}
.card-accent::before{content:"";position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--accent),transparent);}

/* BADGES */
.badge{display:inline-flex;align-items:center;gap:0.25rem;padding:0.2rem 0.65rem;border-radius:100px;font-size:0.74rem;font-weight:500;}
.badge-accent{background:var(--accent-dim);border:1px solid rgba(0,210,180,0.2);color:var(--accent);}
.badge-warning{background:rgba(245,166,35,0.1);border:1px solid rgba(245,166,35,0.2);color:var(--warning);}
.badge-danger{background:rgba(255,75,110,0.1);border:1px solid rgba(255,75,110,0.2);color:var(--danger);}
.badge-success{background:rgba(0,210,180,0.1);border:1px solid rgba(0,210,180,0.2);color:var(--success);}
.badge-muted{background:var(--surface2);border:1px solid var(--border);color:var(--text-muted);}

/* ALERTS */
.alert{border-radius:8px;padding:0.75rem 1rem;font-size:0.86rem;margin-bottom:1rem;display:none;}
.alert.show{display:flex;align-items:flex-start;gap:0.5rem;}
.alert-danger{background:rgba(255,75,110,0.08);border:1px solid rgba(255,75,110,0.25);color:var(--danger);}
.alert-success{background:rgba(0,210,180,0.08);border:1px solid rgba(0,210,180,0.25);color:var(--success);}
.alert-warning{background:rgba(245,166,35,0.08);border:1px solid rgba(245,166,35,0.25);color:var(--warning);}

/* SPINNER */
.spinner{width:18px;height:18px;border:2px solid rgba(255,255,255,0.2);border-top-color:currentColor;border-radius:50%;animation:spin 0.8s linear infinite;flex-shrink:0;}
.spinner-dark{border:2px solid rgba(5,10,14,0.2);border-top-color:#050A0E;}
@keyframes spin{to{transform:rotate(360deg);}}

/* TABLES */
.table-wrap{overflow-x:auto;border-radius:10px;border:1px solid var(--border);}
table{width:100%;border-collapse:collapse;font-size:0.85rem;}
thead{background:var(--surface2);}
th{padding:0.7rem 1rem;text-align:left;font-size:0.69rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-muted);font-weight:500;white-space:nowrap;}
td{padding:0.7rem 1rem;border-top:1px solid var(--border);vertical-align:middle;}
tr:hover td{background:rgba(0,210,180,0.02);}

/* TOAST */
.toast{position:fixed;bottom:1.5rem;right:1.5rem;background:var(--surface2);border:1px solid var(--border);border-radius:10px;padding:0.85rem 1.1rem;font-size:0.86rem;box-shadow:0 8px 32px rgba(0,0,0,0.4);z-index:9999;transform:translateY(80px);opacity:0;transition:all 0.3s cubic-bezier(0.22,1,0.36,1);display:flex;align-items:center;gap:0.5rem;max-width:320px;}
.toast.show{transform:translateY(0);opacity:1;}
.toast.t-success{border-color:rgba(0,210,180,0.3);}
.toast.t-error{border-color:rgba(255,75,110,0.3);}
.toast.t-warning{border-color:rgba(245,166,35,0.3);}

/* FOOTER */
.app-footer{border-top:1px solid var(--border);padding:1.5rem 2rem;display:flex;align-items:center;justify-content:space-between;background:var(--surface);margin-top:auto;}
.footer-logo{font-family:"Syne",sans-serif;font-weight:800;font-size:1.1rem;letter-spacing:0.1em;color:var(--accent);}
.footer-copy{font-size:0.78rem;color:var(--text-dim);}

/* GRID */
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:1rem;}
.grid-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:1rem;}
.grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;}

/* PROGRESS */
.progress{height:6px;background:var(--border);border-radius:3px;overflow:hidden;}
.progress-fill{height:100%;background:var(--accent);border-radius:3px;transition:width 0.4s ease;}

/* EMPTY STATE */
.empty-state{text-align:center;padding:3rem 1rem;color:var(--text-muted);}
.empty-state .icon{font-size:2.5rem;margin-bottom:1rem;opacity:0.5;}
.empty-state h3{font-family:"Syne",sans-serif;font-size:1rem;margin-bottom:0.4rem;color:var(--text);}

/* CODE */
.code-text{font-family:"Syne",monospace;letter-spacing:0.08em;color:var(--accent);}

/* TOGGLE */
.toggle-group{display:flex;gap:0.4rem;}
.toggle-btn{flex:1;padding:0.55rem;border-radius:6px;border:1px solid var(--border);background:var(--bg);color:var(--text-muted);font-family:"DM Sans",sans-serif;font-size:0.84rem;cursor:pointer;transition:all 0.2s;text-align:center;}
.toggle-btn.active{background:var(--accent-dim);border-color:var(--accent);color:var(--accent);}

/* CURRENCY SELECTOR */
.currency-sel{background:var(--surface2);border:1px solid var(--border);color:var(--text-muted);padding:0.3rem 0.6rem;border-radius:4px;font-size:0.8rem;cursor:pointer;font-family:"DM Sans",sans-serif;outline:none;}
.currency-sel:hover{border-color:var(--accent);}

@media(max-width:768px){
  .grid-2,.grid-3,.grid-4{grid-template-columns:1fr;}
  .app-nav{padding:0 1rem;}
  .app-footer{flex-direction:column;gap:0.5rem;text-align:center;}
}`;
}

export function getI18nJS() {
  return `
var i18n=${JSON.stringify({
  en:{
    "nav.home":"Home","nav.dashboard":"Dashboard","nav.logout":"Logout","nav.login":"Login","nav.register":"Register",
    "auth.login.title":"Welcome Back","auth.login.sub":"Sign in to your TAGR account","auth.login.email":"Email","auth.login.password":"Password","auth.login.btn":"Sign In","auth.login.noaccount":"Don't have an account?","auth.login.register":"Register",
    "auth.register.title":"Create Account","auth.register.sub":"Start protecting your products with TAGR","auth.register.fullname":"Full Name","auth.register.email":"Email","auth.register.password":"Password","auth.register.brand":"Brand Name","auth.register.prefix":"Brand Prefix (max 8 chars)","auth.register.prefix.hint":"This will be the prefix for all your label codes. E.g. BEABLU","auth.register.phone":"Phone Number","auth.register.btn":"Create Account","auth.register.hasaccount":"Already have an account?","auth.register.login":"Sign In",
    "dash.welcome":"Welcome","dash.credits":"Credits","dash.topup":"Top Up","dash.generate":"Generate Labels","dash.orders":"My Orders","dash.labels":"My Labels","dash.recent":"Recent Activity","dash.no_activity":"No activity yet",
    "gen.title":"Generate Labels","gen.min":"Minimum 100 labels per batch","gen.product":"Product Name","gen.manufacturer":"Manufacturer","gen.origin":"Country of Origin","gen.manufactured":"Manufacture Date","gen.expires":"Expiry Date","gen.quantity":"Quantity (min 100)","gen.serial_prefix":"Serial Number Prefix","gen.serial_order":"Serial Order","gen.serial_urut":"Sequential","gen.serial_acak":"Random","gen.generate":"Generate","gen.save":"Save & Order","gen.credits_needed":"Credits needed","gen.credits_available":"Credits available","gen.insufficient":"Insufficient credits",
    "topup.title":"Top Up Credits","topup.select":"Select Package","topup.pay":"Pay Now","topup.history":"Transaction History",
    "order.title":"My Orders","order.status.pending":"Pending","order.status.confirmed":"Confirmed","order.status.processing":"Processing","order.status.shipped":"Shipped","order.status.delivered":"Delivered",
    "footer.copy":"© 2025 TAGR. All rights reserved."
  },
  id:{
    "nav.home":"Beranda","nav.dashboard":"Dashboard","nav.logout":"Keluar","nav.login":"Masuk","nav.register":"Daftar",
    "auth.login.title":"Selamat Datang","auth.login.sub":"Masuk ke akun TAGR Anda","auth.login.email":"Email","auth.login.password":"Kata Sandi","auth.login.btn":"Masuk","auth.login.noaccount":"Belum punya akun?","auth.login.register":"Daftar",
    "auth.register.title":"Buat Akun","auth.register.sub":"Mulai lindungi produk Anda dengan TAGR","auth.register.fullname":"Nama Lengkap","auth.register.email":"Email","auth.register.password":"Kata Sandi","auth.register.brand":"Nama Brand","auth.register.prefix":"Prefix Brand (maks 8 karakter)","auth.register.prefix.hint":"Ini akan menjadi awalan kode label Anda. Contoh: BEABLU","auth.register.phone":"Nomor Telepon","auth.register.btn":"Buat Akun","auth.register.hasaccount":"Sudah punya akun?","auth.register.login":"Masuk",
    "dash.welcome":"Selamat datang","dash.credits":"Kredit","dash.topup":"Isi Kredit","dash.generate":"Generate Label","dash.orders":"Pesanan Saya","dash.labels":"Label Saya","dash.recent":"Aktivitas Terbaru","dash.no_activity":"Belum ada aktivitas",
    "gen.title":"Generate Label","gen.min":"Minimum 100 label per batch","gen.product":"Nama Produk","gen.manufacturer":"Produsen","gen.origin":"Negara Produksi","gen.manufactured":"Tanggal Produksi","gen.expires":"Tanggal Kedaluwarsa","gen.quantity":"Jumlah (min 100)","gen.serial_prefix":"Prefix Nomor Seri","gen.serial_order":"Urutan Seri","gen.serial_urut":"Berurutan","gen.serial_acak":"Acak","gen.generate":"Generate","gen.save":"Simpan & Pesan","gen.credits_needed":"Kredit dibutuhkan","gen.credits_available":"Kredit tersedia","gen.insufficient":"Kredit tidak cukup",
    "topup.title":"Isi Kredit","topup.select":"Pilih Paket","topup.pay":"Bayar Sekarang","topup.history":"Riwayat Transaksi",
    "order.title":"Pesanan Saya","order.status.pending":"Menunggu","order.status.confirmed":"Dikonfirmasi","order.status.processing":"Diproses","order.status.shipped":"Dikirim","order.status.delivered":"Diterima",
    "footer.copy":"© 2025 TAGR. Semua hak dilindungi."
  },
  zh:{"nav.home":"首页","nav.dashboard":"控制台","nav.logout":"退出","nav.login":"登录","nav.register":"注册","auth.login.title":"欢迎回来","auth.login.sub":"登录您的TAGR账户","auth.login.email":"邮箱","auth.login.password":"密码","auth.login.btn":"登录","auth.login.noaccount":"没有账户？","auth.login.register":"注册","auth.register.title":"创建账户","auth.register.sub":"开始使用TAGR保护您的产品","auth.register.fullname":"全名","auth.register.email":"邮箱","auth.register.password":"密码","auth.register.brand":"品牌名称","auth.register.prefix":"品牌前缀（最多8个字符）","auth.register.prefix.hint":"这将是您标签代码的前缀。例如：BEABLU","auth.register.phone":"电话号码","auth.register.btn":"创建账户","auth.register.hasaccount":"已有账户？","auth.register.login":"登录","dash.welcome":"欢迎","dash.credits":"积分","dash.topup":"充值","dash.generate":"生成标签","dash.orders":"我的订单","dash.labels":"我的标签","dash.recent":"最近活动","dash.no_activity":"暂无活动","gen.title":"生成标签","gen.min":"每批最少100个标签","gen.product":"产品名称","gen.manufacturer":"制造商","gen.origin":"原产国","gen.manufactured":"生产日期","gen.expires":"到期日期","gen.quantity":"数量（最少100）","gen.serial_prefix":"序列号前缀","gen.serial_order":"序列顺序","gen.serial_urut":"顺序","gen.serial_acak":"随机","gen.generate":"生成","gen.save":"保存并订购","gen.credits_needed":"所需积分","gen.credits_available":"可用积分","gen.insufficient":"积分不足","topup.title":"充值积分","topup.select":"选择套餐","topup.pay":"立即支付","topup.history":"交易记录","order.title":"我的订单","order.status.pending":"待处理","order.status.confirmed":"已确认","order.status.processing":"处理中","order.status.shipped":"已发货","order.status.delivered":"已送达","footer.copy":"© 2025 TAGR。保留所有权利。"},
  ar:{"nav.home":"الرئيسية","nav.dashboard":"لوحة التحكم","nav.logout":"تسجيل الخروج","nav.login":"تسجيل الدخول","nav.register":"إنشاء حساب","auth.login.title":"مرحباً بعودتك","auth.login.sub":"سجّل دخولك إلى حساب TAGR","auth.login.email":"البريد الإلكتروني","auth.login.password":"كلمة المرور","auth.login.btn":"تسجيل الدخول","auth.login.noaccount":"ليس لديك حساب؟","auth.login.register":"إنشاء حساب","auth.register.title":"إنشاء حساب","auth.register.sub":"ابدأ بحماية منتجاتك مع TAGR","auth.register.fullname":"الاسم الكامل","auth.register.email":"البريد الإلكتروني","auth.register.password":"كلمة المرور","auth.register.brand":"اسم العلامة التجارية","auth.register.prefix":"بادئة العلامة (8 أحرف كحد أقصى)","auth.register.prefix.hint":"ستكون هذه البادئة لجميع رموز ملصقاتك. مثال: BEABLU","auth.register.phone":"رقم الهاتف","auth.register.btn":"إنشاء حساب","auth.register.hasaccount":"لديك حساب بالفعل؟","auth.register.login":"تسجيل الدخول","dash.welcome":"مرحباً","dash.credits":"رصيد","dash.topup":"شحن الرصيد","dash.generate":"إنشاء ملصقات","dash.orders":"طلباتي","dash.labels":"ملصقاتي","dash.recent":"النشاط الأخير","dash.no_activity":"لا يوجد نشاط","gen.title":"إنشاء ملصقات","gen.min":"الحد الأدنى 100 ملصق لكل دفعة","gen.product":"اسم المنتج","gen.manufacturer":"الشركة المصنعة","gen.origin":"بلد المنشأ","gen.manufactured":"تاريخ الإنتاج","gen.expires":"تاريخ الانتهاء","gen.quantity":"الكمية (100 كحد أدنى)","gen.serial_prefix":"بادئة الرقم التسلسلي","gen.serial_order":"ترتيب التسلسل","gen.serial_urut":"تسلسلي","gen.serial_acak":"عشوائي","gen.generate":"إنشاء","gen.save":"حفظ وطلب","gen.credits_needed":"الرصيد المطلوب","gen.credits_available":"الرصيد المتاح","gen.insufficient":"رصيد غير كافٍ","topup.title":"شحن الرصيد","topup.select":"اختر الباقة","topup.pay":"ادفع الآن","topup.history":"سجل المعاملات","order.title":"طلباتي","order.status.pending":"معلق","order.status.confirmed":"مؤكد","order.status.processing":"قيد المعالجة","order.status.shipped":"تم الشحن","order.status.delivered":"تم التسليم","footer.copy":"© 2025 TAGR. جميع الحقوق محفوظة."},
  fr:{"nav.home":"Accueil","nav.dashboard":"Tableau de bord","nav.logout":"Déconnexion","nav.login":"Connexion","nav.register":"S'inscrire","auth.login.title":"Bon retour","auth.login.sub":"Connectez-vous à votre compte TAGR","auth.login.email":"Email","auth.login.password":"Mot de passe","auth.login.btn":"Se connecter","auth.login.noaccount":"Pas de compte ?","auth.login.register":"S'inscrire","auth.register.title":"Créer un compte","auth.register.sub":"Commencez à protéger vos produits avec TAGR","auth.register.fullname":"Nom complet","auth.register.email":"Email","auth.register.password":"Mot de passe","auth.register.brand":"Nom de marque","auth.register.prefix":"Préfixe de marque (8 caractères max)","auth.register.prefix.hint":"Ce sera le préfixe de tous vos codes. Ex: BEABLU","auth.register.phone":"Numéro de téléphone","auth.register.btn":"Créer un compte","auth.register.hasaccount":"Vous avez déjà un compte ?","auth.register.login":"Se connecter","dash.welcome":"Bienvenue","dash.credits":"Crédits","dash.topup":"Recharger","dash.generate":"Générer des étiquettes","dash.orders":"Mes commandes","dash.labels":"Mes étiquettes","dash.recent":"Activité récente","dash.no_activity":"Aucune activité","gen.title":"Générer des étiquettes","gen.min":"Minimum 100 étiquettes par lot","gen.product":"Nom du produit","gen.manufacturer":"Fabricant","gen.origin":"Pays d'origine","gen.manufactured":"Date de fabrication","gen.expires":"Date d'expiration","gen.quantity":"Quantité (min 100)","gen.serial_prefix":"Préfixe du numéro de série","gen.serial_order":"Ordre de série","gen.serial_urut":"Séquentiel","gen.serial_acak":"Aléatoire","gen.generate":"Générer","gen.save":"Sauvegarder et commander","gen.credits_needed":"Crédits nécessaires","gen.credits_available":"Crédits disponibles","gen.insufficient":"Crédits insuffisants","topup.title":"Recharger les crédits","topup.select":"Choisir un forfait","topup.pay":"Payer maintenant","topup.history":"Historique","order.title":"Mes commandes","order.status.pending":"En attente","order.status.confirmed":"Confirmé","order.status.processing":"En traitement","order.status.shipped":"Expédié","order.status.delivered":"Livré","footer.copy":"© 2025 TAGR. Tous droits réservés."}
})};
var langMeta={en:{flag:'🇺🇸',code:'EN'},id:{flag:'🇮🇩',code:'ID'},zh:{flag:'🇨🇳',code:'中'},ar:{flag:'🇸🇦',code:'AR'},fr:{flag:'🇫🇷',code:'FR'}};
var currentLang=localStorage.getItem('tagr_lang')||'en';
function t(k){return(i18n[currentLang]&&i18n[currentLang][k])||k;}
function applyLang(lang){
  if(!i18n[lang])return;
  currentLang=lang;
  localStorage.setItem('tagr_lang',lang);
  document.documentElement.lang=lang;
  document.documentElement.dir=lang==='ar'?'rtl':'ltr';
  document.querySelectorAll('[data-i18n]').forEach(function(el){var k=el.getAttribute('data-i18n');if(i18n[lang][k])el.textContent=i18n[lang][k];});
  document.querySelectorAll('[data-i18n-ph]').forEach(function(el){var k=el.getAttribute('data-i18n-ph');if(i18n[lang][k])el.placeholder=i18n[lang][k];});
  var cf=document.getElementById('currentFlag');var cl=document.getElementById('currentLang');
  if(cf)cf.textContent=langMeta[lang].flag;
  if(cl)cl.textContent=langMeta[lang].code;
  document.querySelectorAll('.lang-option').forEach(function(opt,i){opt.classList.toggle('active',Object.keys(langMeta)[i]===lang);});
}
function setLang(lang){applyLang(lang);var d=document.getElementById('langDropdown');if(d)d.classList.remove('open');}
function toggleLang(){var d=document.getElementById('langDropdown');if(d)d.classList.toggle('open');}
document.addEventListener('click',function(e){if(!e.target.closest('.lang-selector')){var d=document.getElementById('langDropdown');if(d)d.classList.remove('open');}});

/* CURRENCY */
var currencies={IDR:{symbol:'Rp',rate:1},USD:{symbol:'$',rate:0.000063},EUR:{symbol:'€',rate:0.000058},MYR:{symbol:'RM',rate:0.00029},SGD:{symbol:'S$',rate:0.000084},PHP:{symbol:'₱',rate:0.0036},THB:{symbol:'฿',rate:0.0022}};
var currentCurrency=localStorage.getItem('tagr_currency')||'IDR';
function setCurrency(c){currentCurrency=c;localStorage.setItem('tagr_currency',c);renderCurrency();}
function fmtCurrency(idr){var c=currencies[currentCurrency]||currencies.IDR;var a=idr*c.rate;if(currentCurrency==='IDR')return 'Rp '+Math.round(a).toLocaleString('id-ID');return c.symbol+a.toFixed(2);}
function renderCurrency(){document.querySelectorAll('[data-price]').forEach(function(el){var idr=parseInt(el.getAttribute('data-price'));el.textContent=fmtCurrency(idr);});}

/* TOAST */
function showToast(msg,type){var el=document.getElementById('toast');if(!el)return;el.textContent=(type==='success'?'✅ ':type==='error'?'❌ ':type==='warning'?'⚠️ ':'ℹ️ ')+msg;el.className='toast t-'+(type||'info')+' show';setTimeout(function(){el.classList.remove('show');},3500);}

/* SUPABASE AUTH HELPERS */
var _supabaseUrl='',_supabaseKey='',_accessToken='',_userProfile=null;
async function initSupabase(){try{var r=await fetch('/api/config');var d=await r.json();_supabaseUrl=d.supabase_url;_supabaseKey=d.supabase_key;}catch(e){console.error('config err',e);}}
async function sbFetch(path,opts){var headers=Object.assign({'apikey':_supabaseKey,'Content-Type':'application/json'},opts&&opts.headers||{});if(_accessToken)headers['Authorization']='Bearer '+_accessToken;return fetch(_supabaseUrl+path,Object.assign({},opts,{headers:headers}));}
async function loadProfile(){try{var r=await sbFetch('/rest/v1/profiles?select=*&id=eq.'+_userId+'&limit=1',{headers:{'Authorization':'Bearer '+_accessToken,'apikey':_supabaseKey}});var d=await r.json();if(d&&d[0])_userProfile=d[0];}catch(e){}}
function getToken(){return localStorage.getItem('tagr_token')||'';}
function getUserId(){return localStorage.getItem('tagr_uid')||'';}
function saveSession(token,uid){localStorage.setItem('tagr_token',token);localStorage.setItem('tagr_uid',uid);_accessToken=token;_userId=uid;}
function clearSession(){localStorage.removeItem('tagr_token');localStorage.removeItem('tagr_uid');_accessToken='';_userId='';}
var _userId='';
`;
}

export function getHeadHTML(title = 'TAGR') {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet"/>`;
}
