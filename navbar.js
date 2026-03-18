// ─── Maison Navbar ────────────────────────────────────────────────────────────

function renderNavbar(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const user = App.auth.currentUser;
  const isAuth = App.auth.isAuthenticated;
  const isAdmin = isAuth && user?.role === 'admin';
  const base = window.location.pathname.includes('/admin/') ? '../' : '';

  const authLinks = isAuth ? `
    <a href="${base}book.html" class="nav-link">Reserve</a>
    <a href="${base}my-bookings.html" class="nav-link">Bookings</a>
    ${isAdmin ? `<a href="${base}admin/index.html" class="nav-link nav-gold">Admin</a>` : ''}
    <button class="nav-link nav-btn" onclick="doLogout('${base}')">Sign Out</button>
  ` : `
    <a href="${base}login.html" class="nav-link">Sign In</a>
    <a href="${base}book.html" class="nav-cta">Reserve</a>
  `;

  const mobileLinks = isAuth ? `
    <a href="${base}book.html" class="mob-link">Reserve a Table</a>
    <a href="${base}my-bookings.html" class="mob-link">My Bookings</a>
    ${isAdmin ? `<a href="${base}admin/index.html" class="mob-link mob-gold">Admin Panel</a>` : ''}
    <div class="mob-user">Signed in as <strong>${user?.full_name || ''}</strong></div>
    <button class="mob-link mob-btn" onclick="doLogout('${base}')">Sign Out</button>
  ` : `
    <a href="${base}index.html" class="mob-link">Home</a>
    <a href="${base}login.html" class="mob-link">Sign In</a>
    <a href="${base}register.html" class="mob-link mob-gold">Create Account</a>
    <a href="${base}book.html" class="mob-link">Reserve a Table</a>
  `;

  el.innerHTML = `
    <style>
      .maison-nav{background:#1a1510;border-bottom:1px solid rgba(184,150,90,0.15);position:sticky;top:0;z-index:100;}
      .nav-inner{max-width:1100px;margin:0 auto;padding:0 20px;height:64px;display:flex;align-items:center;justify-content:space-between;}
      .nav-logo{display:flex;flex-direction:column;text-decoration:none;gap:1px;}
      .nav-logo-name{font-family:'Cormorant Garamond',serif;font-size:20px;letter-spacing:.15em;color:#b8965a;line-height:1;}
      .nav-logo-sub{font-size:9px;letter-spacing:.3em;text-transform:uppercase;color:#7a6f63;font-family:'DM Mono',monospace;}
      .nav-links{display:flex;align-items:center;gap:24px;}
      .nav-link{color:#7a6f63;font-size:11px;letter-spacing:.15em;text-transform:uppercase;text-decoration:none;background:none;border:none;cursor:pointer;font-family:'DM Sans',sans-serif;padding:0;transition:color .2s;}
      .nav-link:hover{color:#faf7f2;}
      .nav-gold{color:#b8965a !important;}
      .nav-btn{display:inline;}
      .nav-cta{background:#b8965a;color:#fff !important;padding:8px 18px;font-size:11px;letter-spacing:.15em;text-transform:uppercase;text-decoration:none;font-family:'DM Sans',sans-serif;transition:background .2s;}
      .nav-cta:hover{background:#d4af72;}
      .hamburger{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:6px;z-index:101;}
      .hbar{display:block;width:22px;height:1.5px;background:#b8965a;transition:all .3s;}
      .hamburger.open .hbar:nth-child(1){transform:translateY(6.5px) rotate(45deg);}
      .hamburger.open .hbar:nth-child(2){opacity:0;}
      .hamburger.open .hbar:nth-child(3){transform:translateY(-6.5px) rotate(-45deg);}
      .mobile-menu{display:none;position:absolute;top:64px;left:0;right:0;background:#1a1510;border-bottom:1px solid rgba(184,150,90,0.2);padding:8px 0 20px;z-index:99;}
      .mobile-menu.open{display:block;}
      .mob-link{display:block;padding:13px 24px;color:#7a6f63;font-size:12px;letter-spacing:.15em;text-transform:uppercase;text-decoration:none;font-family:'DM Sans',sans-serif;border:none;background:none;width:100%;text-align:left;cursor:pointer;transition:color .2s;}
      .mob-link:hover{color:#faf7f2;}
      .mob-gold{color:#b8965a !important;}
      .mob-btn{display:block;}
      .mob-user{padding:10px 24px 4px;font-size:11px;color:#7a6f63;font-family:'DM Mono',monospace;letter-spacing:.05em;}
      .mob-divider{height:1px;background:rgba(184,150,90,0.1);margin:8px 20px;}
      @media(max-width:680px){.nav-links{display:none;}.hamburger{display:flex;}}
    </style>
    <nav class="maison-nav">
      <div class="nav-inner" style="position:relative;">
        <a href="${base}index.html" class="nav-logo">
          <div class="nav-logo-name">MAISON</div>
          <div class="nav-logo-sub">Fine Dining · Ahmednagar</div>
        </a>
        <div class="nav-links">${authLinks}</div>
        <button class="hamburger" id="nav-ham" onclick="toggleNav()" aria-label="Menu">
          <span class="hbar"></span><span class="hbar"></span><span class="hbar"></span>
        </button>
        <div class="mobile-menu" id="mob-menu">
          <div class="mob-divider"></div>
          ${mobileLinks}
        </div>
      </div>
    </nav>
  `;
}

function toggleNav() {
  document.getElementById('nav-ham')?.classList.toggle('open');
  document.getElementById('mob-menu')?.classList.toggle('open');
}

function doLogout(base) {
  App.auth.logout();
  window.location.href = (base || '') + 'index.html';
}

document.addEventListener('click', e => {
  const ham = document.getElementById('nav-ham');
  const menu = document.getElementById('mob-menu');
  if (ham && menu && !ham.contains(e.target) && !menu.contains(e.target)) {
    ham.classList.remove('open');
    menu.classList.remove('open');
  }
});
