// ─── Maison App.js ───────────────────────────────────────────────────────────
// This file connects your HTML pages to PHP backend

// Base URL for all API calls
const API = '';

// ─── Auth ─────────────────────────────────────────────────────────────────────
const App = {

  auth: {
    // Get logged in user from localStorage
    get currentUser() {
      try { return JSON.parse(localStorage.getItem('maison_user')); }
      catch(e) { return null; }
    },
    get user() { return this.currentUser; },

    // Check if user is logged in
    get isAuthenticated() {
      return !!localStorage.getItem('maison_token');
    },

    // Get token for sending to PHP
    get token() {
      return localStorage.getItem('maison_token') || '';
    },

    // Save user after login/register
    login(user, token) {
      localStorage.setItem('maison_user', JSON.stringify(user));
      localStorage.setItem('maison_token', token);
    },

    // Clear session on logout
    logout() {
      localStorage.removeItem('maison_user');
      localStorage.removeItem('maison_token');
    }
  },

  // ─── API call helper ────────────────────────────────────────────────────────
  // Use this to call any PHP file
  // method: 'GET' or 'POST'
  // endpoint: e.g. 'login.php'
  // body: data to send (for POST only)
  async call(method, endpoint, body = null) {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.auth.token
      }
    };
    if (body) options.body = JSON.stringify(body);

    try {
      const res  = await fetch(`${API}/${endpoint}`, options);
      const data = await res.json();
      return data;
    } catch(e) {
      return { success: false, message: 'Network error. Could not connect to server.' };
    }
  },

  // ─── Format date for display ────────────────────────────────────────────────
  formatDate(dateStr) {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr + 'T00:00:00');
      return d.toLocaleDateString('en-IN', {
        weekday: 'short', day: 'numeric',
        month: 'short', year: 'numeric'
      });
    } catch(e) { return dateStr; }
  },

  // ─── Toast notification ─────────────────────────────────────────────────────
  toast(msg, type = 'success') {
    let wrap = document.getElementById('_toast_wrap');
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.id = '_toast_wrap';
      wrap.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);z-index:9999;display:flex;flex-direction:column;gap:8px;align-items:center;pointer-events:none;width:90%;max-width:360px;';
      document.body.appendChild(wrap);
    }
    const colors = {
      success: '#3fb950', error: '#f85149',
      warning: '#d29922', info:  '#b8965a'
    };
    const t = document.createElement('div');
    t.style.cssText = `background:#1a1510;border:1px solid ${colors[type]||colors.success}44;border-left:3px solid ${colors[type]||colors.success};color:#faf7f2;padding:12px 18px;font-family:'DM Sans',sans-serif;font-size:13px;width:100%;box-shadow:0 8px 24px rgba(0,0,0,0.5);opacity:0;transition:opacity 0.25s;pointer-events:auto;`;
    t.textContent = msg;
    wrap.appendChild(t);
    requestAnimationFrame(() => t.style.opacity = '1');
    setTimeout(() => {
      t.style.opacity = '0';
      setTimeout(() => t.remove(), 300);
    }, 3200);
  }
};
