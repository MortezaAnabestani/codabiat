# کدبیات - پلتفرم آموزشی برنامه‌نویسی و ادبیات الکترونیک

پلتفرمی مدرن و تعاملی برای آموزش برنامه‌نویسی و کشف دنیای ادبیات الکترونیک به زبان فارسی.

## ویژگی‌های اصلی

- 🚀 **اجرای کد در مرورگر**: کدهای JavaScript، TypeScript، React و Node.js را مستقیماً در مرورگر اجرا کنید
- 📚 **محتوای تعاملی**: آموزش‌های گام‌به‌گام در قالب کتاب‌های دیجیتال
- ✨ **ادبیات الکترونیک**: آشنایی با هنر ادبی دیجیتال و تعامل میان کد، متن و خلاقیت
- 💬 **سیستم نظرات و بحث**: امکان گفتگو و تبادل نظر بین کاربران
- 📊 **پیگیری پیشرفت**: سیستم هوشمند پیگیری پیشرفت یادگیری
- 🎯 **کوئیز و آزمون**: ارزیابی دانش با آزمون‌های تعاملی
- 🔍 **جستجوی پیشرفته**: جستجوی سریع و کارآمد در محتوا
- 🎨 **طراحی مینیمال**: رابط کاربری ساده، زیبا و غوطه‌ورانه
- 📱 **کاملاً ریسپانسیو**: تجربه یکسان در تمام دستگاه‌ها
- 🔐 **امنیت بالا**: احراز هویت امن با JWT و Refresh Token

## معماری پروژه

این پروژه یک **Monorepo** است که شامل چندین اپلیکیشن و پکیج مشترک می‌باشد:

```
codabiat/
├── apps/
│   ├── backend/         # API Backend (Node.js + Express + MongoDB)
│   ├── dashboard/       # پنل مدیریت (React + Vite)
│   └── frontend/        # سایت اصلی (Next.js)
├── packages/
│   ├── shared-types/    # TypeScript types مشترک
│   └── utils/           # توابع کمکی مشترک
└── docker-compose.yml   # تنظیمات Docker
```

## تکنولوژی‌های استفاده شده

### Backend
- Node.js & Express.js
- MongoDB & Mongoose
- JWT Authentication
- TypeScript
- Docker

### Frontend (سایت اصلی)
- Next.js 14 (App Router)
- React 18
- TailwindCSS
- TypeScript
- Axios & React Query

### Dashboard (پنل ادمین)
- React 18
- Vite
- TailwindCSS
- TypeScript
- Zustand (State Management)
- TinyMCE (ادیتور محتوا)

## پیش‌نیازها

- Node.js >= 18.0.0
- npm >= 9.0.0
- MongoDB >= 7.0 (یا استفاده از Docker)
- Docker & Docker Compose (اختیاری)

## نصب و راه‌اندازی

### روش 1: استفاده از Docker (توصیه می‌شود)

1. کلون کردن پروژه:
```bash
git clone https://github.com/your-username/codabiat.git
cd codabiat
```

2. کپی کردن فایل‌های محیطی:
```bash
cp .env.example .env
cp apps/backend/.env.example apps/backend/.env
cp apps/dashboard/.env.example apps/dashboard/.env
cp apps/frontend/.env.example apps/frontend/.env
```

3. راه‌اندازی با Docker:
```bash
# راه‌اندازی کامل (Backend + Frontend + Dashboard + MongoDB)
docker-compose up -d

# یا فقط MongoDB برای توسعه
docker-compose -f docker-compose.dev.yml up -d
```

4. دسترسی به اپلیکیشن‌ها:
- Frontend: http://localhost:3000
- Dashboard: http://localhost:5173
- Backend API: http://localhost:5000
- MongoDB: localhost:27017

### روش 2: نصب مستقیم (بدون Docker)

1. نصب dependencies:
```bash
npm install
```

2. ساخت shared packages:
```bash
cd packages/shared-types && npm run build
cd ../utils && npm run build
cd ../..
```

3. راه‌اندازی MongoDB (باید از قبل نصب شده باشد):
```bash
mongod
```

4. راه‌اندازی Backend:
```bash
cd apps/backend
cp .env.example .env
# ویرایش .env و تنظیم MONGODB_URI
npm run dev
```

5. راه‌اندازی Dashboard (ترمینال جدید):
```bash
cd apps/dashboard
cp .env.example .env
npm run dev
```

6. راه‌اندازی Frontend (ترمینال جدید):
```bash
cd apps/frontend
cp .env.example .env
npm run dev
```

## اسکریپت‌های مفید

### Root Level
```bash
# اجرای همه اپلیکیشن‌ها به صورت همزمان
npm run dev

# ساخت همه پروژه‌ها
npm run build

# Lint تمام پروژه‌ها
npm run lint

# فرمت کردن کدها
npm run format

# Docker commands
npm run docker:dev      # راه‌اندازی با Docker
npm run docker:down     # خاموش کردن
npm run docker:rebuild  # rebuild و راه‌اندازی مجدد
```

