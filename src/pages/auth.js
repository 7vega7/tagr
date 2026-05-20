// TAGR Auth Pages — Login & Register
import { getBaseStyles, getI18nJS, getHeadHTML } from '../lib/shared.js';

export function getLoginPage() {
  return getHeadHTML('TAGR — Sign In') + `
<style>${getBaseStyles()}
body{display:flex;flex-direction:column;min-height:100vh;}
.auth-wrap{flex:1;display:flex;align-items:center;justify-content:center;padding:2rem;background:var(--bg);}
.auth-card{width:100%;max-width:420px;}
.auth-logo{font-family:"Syne",sans-serif;font-weight:800;font-size:2rem;letter-spacing:0.12em;color:var(--accent);text-align:center;margin-bottom:0.3rem;}
.auth-logo-reg{font-size:0.45em;vertical-align:super;color:var(--text-muted);}
.auth-tagline{text-align:center;color:var(--text-muted);font-size:0.88rem;margin-bottom:2rem;}
.auth-box{background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:2rem;position:relative;overflow:hidden;}
.auth-box::before{content:"";position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--accent),transparent);}
.auth-title{font-family:"Syne",sans-serif;font-size:1.4rem;font-weight:800;margin-bottom:0.3rem;}
.auth-sub{color:var(--text-muted);font-size:0.86rem;margin-bottom:1.5rem;}
.auth-footer{text-align:center;margin-top:1.2rem;font-size:0.85rem;color:var(--text-muted);}
.auth-footer a{color:var(--accent);font-weight:500;}
.divider{display:flex;align-items:center;gap:0.8rem;margin:1.2rem 0;color:var(--text-dim);font-size:0.78rem;}
.divider::before,.divider::after{content:"";flex:1;height:1px;background:var(--border);}
.bg-grid{position:fixed;inset:0;z-index:-1;background-image:linear-gradient(rgba(0,210,180,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(0,210,180,0.02) 1px,transparent 1px);background-size:60px 60px;}
</style>
</head>
<body>
<div class="bg-grid"></div>
${getNavBarHTML('login')}
<div class="auth-wrap">
  <div class="auth-card">
    <div class="auth-logo">TAGR<span class="auth-logo-reg">®</span></div>
    <div class="auth-tagline">NFC Anti-Counterfeiting Labels</div>
    <div class="auth-box">
      <div class="auth-title" data-i18n="auth.login.title">Welcome Back</div>
      <div class="auth-sub" data-i18n="auth.login.sub">Sign in to your TAGR account</div>
      <div class="alert alert-danger" id="loginErr"></div>
      <div class="field">
        <label data-i18n="auth.login.email">Email</label>
        <input type="email" id="email" data-i18n-ph="auth.login.email" placeholder="Email" autocomplete="email"/>
      </div>
      <div class="field">
        <label data-i18n="auth.login.password">Password</label>
        <input type="password" id="password" placeholder="••••••••" autocomplete="current-password" onkeydown="if(event.key==='Enter')doLogin()"/>
      </div>
      <button class="btn btn-primary btn-full" id="loginBtn" onclick="doLogin()">
        <span data-i18n="auth.login.btn">Sign In</span>
      </button>
    </div>
    <div class="auth-footer">
      <span data-i18n="auth.login.noaccount">Don't have an account?</span>
      <a href="/register" data-i18n="auth.login.register"> Register</a>
    </div>
  </div>
</div>
<footer class="app-footer">
  <span class="footer-logo">TAGR</span>
  <span class="footer-copy" data-i18n="footer.copy">© 2025 TAGR. All rights reserved.</span>
</footer>
<div class="toast" id="toast"></div>
<script>
${getI18nJS()}
async function doLogin(){
  var email=document.getElementById('email').value.trim();
  var pass=document.getElementById('password').value;
  var err=document.getElementById('loginErr');
  var btn=document.getElementById('loginBtn');
  err.classList.remove('show');
  if(!email||!pass){err.textContent='Email and password are required.';err.classList.add('show');return;}
  btn.disabled=true;
  btn.innerHTML='<div class="spinner spinner-dark"></div>';
  try{
    await initSupabase();
    var r=await fetch(_supabaseUrl+'/auth/v1/token?grant_type=password',{method:'POST',headers:{'apikey':_supabaseKey,'Content-Type':'application/json'},body:JSON.stringify({email:email,password:pass})});
    var d=await r.json();
    if(d.access_token){
      saveSession(d.access_token,d.user.id);
      window.location.href='/dashboard';
    }else{
      err.textContent=d.error_description||d.msg||'Login failed. Check your credentials.';
      err.classList.add('show');
    }
  }catch(e){err.textContent='Connection error. Please try again.';err.classList.add('show');}
  btn.disabled=false;btn.innerHTML='<span data-i18n="auth.login.btn">Sign In</span>';applyLang(currentLang);
}
initSupabase().then(function(){
  _accessToken=getToken();_userId=getUserId();
  if(_accessToken)window.location.href='/dashboard';
  applyLang(currentLang);
});
</script>
</body></html>`;
}

