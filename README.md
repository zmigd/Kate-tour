# ✈️ TourAgency — Сайт туристичного агентства

Курсова робота. Повноцінний веб-застосунок для туристичного агентства з каталогом турів, системою бронювання та панеллю менеджера.

> 📦 Інструкція з розгортання на іншому комп'ютері — у файлі **[SETUP.md](./SETUP.md)**

---

## Зміст

1. [Технічний стек](#технічний-стек)
2. [Структура проекту](#структура-проекту)
3. [Тестові облікові записи](#тестові-облікові-записи)
4. [Функціонал](#функціонал)
5. [API — документація](#api--документація)
6. [Моделі бази даних](#моделі-бази-даних)

---

## Технічний стек

| Рівень | Технологія |
|--------|-----------|
| **Frontend** | HTML5, CSS3 (Variables, Flexbox, Grid), Vanilla JavaScript |
| **Backend** | Node.js, Express.js |
| **База даних** | MongoDB (локально через MongoDB Compass) |
| **ODM** | Mongoose |
| **Автентифікація** | JWT (JSON Web Token) + bcryptjs |
| **Завантаження файлів** | Multer |
| **Email** | Nodemailer |
| **Шрифт** | Inter (Google Fonts CDN) |

---

## Структура проекту

```
Tour/
├── backend/                      # Серверна частина (Node.js + Express)
│   ├── config/
│   │   └── db.js                 # Підключення до MongoDB
│   ├── controllers/              # Логіка обробки запитів
│   │   ├── authController.js     # Реєстрація, логін, профіль
│   │   ├── tourController.js     # CRUD турів
│   │   ├── bookingController.js  # CRUD бронювань
│   │   ├── userController.js     # CRUD користувачів (адмін)
│   │   ├── countryController.js
│   │   ├── cityController.js
│   │   ├── hotelController.js
│   │   └── serviceController.js
│   ├── middleware/
│   │   ├── auth.js               # Перевірка JWT токену (protect)
│   │   └── role.js               # Перевірка ролі: manager / admin
│   ├── models/                   # Mongoose схеми колекцій
│   │   ├── User.js
│   │   ├── Tour.js
│   │   ├── Booking.js
│   │   ├── Country.js
│   │   ├── City.js
│   │   ├── Hotel.js
│   │   └── Service.js
│   ├── routes/                   # Express маршрутизатори
│   │   ├── auth.js
│   │   ├── tours.js
│   │   ├── bookings.js
│   │   ├── users.js              # Управління користувачами (адмін)
│   │   ├── countries.js
│   │   ├── cities.js
│   │   ├── hotels.js
│   │   ├── services.js
│   │   └── upload.js             # Завантаження зображень (Multer)
│   ├── utils/
│   │   └── mailer.js             # Email-сповіщення (Nodemailer)
│   ├── seed.js                   # Скрипт заповнення БД тестовими даними
│   ├── server.js                 # Точка входу — запуск Express
│   ├── package.json
│   └── .env                      # Змінні середовища (не в Git)
│
└── frontend/                     # Клієнтська частина (статичні файли)
    ├── assets/
    │   └── images/               # Фото турів
    ├── css/
    │   └── style.css             # Всі стилі (CSS Variables, адаптив)
    ├── js/
    │   ├── api.js                # Хелпер для fetch-запитів до API
    │   ├── auth.js               # Логін / реєстрація
    │   ├── nav.js                # Навігаційна панель (бургер на мобільному)
    │   ├── manager.js            # Перевірка доступу менеджера + sidebar
    │   └── tours.js              # Рендер карток турів
    ├── pages/
    │   ├── login.html
    │   ├── register.html
    │   ├── tours.html            # Каталог турів з фільтрами
    │   ├── tour-detail.html      # Деталі туру + форма бронювання
    │   ├── history.html          # Мої бронювання
    │   ├── profile.html          # Профіль користувача
    │   └── manager/              # Панель менеджера / адміна
    │       ├── dashboard.html    # Статистика та останні бронювання
    │       ├── tours.html        # Управління турами (drag-drop фото)
    │       ├── bookings.html     # Управління бронюваннями
    │       ├── users.html        # Управління користувачами (тільки адмін)
    │       ├── countries.html
    │       ├── cities.html
    │       ├── hotels.html
    │       └── services.html
    └── index.html                # Головна сторінка
```

---

## Тестові облікові записи

| Роль | Email | Пароль | Доступ |
|------|-------|--------|--------|
| **Адмін** | admin@tour.com | 123456 | Панель менеджера + управління користувачами та ролями |
| **Менеджер** | manager@tour.com | 123456 | Панель менеджера, всі CRUD (тури, бронювання, довідники) |
| **Клієнт** | client@tour.com | 123456 | Перегляд турів, бронювання |

---

## Функціонал

### Для клієнтів

| Сторінка | Опис |
|----------|------|
| **Головна** | Гарячі тури, пошук, статистика агентства |
| **Каталог турів** | Фільтрація за назвою та ціною, сортування |
| **Деталі туру** | Фото, опис, готель, послуги, форма бронювання |
| **Мої бронювання** | Таблиця на десктопі; картки з попапом на мобільному |
| **Профіль** | Перегляд даних облікового запису |

### Для менеджерів

| Сторінка | Опис |
|----------|------|
| **Дашборд** | Статистика: кількість турів, бронювань, виручка |
| **Тури** | Додавання / редагування / видалення турів |
| **Бронювання** | Всі бронювання, зміна статусу (pending → confirmed / cancelled) |
| **Довідники** | CRUD для країн, міст, готелів, послуг |

### Для адміністраторів

Адмін має весь доступ менеджера, плюс:

| Сторінка | Опис |
|----------|------|
| **Користувачі** | Список всіх користувачів з пошуком та фільтрацією по ролі |
| **Зміна ролі** | Підвищення / пониження ролі будь-якого користувача (client ↔ manager ↔ admin) |
| **Видалення користувача** | Видалення облікового запису з підтвердженням |

### Технічні особливості

- **Drag-and-drop фото** — перетягни зображення у форму туру, Multer зберігає у `frontend/assets/images/`
- **Автотривалість туру** — вибери дату початку і кінця, кількість днів підраховується сама
- **Адаптивний дизайн** — бургер-меню на мобільному, картки замість таблиць у «Моїх бронюваннях»
- **Захист маршрутів** — JWT middleware на всіх приватних ендпоінтах API і сторінках менеджера
- **Рольова ієрархія** — три рівні доступу: `client` → `manager` → `admin`; реєстрація через публічну форму не дозволяє обрати роль `admin`

---

## API — Документація

Базовий URL: `http://localhost:5000/api`

Для захищених маршрутів передавай заголовок:
```
Authorization: Bearer <token>
```

---

### Автентифікація `/api/auth`

| Метод | URL | Доступ | Опис |
|-------|-----|--------|------|
| `POST` | `/api/auth/register` | Публічний | Реєстрація |
| `POST` | `/api/auth/login` | Публічний | Вхід, отримання токену |
| `GET` | `/api/auth/me` | Авторизований | Дані поточного користувача |

**POST /api/auth/register**
```json
{
  "name": "Іван Іванов",
  "email": "ivan@example.com",
  "password": "123456",
  "phone": "+380501234567"
}
```

**POST /api/auth/login**
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
  "user": { "_id": "...", "name": "Клієнт", "email": "client@tour.com", "role": "client" }
}
```

---

### Тури `/api/tours`

| Метод | URL | Доступ | Опис |
|-------|-----|--------|------|
| `GET` | `/api/tours` | Публічний | Список усіх турів |
| `GET` | `/api/tours/:id` | Публічний | Деталі одного туру |
| `POST` | `/api/tours` | Менеджер | Створити тур |
| `PUT` | `/api/tours/:id` | Менеджер | Оновити тур |
| `DELETE` | `/api/tours/:id` | Менеджер | Видалити тур |

**POST /api/tours**
```json
{
  "title": "Вічна Італія",
  "description": "Опис туру...",
  "country": "<ObjectId>",
  "city": "<ObjectId>",
  "hotel": "<ObjectId>",
  "services": ["<ObjectId>", "<ObjectId>"],
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

### Бронювання `/api/bookings`

| Метод | URL | Доступ | Опис |
|-------|-----|--------|------|
| `POST` | `/api/bookings` | Авторизований | Створити бронювання |
| `GET` | `/api/bookings/my` | Авторизований | Мої бронювання |
| `GET` | `/api/bookings` | Менеджер | Всі бронювання |
| `PATCH` | `/api/bookings/:id` | Менеджер | Змінити статус |

**POST /api/bookings**
```json
{
  "tour": "<ObjectId туру>",
  "persons": 2,
  "notes": "Потрібен трансфер"
}
```

**PATCH /api/bookings/:id**
```json
{ "status": "confirmed" }
```
Статуси: `pending` | `confirmed` | `cancelled`

---

### Довідники

| Маршрут | GET | POST / PUT / DELETE |
|---------|-----|---------------------|
| `/api/countries` | Публічний | Менеджер |
| `/api/cities` | Публічний | Менеджер |
| `/api/hotels` | Публічний | Менеджер |
| `/api/services` | Публічний | Менеджер |

---

### Користувачі `/api/users` *(тільки адмін)*

| Метод | URL | Опис |
|-------|-----|------|
| `GET` | `/api/users` | Список всіх користувачів (фільтр: `?role=`, `?search=`) |
| `PATCH` | `/api/users/:id/role` | Змінити роль користувача |
| `DELETE` | `/api/users/:id` | Видалити користувача |

**GET /api/users** — приклади фільтрації:
```
GET /api/users?role=client
GET /api/users?search=іван
GET /api/users?role=manager&search=@gmail
```

**PATCH /api/users/:id/role**
```json
{ "role": "manager" }
```
Допустимі значення: `client` | `manager` | `admin`

> Адмін не може змінити власну роль або видалити власний акаунт.

---

### Завантаження фото `/api/upload`

| Метод | URL | Доступ |
|-------|-----|--------|
| `POST` | `/api/upload` | Менеджер |

Тип запиту: `multipart/form-data`, поле `image`.

Відповідь:
```json
{ "imageUrl": "/assets/images/1700000000000-12345.jpg" }
```
Формати: `jpg`, `jpeg`, `png`, `webp`, `gif`, `avif` — до **10 МБ**.

---

## Моделі бази даних

### User
| Поле | Тип | Деталі |
|------|-----|--------|
| name | String | required |
| email | String | required, unique |
| password | String | bcrypt-хеш |
| role | String | `client` \| `manager` \| `admin` (default: client) |
| phone | String | |
| createdAt | Date | auto |

### Tour
| Поле | Тип | Деталі |
|------|-----|--------|
| title | String | required |
| description | String | |
| country | ObjectId | → Country, required |
| city | ObjectId | → City |
| hotel | ObjectId | → Hotel |
| services | [ObjectId] | → Service[] |
| price | Number | required |
| duration | Number | днів, required |
| startDate | Date | required |
| endDate | Date | required |
| seats | Number | required |
| isHot | Boolean | default: false |
| imageUrl | String | |
| createdAt | Date | auto |

### Booking
| Поле | Тип | Деталі |
|------|-----|--------|
| user | ObjectId | → User, required |
| tour | ObjectId | → Tour, required |
| persons | Number | required, min: 1 |
| totalPrice | Number | required |
| status | String | `pending` \| `confirmed` \| `cancelled` |
| notes | String | |
| createdAt | Date | auto |

### Country
| Поле | Тип |
|------|-----|
| name | String (required, unique) |
| code | String (двобуквений, напр. UA) |

### City
| Поле | Тип |
|------|-----|
| name | String (required) |
| country | ObjectId → Country |

### Hotel
| Поле | Тип |
|------|-----|
| name | String (required) |
| city | ObjectId → City |
| stars | Number (1–5) |

### Service
| Поле | Тип |
|------|-----|
| name | String (required) |
| description | String |

---

Репозиторій: [github.com/zmigd/Kate-tour](https://github.com/zmigd/Kate-tour)
