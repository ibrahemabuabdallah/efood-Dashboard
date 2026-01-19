# دليل الإعداد والتشغيل - رحيق

## متطلبات النظام

- Node.js 18+ 
- MongoDB (محلي أو MongoDB Atlas)
- npm أو yarn

## خطوات الإعداد

### 1. إعداد Backend

```bash
cd backend
npm install

# إنشاء ملف .env
cp .env.example .env

# تعديل .env وإضافة المتغيرات المطلوبة
```

ملف `.env` يجب أن يحتوي على:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/raheeq
JWT_SECRET=your-secret-key-here
FRONTEND_URL=http://localhost:3000
```

تشغيل Backend:
```bash
npm run dev
```

### 2. إعداد Frontend

```bash
cd frontend
npm install
```

تشغيل Frontend:
```bash
npm run dev
```

الموقع سيكون متاحاً على: http://localhost:3000
API سيكون متاحاً على: http://localhost:5000

## الميزات المطبقة

### ✅ Frontend
- [x] الصفحة الرئيسية مع جميع المكونات
- [x] صفحة المنتجات مع الفلترة والترتيب
- [x] صفحة تفاصيل المنتج
- [x] نظام المصادقة (تسجيل الدخول عبر WhatsApp)
- [x] سلة التسوق
- [x] صفحة الدفع
- [x] لوحة التحكم الإدارية (Dashboard)
- [x] Context API للمصادقة والسلة
- [x] Tailwind CSS للتنسيق
- [x] Framer Motion للحركات

### ✅ Backend
- [x] Models (User, Product, Category, Order, Review)
- [x] Authentication APIs (send code, verify code)
- [x] Product APIs (CRUD)
- [x] Order APIs (create, get, update status)
- [x] Admin APIs (stats, reports)
- [x] JWT Authentication
- [x] Middleware للأمان والصلاحيات
- [x] WhatsApp service (placeholder)

## الميزات المتبقية (قيد التطوير)

- [ ] إدارة المنتجات الكاملة (CRUD) في لوحة التحكم
- [ ] إدارة الطلبات التفصيلية
- [ ] إدارة العملاء
- [ ] رفع الصور (Cloudinary/S3)
- [ ] تكامل WhatsApp API الفعلي
- [ ] نظام التقييمات والمراجعات
- [ ] المفضلة
- [ ] كوبونات الخصم
- [ ] البحث المتقدم
- [ ] إشعارات البريد الإلكتروني

## بنية المشروع

```
honey-store/
├── frontend/
│   ├── src/
│   │   ├── components/      # مكونات React
│   │   ├── pages/           # الصفحات
│   │   ├── context/         # Context API
│   │   ├── services/        # API services
│   │   └── ...
│   └── package.json
│
├── backend/
│   ├── controllers/         # Business logic
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API routes
│   ├── middleware/          # Auth, validation
│   ├── services/            # External services
│   └── server.js
│
└── README.md
```

## APIs المتاحة

### Authentication
- `POST /api/auth/send-code` - إرسال رمز التحقق
- `POST /api/auth/verify-code` - التحقق من الرمز
- `POST /api/auth/resend-code` - إعادة إرسال الرمز

### Products
- `GET /api/products` - جميع المنتجات (مع فلترة)
- `GET /api/products/:id` - منتج واحد
- `POST /api/products` - إنشاء منتج (Admin)
- `PUT /api/products/:id` - تحديث منتج (Admin)
- `DELETE /api/products/:id` - حذف منتج (Admin)

### Orders
- `POST /api/orders` - إنشاء طلب (Auth)
- `GET /api/orders` - طلبات المستخدم (Auth)
- `GET /api/orders/:id` - طلب واحد (Auth)
- `PUT /api/orders/:id/status` - تحديث حالة (Admin)

### Admin
- `GET /api/admin/stats` - إحصائيات اللوحة
- `GET /api/admin/orders` - جميع الطلبات
- `GET /api/admin/users` - جميع المستخدمين
- `GET /api/admin/reports` - تقارير المبيعات

## ملاحظات مهمة

1. **WhatsApp API**: حالياً placeholder فقط - يحتاج تكامل فعلي
2. **رفع الصور**: لم يتم تطبيقه بعد - يحتاج Cloudinary/S3
3. **Payment Gateway**: لم يتم تطبيقه بعد
4. **Environment Variables**: تأكد من تعبئة جميع المتغيرات في `.env`

## الدعم

للمساعدة أو الاستفسارات، راجع خطة المشروع في `plan.md`