export function getRegisterPage() {
  return getHeadHTML('TAGR — Create Account') + `
<style>${getBaseStyles()}
body{display:flex;flex-direction:column;min-height:100vh;}
.auth-wrap{flex:1;display:flex;align-items:center;justify-content:center;padding:2rem;background:var(--bg);}
.auth-card{width:100%;max-width:520px;}
.auth-logo{font-family:"Syne",sans-serif;font-weight:800;font-size:2rem;letter-spacing:0.12em;color:var(--accent);text-align:center;margin-bottom:0.3rem;}
.auth-logo-reg{font-size:0.45em;vertical-align:super;color:var(--text-muted);}
.auth-tagline{text-align:center;color:var(--text-muted);font-size:0.88rem;margin-bottom:2rem;}
.auth-box{background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:2rem;position:relative;overflow:hidden;}
.auth-box::before{content:"";position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--accent),transparent);}
.auth-title{font-family:"Syne",sans-serif;font-size:1.4rem;font-weight:800;margin-bottom:0.3rem;}
.auth-sub{color:var(--text-muted);font-size:0.86rem;margin-bottom:1.5rem;}
.auth-footer{text-align:center;margin-top:1.2rem;font-size:0.85rem;color:var(--text-muted);}
.auth-footer a{color:var(--accent);font-weight:500;}
.prefix-preview{background:var(--surface2);border:1px solid var(--border);border-radius:6px;padding:0.5rem 0.8rem;font-family:"Syne",monospace;font-size:0.85rem;color:var(--accent);margin-top:0.4rem;letter-spacing:0.1em;min-height:2rem;}
.prefix-example{color:var(--text-dim);font-size:0.75rem;margin-top:0.25rem;}
.bg-grid{position:fixed;inset:0;z-index:-1;background-image:linear-gradient(rgba(0,210,180,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(0,210,180,0.02) 1px,transparent 1px);background-size:60px 60px;}
.step-indicator{display:flex;gap:0.5rem;margin-bottom:1.5rem;}
.step{flex:1;height:3px;border-radius:2px;background:var(--border);transition:background 0.3s;}
.step.active{background:var(--accent);}
.section-sep{border:none;border-top:1px solid var(--border);margin:1.2rem 0;}
</style>
</head>
<body>
<div class="bg-grid"></div>
${getNavBarHTML('register')}
<div class="auth-wrap">
  <div class="auth-card">
    <div class="auth-logo">TAGR<span class="auth-logo-reg">®</span></div>
    <div class="auth-tagline">NFC Anti-Counterfeiting Labels</div>
    <div class="auth-box">
      <div class="auth-title" data-i18n="auth.register.title">Create Account</div>
      <div class="auth-sub" data-i18n="auth.register.sub">Start protecting your products with TAGR</div>
      <div class="alert alert-danger" id="regErr"></div>
      <div class="alert alert-success" id="regOk"></div>
      <div class="grid-2">
        <div class="field">
          <label data-i18n="auth.register.fullname">Full Name</label>
          <input type="text" id="fullname" placeholder="Your full name"/>
        </div>
        <div class="field">
          <label data-i18n="auth.register.phone">Phone Number</label>
          <input type="text" id="phone" placeholder="+62 812 3456 7890"/>
        </div>
      </div>
      <div class="field">
        <label data-i18n="auth.register.email">Email</label>
        <input type="email" id="email" placeholder="your@email.com" autocomplete="email"/>
      </div>
      <div class="field">
        <label data-i18n="auth.register.password">Password</label>
        <input type="password" id="password" placeholder="Min. 8 characters" autocomplete="new-password"/>
      </div>
      <hr class="section-sep"/>
      <div class="grid-2">
        <div class="field">
          <label data-i18n="auth.register.brand">Brand Name</label>
          <input type="text" id="brandName" placeholder="e.g. Beablu Fashion" oninput="suggestPrefix()"/>
        </div>
        <div class="field">
          <label data-i18n="auth.register.prefix">Brand Prefix</label>
          <input type="text" id="brandPrefix" placeholder="e.g. BEABLU" maxlength="8" oninput="this.value=this.value.toUpperCase().replace(/[^A-Z0-9]/g,'')"/>
          <div class="hint" data-i18n="auth.register.prefix.hint">This will prefix all your label codes</div>
        </div>
      </div>
      <div class="prefix-preview" id="prefixPreview">—</div>
      <div class="prefix-example">Example label code: <span id="prefixEx" style="color:var(--accent)">PREFIX-XXXX-XXXX</span></div>
      <br/>
      <button class="btn btn-primary btn-full" id="regBtn" onclick="doRegister()">
        <span data-i18n="auth.register.btn">Create Account</span>
      </button>
    </div>
    <div class="auth-footer">
      <span data-i18n="auth.register.hasaccount">Already have an account?</span>
      <a href="/login" data-i18n="auth.register.login"> Sign In</a>
    </div>
  </div>
</div>
<footer class="app-footer">
  <span class="footer-logo">TAGR</span>
  <span class="footer-copy" data-i18n="footer.copy">© 2025 TAGR. All rights reserved.</span>
</footer>
<div class="toast" id="toast"></div>
<script>
${getI18nJS()}
function suggestPrefix(){
  var brand=document.getElementById('brandName').value;
  var prefix=brand.toUpperCase().replace(/[^A-Z0-9]/g,'').substring(0,8);
  var pfx=document.getElementById('brandPrefix');
  if(!pfx.value)pfx.value=prefix;
  updatePrefixPreview();
}
function updatePrefixPreview(){
  var prefix=document.getElementById('brandPrefix').value||'—';
  document.getElementById('prefixPreview').textContent=prefix;
  document.getElementById('prefixEx').textContent=prefix+'-XXXX-XXXX';
}
document.getElementById('brandPrefix').addEventListener('input',updatePrefixPreview);

async function doRegister(){
  var fullname=document.getElementById('fullname').value.trim();
  var phone=document.getElementById('phone').value.trim();
  var email=document.getElementById('email').value.trim();
  var pass=document.getElementById('password').value;
  var brandName=document.getElementById('brandName').value.trim();
  var brandPrefix=document.getElementById('brandPrefix').value.trim().toUpperCase();
  var err=document.getElementById('regErr');
  var ok=document.getElementById('regOk');
  var btn=document.getElementById('regBtn');
  err.classList.remove('show');ok.classList.remove('show');
  if(!fullname||!email||!pass||!brandName||!brandPrefix){err.textContent='All fields are required.';err.classList.add('show');return;}
  if(pass.length<8){err.textContent='Password must be at least 8 characters.';err.classList.add('show');return;}
  if(brandPrefix.length<2){err.textContent='Brand prefix must be at least 2 characters.';err.classList.add('show');return;}
  btn.disabled=true;btn.innerHTML='<div class="spinner spinner-dark"></div>';
  try{
    await initSupabase();
    // Check prefix uniqueness
    var chk=await sbFetch('/rest/v1/profiles?select=id&brand_prefix=eq.'+brandPrefix+'&limit=1');
    var chkData=await chk.json();
    if(chkData&&chkData.length>0){err.textContent='Brand prefix already taken. Please choose another.';err.classList.add('show');btn.disabled=false;btn.innerHTML='<span data-i18n="auth.register.btn">Create Account</span>';applyLang(currentLang);return;}
    var r=await fetch(_supabaseUrl+'/auth/v1/signup',{method:'POST',headers:{'apikey':_supabaseKey,'Content-Type':'application/json'},body:JSON.stringify({email:email,password:pass,options:{data:{full_name:fullname,brand_name:brandName,brand_prefix:brandPrefix,phone:phone}}})});
    var d=await r.json();
    if(d.user||d.id){
      ok.textContent='Account created! Please check your email to verify, then sign in.';
      ok.classList.add('show');
      setTimeout(function(){window.location.href='/login';},3000);
    }else{
      err.textContent=d.error_description||d.msg||d.message||'Registration failed.';
      err.classList.add('show');
    }
  }catch(e){err.textContent='Connection error. Please try again.';err.classList.add('show');}
  btn.disabled=false;btn.innerHTML='<span data-i18n="auth.register.btn">Create Account</span>';applyLang(currentLang);
}
initSupabase().then(function(){applyLang(currentLang);});
</script>
</body></html>`;
}

function getNavBarHTML(active) {
  return `<nav class="app-nav">
  <a href="/" class="logo">TAGR<span class="logo-reg">®</span></a>
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
    ${active === 'login' ? '<a href="/register" class="btn btn-secondary btn-sm" data-i18n="nav.register">Register</a>' : '<a href="/login" class="btn btn-secondary btn-sm" data-i18n="nav.login">Login</a>'}
  </div>
</nav>`;
}
