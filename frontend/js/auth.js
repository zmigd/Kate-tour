function getUser() {
  const u = localStorage.getItem('user');
  return u ? JSON.parse(u) : null;
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/frontend/index.html';
}

function updateNav() {
  const user = getUser();
  const loginEl    = document.getElementById('nav-login');
  const registerEl = document.getElementById('nav-register');
  const profileEl  = document.getElementById('nav-profile');
  const logoutEl   = document.getElementById('nav-logout');
  if (!loginEl) return;
  if (user) {
    loginEl.style.display    = 'none';
    registerEl.style.display = 'none';
    profileEl.style.display  = 'inline';
    logoutEl.style.display   = 'inline';
    logoutEl.addEventListener('click', (e) => { e.preventDefault(); logout(); });
  }
}

document.addEventListener('DOMContentLoaded', updateNav);
