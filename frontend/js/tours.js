function fmt(d) {
  return d ? new Date(d).toLocaleDateString('uk-UA') : '—';
}

function tourCard(t) {
  const img = t.imageUrl
    ? `<img src="${t.imageUrl}" alt="${t.title}">`
    : `<div class="tour-card__placeholder">✈️</div>`;

  const stars = t.hotel?.stars ? '⭐'.repeat(t.hotel.stars) : '';

  return `
    <div class="tour-card">
      <div class="tour-card__img-wrap">
        ${img}
        ${t.isHot ? '<span class="tour-card__hot">🔥 HOT</span>' : ''}
        <div class="tour-card__price-badge">
          ${Number(t.price).toLocaleString('uk-UA')} грн
          <small>за особу</small>
        </div>
      </div>
      <div class="tour-card__body">
        <div class="tour-card__title">${t.title}</div>
        <div class="tour-card__meta">
          📍 ${t.country?.name || ''}${t.city?.name ? ' · ' + t.city.name : ''}
          ${stars ? `<span style="margin-left:auto">${stars}</span>` : ''}
        </div>
        <div class="tour-card__meta">🏨 ${t.hotel?.name || 'Без готелю'}</div>
        <div class="tour-card__meta">📅 ${fmt(t.startDate)} · <strong>${t.duration} дн.</strong></div>
        <div class="tour-card__meta">🪑 Вільних місць: <strong>${t.seats}</strong></div>
      </div>
      <div class="tour-card__footer">
        <a href="/pages/tour-detail.html?id=${t._id}" class="btn btn-primary btn-full">
          Детальніше →
        </a>
      </div>
    </div>`;
}

async function loadHotTours(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = '<div class="loading">Завантаження...</div>';
  try {
    const tours = await api.get('/tours?isHot=true');
    el.innerHTML = tours.length
      ? tours.map(tourCard).join('')
      : '<div class="empty"><div class="ico">✈️</div><p>Гарячих турів поки немає</p></div>';
  } catch (err) {
    el.innerHTML = `<div class="alert alert-error">${err.message}</div>`;
  }
}