### Backend
```bash
cd apps/backend
npm run dev      # اجرا در حالت توسعه
npm run build    # ساخت TypeScript
npm run start    # اجرای نسخه production
npm run lint     # بررسی کد
```

### Dashboard
```bash
cd apps/dashboard
npm run dev      # اجرا در حالت توسعه
npm run build    # ساخت برای production
npm run preview  # پیش‌نمایش نسخه build
npm run lint     # بررسی کد
```

### Frontend
```bash
cd apps/frontend
npm run dev      # اجرا در حالت توسعه
npm run build    # ساخت برای production
npm run start    # اجرای نسخه production
npm run lint     # بررسی کد
```

## ساختار دیتابیس

### Collections اصلی:
- **users**: اطلاعات کاربران و ادمین‌ها
- **categories**: دسته‌بندی‌ها (برنامه‌نویسی و ادبیات الکترونیک)
- **courses**: آموزش‌ها/کتاب‌های آموزشی
- **lessons**: درس‌های هر آموزش
- **articles**: مقالات
- **comments**: نظرات کاربران
- **quizzes**: آزمون‌ها و کوئیزها
- **progress**: پیگیری پیشرفت کاربران

## API Endpoints

### Authentication
- `POST /api/auth/register` - ثبت‌نام کاربر جدید
- `POST /api/auth/login` - ورود کاربر
- `POST /api/auth/refresh` - تازه‌سازی توکن
- `POST /api/auth/logout` - خروج کاربر
- `GET /api/auth/me` - دریافت اطلاعات کاربر

### Courses
- `GET /api/courses` - لیست آموزش‌ها (با فیلتر و جستجو)
- `GET /api/courses/:slug` - جزئیات یک آموزش
- `POST /api/courses` - ایجاد آموزش جدید (فقط ادمین)
- `PUT /api/courses/:id` - ویرایش آموزش (فقط ادمین)
- `DELETE /api/courses/:id` - حذف آموزش (فقط ادمین)

## متغیرهای محیطی

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/codabiat
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
REFRESH_TOKEN_SECRET=your_refresh_secret
REFRESH_TOKEN_EXPIRE=30d
CORS_ORIGIN=http://localhost:3000,http://localhost:5173
```

### Frontend (.env)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Dashboard (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## امنیت

- ✅ JWT & Refresh Token برای احراز هویت
- ✅ Hash کردن رمز عبور با bcrypt
- ✅ Rate Limiting برای جلوگیری از حملات
- ✅ Helmet.js برای امنیت Headers
- ✅ CORS Configuration
- ✅ Input Validation با express-validator
- ✅ XSS Protection
- ✅ Environment Variables

## ویژگی‌های خاص

### اجرای کد در مرورگر
کاربران می‌توانند کدهای JavaScript، TypeScript، React و Node.js را مستقیماً در مرورگر اجرا کنند بدون نیاز به نصب ابزار خاص.

### نُت‌های تعاملی
ادمین می‌تواند در هر بخش از آموزش، نکات خاص را به صورت کادرهای رنگی و جذاب اضافه کند:
- 💡 **Info**: اطلاعات مفید
- ⚠️ **Warning**: هشدارها
- ✨ **Tip**: نکات کاربردی
- ❗ **Important**: نکات مهم

### سیستم پیشرفت
هر کاربر می‌تواند پیشرفت خود را در هر آموزش مشاهده کند و مشخص می‌شود چه درصدی از آموزش را تکمیل کرده است.

## مشارکت در پروژه

1. Fork کردن پروژه
2. ایجاد branch جدید (`git checkout -b feature/AmazingFeature`)
3. Commit کردن تغییرات (`git commit -m 'Add some AmazingFeature'`)
4. Push کردن به branch (`git push origin feature/AmazingFeature`)
5. ایجاد Pull Request

## لایسنس

این پروژه تحت لایسنس MIT منتشر شده است.

## پشتیبانی

برای گزارش باگ‌ها یا درخواست ویژگی‌های جدید، لطفاً یک Issue ایجاد کنید.

## نقشه راه توسعه

- [ ] پشتیبانی از زبان‌های برنامه‌نویسی بیشتر (Python، Java، C++، ...)
- [ ] سیستم گواهینامه و نشان‌ها
- [ ] اپلیکیشن موبایل (React Native)
- [ ] حالت Dark Mode
- [ ] چندزبانه‌سازی (i18n)
- [ ] یکپارچه‌سازی با GitHub
- [ ] ویرایشگر کد آنلاین پیشرفته‌تر
- [ ] سیستم Live Coding با WebSocket
- [ ] یکپارچه‌سازی با AI برای پاسخ به سوالات

---

ساخته شده با ❤️ برای جامعه برنامه‌نویسی فارسی‌زبان
