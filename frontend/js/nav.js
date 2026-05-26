function renderNav() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  nav.innerHTML = `
    <div class="nav-inner">
      <a href="/" class="logo">
        <span>✈</span> TourAgency
      </a>
      <div class="nav-links">
        <a href="/pages/tours.html">Всі тури</a>
        ${user ? `
          <a href="/pages/history.html">Мої бронювання</a>
          ${user.role === 'manager'
            ? '<a href="/pages/manager/dashboard.html" style="color:var(--blue);font-weight:600">Панель</a>'
            : ''}
          <span class="nav-user">👤 ${user.name}</span>
          <a href="#" id="logout-btn" class="btn-nav-outline">Вийти</a>
        ` : `
          <a href="/pages/login.html">Увійти</a>
          <a href="/pages/register.html" class="btn-nav-outline">Реєстрація</a>
        `}
      </div>
    </div>`;

  document.getElementById('logout-btn')?.addEventListener('click', e => {
    e.preventDefault();
    localStorage.clear();
    window.location.href = '/';
  });
}

document.addEventListener('DOMContentLoaded', renderNav);
