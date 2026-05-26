function renderNav() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  nav.innerHTML = `
    <div class="nav-inner">
      <a href="/" class="logo">
        <span>✈</span> TourAgency
      </a>

      <!-- Desktop links -->
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

      <!-- Burger button -->
      <button class="burger" id="burger-btn" aria-label="Відкрити меню">
        <span></span><span></span><span></span>
      </button>
    </div>

    <!-- Mobile drawer -->
    <div class="mobile-nav" id="mobile-nav">
      <div class="mobile-nav-links">
        <a href="/pages/tours.html">✈️&nbsp; Всі тури</a>
        ${user ? `
          <a href="/pages/history.html">📋&nbsp; Мої бронювання</a>
          ${user.role === 'manager'
            ? '<a href="/pages/manager/dashboard.html" class="mobile-nav-manager">🛠&nbsp; Панель менеджера</a>'
            : ''}
          <div class="mobile-nav-user">👤 ${user.name}</div>
          <a href="#" id="mobile-logout-btn" class="mobile-nav-logout">🚪&nbsp; Вийти</a>
        ` : `
          <a href="/pages/login.html">🔑&nbsp; Увійти</a>
          <a href="/pages/register.html" class="mobile-nav-register">📝&nbsp; Реєстрація</a>
        `}
      </div>
    </div>`;

  // Desktop logout
  document.getElementById('logout-btn')?.addEventListener('click', e => {
    e.preventDefault();
    localStorage.clear();
    window.location.href = '/';
  });

  // Mobile logout
  document.getElementById('mobile-logout-btn')?.addEventListener('click', e => {
    e.preventDefault();
    localStorage.clear();
    window.location.href = '/';
  });

  // Burger toggle
  const burgerBtn = document.getElementById('burger-btn');
  const mobileNav = document.getElementById('mobile-nav');

  burgerBtn.addEventListener('click', e => {
    e.stopPropagation();
    const isOpen = mobileNav.classList.toggle('open');
    burgerBtn.classList.toggle('open', isOpen);
    burgerBtn.setAttribute('aria-label', isOpen ? 'Закрити меню' : 'Відкрити меню');
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!nav.contains(e.target)) {
      mobileNav.classList.remove('open');
      burgerBtn.classList.remove('open');
    }
  });

  // Close on link click inside drawer
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      burgerBtn.classList.remove('open');
    });
  });
}

document.addEventListener('DOMContentLoaded', renderNav);
