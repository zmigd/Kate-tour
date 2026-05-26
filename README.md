# ✈️ TourAgency — Сайт туристичного агентства

Курсова робота. Повноцінний веб-застосунок для туристичного агентства з каталогом турів, системою бронювання та панеллю менеджера.

---

## 📋 Зміст

1. [Технічний стек](#технічний-стек)
2. [Структура проекту](#структура-проекту)
3. [Встановлення та запуск](#встановлення-та-запуск)
4. [Тестові облікові записи](#тестові-облікові-записи)
5. [Функціонал](#функціонал)
6. [API — документація](#api--документація)
7. [Моделі бази даних](#моделі-бази-даних)
8. [Перенос на інший комп'ютер](#перенос-на-інший-компютер)

---

## Технічний стек

| Рівень | Технологія |
|--------|-----------|
| **Frontend** | HTML5, CSS3 (CSS Variables, Flexbox, Grid), Vanilla JavaScript |
| **Backend** | Node.js, Express.js |
| **База даних** | MongoDB (локально через MongoDB Compass) |
| **ODM** | Mongoose |
| **Автентифікація** | JWT (JSON Web Token) + bcryptjs |
| **Завантаження файлів** | Multer |
| **Email** | Nodemailer |
| **Шрифт** | Inter (Google Fonts) |

---

## Структура проекту

```
Tour/
├── backend/                    # Серверна частина (Node.js + Express)
│   ├── config/
│   │   └── db.js               # Підключення до MongoDB
│   ├── controllers/            # Логіка обробки запитів
│   │   ├── authController.js   # Реєстрація, логін, профіль
│   │   ├── tourController.js   # CRUD турів
│   │   ├── bookingController.js# CRUD бронювань
│   │   ├── countryController.js
│   │   ├── cityController.js
│   │   ├── hotelController.js
│   │   └── serviceController.js
│   ├── middleware/
│   │   ├── auth.js             # Перевірка JWT токену (protect)
│   │   └── role.js             # Перевірка ролі менеджера (manager)
│   ├── models/                 # Mongoose схеми
│   │   ├── User.js
│   │   ├── Tour.js
│   │   ├── Booking.js
│   │   ├── Country.js
│   │   ├── City.js
│   │   ├── Hotel.js
│   │   └── Service.js
│   ├── routes/                 # Express роутери
│   │   ├── auth.js
│   │   ├── tours.js
│   │   ├── bookings.js
│   │   ├── countries.js
│   │   ├── cities.js
│   │   ├── hotels.js
│   │   ├── services.js
│   │   └── upload.js           # Завантаження зображень
│   ├── utils/
│   │   └── mailer.js           # Email-сповіщення
│   ├── seed.js                 # Заповнення БД тестовими даними
│   ├── server.js               # Точка входу сервера
│   ├── package.json
│   └── .env                    # Змінні середовища (не в git)
│
└── frontend/                   # Клієнтська частина (статичні файли)
    ├── assets/
    │   └── images/             # Фото турів (завантажені через drag-drop)
    ├── css/
    │   └── style.css           # Головний файл стилів
    ├── js/
    │   ├── api.js              # Утиліта для запитів до API
    │   ├── auth.js             # Логін/реєстрація
    │   ├── nav.js              # Навігаційна панель
    │   ├── manager.js          # Перевірка доступу менеджера
    │   └── tours.js            # Відображення карток турів
    ├── pages/
    │   ├── login.html
    │   ├── register.html
    │   ├── tours.html          # Каталог турів з фільтрами
    │   ├── tour-detail.html    # Деталі туру + форма бронювання
    │   ├── history.html        # Мої бронювання
    │   ├── profile.html        # Профіль користувача
    │   └── manager/            # Панель менеджера
    │       ├── dashboard.html  # Статистика та дашборд
    │       ├── tours.html      # Управління турами
    │       ├── bookings.html   # Управління бронюваннями
    │       ├── countries.html
    │       ├── cities.html
    │       ├── hotels.html
    │       └── services.html
    └── index.html              # Головна сторінка
```

---

## Встановлення та запуск

### Що потрібно встановити

- [Node.js](https://nodejs.org/) — версія 18 або вище
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) — версія 6 або вище
- [MongoDB Compass](https://www.mongodb.com/try/download/compass) — GUI для бази даних (опціонально)
- [Git](https://git-scm.com/) — для клонування репозиторію

---

### Крок 1 — Клонування репозиторію

```bash
git clone https://github.com/zmigd/Kate-tour.git
cd Kate-tour
```

---

### Крок 2 — Встановлення залежностей

```bash
cd backend
npm install
```

---

### Крок 3 — Налаштування змінних середовища

У папці `backend/` створи файл `.env`:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/tourdb
JWT_SECRET=your_super_secret_key_change_me
JWT_EXPIRES_IN=7d

# Email (необов'язково, для сповіщень)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

> ⚠️ Файл `.env` не публікується в GitHub — його треба створювати вручну на кожному комп'ютері.

---

### Крок 4 — Запуск MongoDB

**Windows:**
1. Відкрий **MongoDB Compass**
2. Натисни **"New Connection"**
3. Вкажи URI: `mongodb://localhost:27017`
4. Натисни **"Connect"**

Або запусти MongoDB як службу (якщо встановлено):
```bash
net start MongoDB
```

---

### Крок 5 — Заповнення бази даних

Один раз виконай скрипт наповнення БД:

```bash
cd backend
node seed.js
```

Скрипт автоматично створить:
- ✅ 3 користувачі (адмін, менеджер, клієнт)
- ✅ 5 послуг
- ✅ 7 країн
- ✅ 7 міст
- ✅ 7 готелів
- ✅ 7 повноцінних турів з фотографіями

> ⚠️ Скрипт **очищує** всі колекції перед заповненням. Не запускай його якщо вже є власні дані в БД.

---

### Крок 6 — Запуск сервера

```bash
cd backend
npm start
```

Або в режимі розробки (авто-перезапуск при змінах):

```bash
npm run dev
```

Відкрий браузер: **http://localhost:5000**

---

## Тестові облікові записи

| Роль | Email | Пароль | Доступ |
|------|-------|--------|--------|
| **Менеджер (адмін)** | admin@tour.com | 123456 | Панель менеджера, всі CRUD операції |
| **Менеджер** | manager@tour.com | 123456 | Панель менеджера, всі CRUD операції |
| **Клієнт** | client@tour.com | 123456 | Бронювання, перегляд турів |

---

## Функціонал

### Для клієнтів

| Сторінка | Опис |
|---------|------|
| **Головна** | Гарячі тури, пошук, статистика агентства |
| **Каталог турів** | Фільтрація за назвою та ціною, сортування |
| **Деталі туру** | Опис, фото, готель, послуги, форма бронювання |
| **Мої бронювання** | Список бронювань; на мобільному — картки з попапом |
| **Профіль** | Перегляд даних облікового запису |
| **Реєстрація / Вхід** | JWT-автентифікація, зберігання токену в localStorage |

### Для менеджерів

| Сторінка | Опис |
|---------|------|
| **Дашборд** | Статистика: кількість турів, бронювань, виручка |
| **Тури** | CRUD: додавання, редагування, видалення турів |
| **Бронювання** | Перегляд усіх бронювань, зміна статусу |
| **Країни / Міста / Готелі / Послуги** | Довідники: CRUD операції |

### Технічні особливості

- **Drag-and-drop завантаження фото** — перетягни зображення у форму туру, фото зберігається у `frontend/assets/images/`
- **Автоматичний розрахунок тривалості** — вибери дату початку та кінця, кількість днів підраховується автоматично
- **Адаптивний дизайн** — повноцінна мобільна версія (бургер-меню, картки замість таблиць)
- **Захист маршрутів** — JWT middleware на всіх приватних ендпоінтах

---

## API — Документація

Базовий URL: `http://localhost:5000/api`

Для захищених маршрутів передай заголовок:
```
Authorization: Bearer <token>
```

---

### 🔐 Автентифікація `/api/auth`

| Метод | URL | Доступ | Опис |
|-------|-----|--------|------|
| `POST` | `/api/auth/register` | Публічний | Реєстрація нового користувача |
| `POST` | `/api/auth/login` | Публічний | Вхід, отримання JWT токену |
| `GET` | `/api/auth/me` | Авторизований | Дані поточного користувача |

**POST /api/auth/register** — тіло запиту:
```json
{
  "name": "Іван Іванов",
  "email": "ivan@example.com",
  "password": "123456",
  "phone": "+380501234567"
}
```

**POST /api/auth/login** — тіло запиту:
```json
{
  "email": "client@tour.com",
  "password": "123456"
}
```

Відповідь:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "...",
    "name": "Клієнт",
    "email": "client@tour.com",
    "role": "client"
  }
}
```

---

### ✈️ Тури `/api/tours`

| Метод | URL | Доступ | Опис |
|-------|-----|--------|------|
| `GET` | `/api/tours` | Публічний | Список усіх турів |
| `GET` | `/api/tours/:id` | Публічний | Деталі одного туру |
| `POST` | `/api/tours` | Менеджер | Створити тур |
| `PUT` | `/api/tours/:id` | Менеджер | Оновити тур |
| `DELETE` | `/api/tours/:id` | Менеджер | Видалити тур |

**POST /api/tours** — тіло запиту:
```json
{
  "title": "Вічна Італія",
  "description": "Опис туру...",
  "country": "<ObjectId країни>",
  "city": "<ObjectId міста>",
  "hotel": "<ObjectId готелю>",
  "services": ["<ObjectId послуги 1>", "<ObjectId послуги 2>"],
  "price": 55000,
  "duration": 10,
  "startDate": "2026-07-20",
  "endDate": "2026-07-30",
  "seats": 22,
  "isHot": true,
  "imageUrl": "/assets/images/IT.webp"
}
```

---

### 📋 Бронювання `/api/bookings`

| Метод | URL | Доступ | Опис |
|-------|-----|--------|------|
| `POST` | `/api/bookings` | Авторизований | Створити бронювання |
| `GET` | `/api/bookings/my` | Авторизований | Мої бронювання |
| `GET` | `/api/bookings` | Менеджер | Всі бронювання |
| `PATCH` | `/api/bookings/:id` | Менеджер | Змінити статус |

**POST /api/bookings** — тіло запиту:
```json
{
  "tour": "<ObjectId туру>",
  "persons": 2,
  "notes": "Потрібен трансфер"
}
```

**PATCH /api/bookings/:id** — тіло запиту:
```json
{
  "status": "confirmed"
}
```
Доступні статуси: `pending` | `confirmed` | `cancelled`

---

### 🌍 Довідники

Всі довідники мають однакову структуру:

| Маршрут | CRUD |
|---------|------|
| `/api/countries` | GET (публічний), POST/PUT/DELETE (менеджер) |
| `/api/cities` | GET (публічний), POST/PUT/DELETE (менеджер) |
| `/api/hotels` | GET (публічний), POST/PUT/DELETE (менеджер) |
| `/api/services` | GET (публічний), POST/PUT/DELETE (менеджер) |

**POST /api/cities** — приклад:
```json
{
  "name": "Барселона",
  "country": "<ObjectId країни>"
}
```

---

### 📷 Завантаження фото `/api/upload`

| Метод | URL | Доступ | Опис |
|-------|-----|--------|------|
| `POST` | `/api/upload` | Менеджер | Завантажити зображення |

Запит типу `multipart/form-data`, поле `image`.

Відповідь:
```json
{
  "imageUrl": "/assets/images/1700000000000-12345.jpg"
}
```

Допустимі формати: `jpg`, `jpeg`, `png`, `webp`, `gif`, `avif`. Максимальний розмір: **10 МБ**.

---

## Моделі бази даних

### User
```
name       String   (required)
email      String   (required, unique)
password   String   (bcrypt-хеш)
role       String   client | manager  (default: client)
phone      String
createdAt  Date
```

### Tour
```
title       String   (required)
description String
country     ObjectId → Country
city        ObjectId → City
hotel       ObjectId → Hotel
services    [ObjectId] → Service[]
price       Number   (required)
duration    Number   (дні, required)
startDate   Date     (required)
endDate     Date     (required)
seats       Number   (required)
isHot       Boolean  (default: false)
imageUrl    String
createdAt   Date
```

### Booking
```
user        ObjectId → User    (required)
tour        ObjectId → Tour    (required)
persons     Number             (required, min: 1)
totalPrice  Number             (required)
status      String   pending | confirmed | cancelled
notes       String
createdAt   Date
```

### Country
```
name  String (required, unique)
code  String (двобуквений код, напр. UA)
```

### City
```
name     String   (required)
country  ObjectId → Country
```

### Hotel
```
name   String   (required)
city   ObjectId → City
stars  Number   (1–5)
```

### Service
```
name        String (required)
description String
```

---

## Перенос на інший комп'ютер

### Варіант А — Перенос через Git + чистий seed (рекомендовано)

Це найпростіший спосіб. База даних не переноситься — вона заповнюється заново скриптом.

**На новому комп'ютері:**

1. Встанови **Node.js**, **MongoDB**, **Git** (посилання вище)
2. Клонуй репозиторій:
   ```bash
   git clone https://github.com/zmigd/Kate-tour.git
   cd Kate-tour/backend
   ```
3. Встанови залежності:
   ```bash
   npm install
   ```
4. Створи файл `backend/.env`:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/tourdb
   JWT_SECRET=your_super_secret_key_change_me
   JWT_EXPIRES_IN=7d
   ```
5. Запусти MongoDB (через Compass або службу)
6. Заповни базу даних:
   ```bash
   node seed.js
   ```
7. Запусти сервер:
   ```bash
   npm start
   ```
8. Відкрий: **http://localhost:5000**

---

### Варіант Б — Перенос існуючої бази даних (mongodump / mongorestore)

Використовуй якщо в базі є власні дані (нові тури, бронювання від реальних користувачів), які треба зберегти.

#### На СТАРОМУ комп'ютері — експорт:

1. Відкрий термінал / PowerShell
2. Виконай команду:
   ```bash
   mongodump --db tourdb --out C:\Users\YourName\Desktop\tourdb-backup
   ```
   Це створить папку `tourdb-backup` з усіма даними
3. Скопіюй цю папку на флешку або надішли через Google Drive / хмару

> Якщо команда `mongodump` не знайдена — встанови [MongoDB Database Tools](https://www.mongodb.com/try/download/database-tools) окремо.

#### На НОВОМУ комп'ютері — імпорт:

1. Виконай кроки 1–4 з **Варіанта А** (без `node seed.js`)
2. Запусти MongoDB
3. Скопіюй папку `tourdb-backup` на новий комп'ютер
4. Виконай команду відновлення:
   ```bash
   mongorestore --db tourdb C:\Users\YourName\Desktop\tourdb-backup\tourdb
   ```
5. Запусти сервер:
   ```bash
   npm start
   ```

---

### Варіант В — Перенос через MongoDB Compass (без командного рядка)

Якщо не хочеш використовувати термінал:

#### Експорт (старий комп):
1. Відкрий **MongoDB Compass**
2. Підключись до `mongodb://localhost:27017`
3. Відкрий базу `tourdb`
4. Для кожної колекції:
   - Натисни на колекцію (напр. `tours`)
   - Натисни **"Export Data"** (кнопка вгорі)
   - Вибери формат **JSON**
   - Збережи файл (напр. `tours.json`)
5. Повтори для: `users`, `bookings`, `countries`, `cities`, `hotels`, `services`

#### Імпорт (новий комп):
1. Відкрий **MongoDB Compass** → підключись
2. Створи нову базу: натисни **"+"** → вкажи назву `tourdb`
3. Для кожної колекції:
   - Натисни **"+"** → вкажи назву колекції
   - Натисни **"Add Data"** → **"Import JSON or CSV file"**
   - Вибери відповідний `.json` файл

> ⚠️ При імпорті через Compass ObjectId-зв'язки між колекціями збережуться якщо файли не редагувались.

---

### Що потрібно перенести вручну

| Що | Де знаходиться | Як перенести |
|----|---------------|-------------|
| Код проекту | Папка `Tour/` | Git clone або скопіювати |
| Змінні середовища | `backend/.env` | Створити вручну на новому комп. |
| Фото турів | `frontend/assets/images/` | Скопіювати разом з кодом (є в Git) |
| База даних | MongoDB `tourdb` | mongodump/mongorestore або seed.js |
| Node.js залежності | `backend/node_modules/` | НЕ копіювати, виконати `npm install` |

---

### Типові помилки та їх вирішення

**❌ `Cannot connect to MongoDB`**
→ MongoDB не запущена. Запусти MongoDB Compass або службу.

**❌ `Port 5000 is already in use`**
→ Сервер вже запущений. Закрий попередній процес або зміни PORT в `.env`.

**❌ `Cannot find module '...'`**
→ Залежності не встановлено. Виконай `npm install` у папці `backend/`.

**❌ `JWT malformed` / `Not authorized`**
→ Токен застарів або не переданий. Вийди і увійди знову.

**❌ `Multer: Дозволені лише зображення`**
→ Файл не є зображенням або має невідомий формат. Використовуй jpg/png/webp.

---

## Автор

Курсова робота з веб-розробки, 2025–2026 н.р.

Репозиторій: [github.com/zmigd/Kate-tour](https://github.com/zmigd/Kate-tour)
