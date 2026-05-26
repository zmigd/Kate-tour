require('dotenv').config();
const mongoose = require('mongoose');

const User    = require('./models/User');
const Country = require('./models/Country');
const City    = require('./models/City');
const Hotel   = require('./models/Hotel');
const Service = require('./models/Service');
const Tour    = require('./models/Tour');
const Booking = require('./models/Booking');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✓ MongoDB connected');

  // ── Очистка ──────────────────────────────────────────────
  await Promise.all([
    User.deleteMany({}), Country.deleteMany({}),
    City.deleteMany({}), Hotel.deleteMany({}),
    Service.deleteMany({}), Tour.deleteMany({}),
    Booking.deleteMany({})
  ]);
  console.log('✓ Collections cleared');

  // ── Користувачі ──────────────────────────────────────────
  await User.create([
    { name: 'Адміністратор', email: 'admin@tour.com',    password: '123456', role: 'manager', phone: '+380501234567' },
    { name: 'Менеджер',      email: 'manager@tour.com',  password: '123456', role: 'manager', phone: '+380502345678' },
    { name: 'Клієнт',        email: 'client@tour.com',   password: '123456', role: 'client',  phone: '+380503456789' },
  ]);
  console.log('✓ Users created  →  admin@tour.com / manager@tour.com / client@tour.com  (pass: 123456)');

  // ── Послуги ───────────────────────────────────────────────
  const svcs = await Service.insertMany([
    { name: 'Трансфер з аеропорту', description: 'Зустріч та доставка до готелю включено' },
    { name: 'Сніданок включено',    description: 'Щоденний сніданок у готелі' },
    { name: 'Екскурсії з гідом',   description: 'Групові та індивідуальні екскурсії' },
    { name: 'Медична страховка',    description: 'Повний страховий поліс на весь час подорожі' },
    { name: 'All Inclusive',        description: 'Харчування, напої та розваги цілодобово' },
  ]);
  console.log('✓ Services created (5)');

  // ── Країни ────────────────────────────────────────────────
  const [au, cn, hr, cz, de, it, lk] = await Country.insertMany([
    { name: 'Австралія',  code: 'AU' },
    { name: 'Китай',      code: 'CN' },
    { name: 'Хорватія',  code: 'HR' },
    { name: 'Чехія',     code: 'CZ' },
    { name: 'Німеччина', code: 'DE' },
    { name: 'Італія',    code: 'IT' },
    { name: 'Шрі-Ланка', code: 'LK' },
  ]);
  console.log('✓ Countries created (7)');

  // ── Міста ─────────────────────────────────────────────────
  const [sydney, beijing, dubrovnik, prague, berlin, rome, colombo] = await City.insertMany([
    { name: 'Сідней',    country: au._id },
    { name: 'Пекін',     country: cn._id },
    { name: 'Дубровник', country: hr._id },
    { name: 'Прага',     country: cz._id },
    { name: 'Берлін',    country: de._id },
    { name: 'Рим',       country: it._id },
    { name: 'Коломбо',   country: lk._id },
  ]);
  console.log('✓ Cities created (7)');

  // ── Готелі ────────────────────────────────────────────────
  const [h1, h2, h3, h4, h5, h6, h7] = await Hotel.insertMany([
    { name: 'Sydney Harbour Hotel', city: sydney._id,    stars: 5 },
    { name: 'Beijing Palace Hotel', city: beijing._id,   stars: 5 },
    { name: 'Hotel Dubrovnik',      city: dubrovnik._id, stars: 5 },
    { name: 'Hotel Savic Prague',   city: prague._id,    stars: 4 },
    { name: 'Hotel Adlon Berlin',   city: berlin._id,    stars: 5 },
    { name: 'Hotel Roma Imperiale', city: rome._id,      stars: 4 },
    { name: 'Jetwing Colombo',      city: colombo._id,   stars: 4 },
  ]);
  console.log('✓ Hotels created (7)');

  // ── Тури ──────────────────────────────────────────────────
  const [s0,s1,s2,s3,s4] = svcs;

  await Tour.insertMany([
    {
      title: 'Чудеса Австралії',
      description: 'Незабутня подорож до країни кенгуру та Великого Бар\'єрного рифу. Сідней — найкрасивіше місто Тихоокеанського узбережжя з його знаменитою Opera House та Harbour Bridge. Прогулянки Блакитними горами, дайвінг на рифі та відпочинок на пляжах Бонді завершать цю чудову подорож.',
      country: au._id, city: sydney._id, hotel: h1._id,
      services: [s0._id, s1._id, s2._id, s3._id],
      price: 85000, duration: 10,
      startDate: new Date('2026-07-15'), endDate: new Date('2026-07-25'),
      seats: 15, isHot: true, imageUrl: '/assets/images/AU.webp',
    },
    {
      title: 'Загадковий Китай',
      description: 'Велика Китайська стіна, Заборонене місто та сучасні хмарочоси Пекіна. Пориньте у тисячолітню культуру Піднебесної — терракотова армія, сади Сучжоу та вулиця Ванфуцзін. Неповторна кухня та яскраві ринки залишать незабутні враження.',
      country: cn._id, city: beijing._id, hotel: h2._id,
      services: [s0._id, s1._id, s2._id, s3._id],
      price: 72000, duration: 12,
      startDate: new Date('2026-07-01'), endDate: new Date('2026-07-13'),
      seats: 20, isHot: true, imageUrl: '/assets/images/China.webp',
    },
    {
      title: 'Перлини Хорватії',
      description: 'Кришталеві води Адріатики та середньовічне місто Дубровник — справжня Перлина Адріатики. Давні міські мури, вузькі вулички зі середньовічною архітектурою та чудові пляжі приваблюють мільйони туристів щороку.',
      country: hr._id, city: dubrovnik._id, hotel: h3._id,
      services: [s0._id, s1._id, s4._id],
      price: 45000, duration: 8,
      startDate: new Date('2026-06-20'), endDate: new Date('2026-06-28'),
      seats: 18, isHot: false, imageUrl: '/assets/images/Croatia.webp',
    },
    {
      title: 'Казкова Прага',
      description: 'Золоте місто ста веж і найкраще пиво в Європі. Старе місто з годинниковою вежею, Карлів міст та величний Празький Град зачарують кожного. Богемська кухня, джазові клуби та атмосфера середньовічної Європи.',
      country: cz._id, city: prague._id, hotel: h4._id,
      services: [s0._id, s1._id, s2._id],
      price: 38000, duration: 7,
      startDate: new Date('2026-08-10'), endDate: new Date('2026-08-17'),
      seats: 25, isHot: true, imageUrl: '/assets/images/CzechRepublic.webp',
    },
    {
      title: 'Романтична Германія',
      description: 'Казковий замок Нойшванштайн, Бранденбурзькі ворота та жовтневий фестиваль пива. Берлін — місто мистецтва і свободи: галереї, вуличний стріт-арт та неповторна кухня баварських пивних ресторанів.',
      country: de._id, city: berlin._id, hotel: h5._id,
      services: [s0._id, s1._id, s2._id, s3._id],
      price: 52000, duration: 9,
      startDate: new Date('2026-08-01'), endDate: new Date('2026-08-10'),
      seats: 20, isHot: false, imageUrl: '/assets/images/DE.webp',
    },
    {
      title: 'Вічна Італія',
      description: 'Колізей, Ватикан, Фонтан Треві та справжня піца в Римі. Місто з тисячолітньою історією, де кожен куточок — шедевр архітектури. Іспанські сходи, площа Навона та вечірня прогулянка по вічному місту.',
      country: it._id, city: rome._id, hotel: h6._id,
      services: [s0._id, s1._id, s2._id, s4._id],
      price: 55000, duration: 10,
      startDate: new Date('2026-07-20'), endDate: new Date('2026-07-30'),
      seats: 22, isHot: true, imageUrl: '/assets/images/IT.webp',
    },
    {
      title: 'Острів Шрі-Ланка',
      description: 'Тропічний рай з чайними плантаціями, дикими слонами та бірюзовим Індійським океаном. Стародавні буддійські храми, тропічні ліси та неймовірні пляжі з білим піском чекають на вас у цьому екзотичному куточку планети.',
      country: lk._id, city: colombo._id, hotel: h7._id,
      services: [s0._id, s1._id, s4._id, s3._id],
      price: 68000, duration: 14,
      startDate: new Date('2026-09-01'), endDate: new Date('2026-09-15'),
      seats: 12, isHot: true, imageUrl: '/assets/images/SriLanka.webp',
    },
  ]);
  console.log('✓ Tours created (7)');

  console.log('\n🎉 Database seeded successfully!');
  console.log('────────────────────────────────');
  console.log('  Admin:   admin@tour.com   / 123456');
  console.log('  Manager: manager@tour.com / 123456');
  console.log('  Client:  client@tour.com  / 123456');
  console.log('────────────────────────────────');

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch(err => {
  console.error('❌ Seed failed:', err.message);
  process.exit(1);
});
