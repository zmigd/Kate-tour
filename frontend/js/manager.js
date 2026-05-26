function checkManager() {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  if (!user || user.role !== 'manager') {
    window.location.href = '/pages/login.html';
    return null;
  }
  return user;
}

function renderSidebar(active) {
  const el = document.getElementById('mgr-sidebar');
  if (!el) return;

  const main = [
    { href: '/pages/manager/dashboard.html', icon: '📊', label: 'Огляд',   key: 'dashboard' },
    { href: '/pages/manager/tours.html',     icon: '✈️',  label: 'Тури',    key: 'tours'     },
    { href: '/pages/manager/bookings.html',  icon: '📋',  label: 'Заявки',  key: 'bookings'  },
  ];
  const ref = [
    { href: '/pages/manager/countries.html', icon: '🌍',  label: 'Країни',  key: 'countries' },
    { href: '/pages/manager/cities.html',    icon: '🏙',  label: 'Міста',   key: 'cities'    },
    { href: '/pages/manager/hotels.html',    icon: '🏨',  label: 'Готелі',  key: 'hotels'    },
    { href: '/pages/manager/services.html',  icon: '⚙️',  label: 'Послуги', key: 'services'  },
  ];

  const link = ({ href, icon, label, key }) =>
    `<a href="${href}" class="${active === key ? 'active' : ''}">${icon} ${label}</a>`;

  el.innerHTML = `
    <div class="s-title">Головне</div>
    ${main.map(link).join('')}
    <div class="s-title">Довідники</div>
    ${ref.map(link).join('')}
    <div class="s-title">Інше</div>
    <a href="/">🌐 На сайт</a>`;
}
