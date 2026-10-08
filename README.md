# الذهب العُماني - لوحة متابعة أسعار الذهب

منصة SPA لمتابعة أسعار الذهب في سلطنة عمان.

**رابط المشروع:** https://github.com/maryamsulimanlrwhi99/gold-prices-oman

## المميزات
- عرض أسعار العيارات المختلفة
- حاسبة الذهب
- رسم بياني
- جدول سجل تاريخي
- تصميم RTL متجاوب

## التقنيات المستخدمة
- Angular 17
- TypeScript
- Tailwind CSS

## هيكل المشروع

src/app/
├── services/gold.ts
├── http://app.ts
├── http://app.config.ts
└── http://app.routes.ts


## المكونات

### Header (شريط التنقل)
شعار الموقع وزر تغيير الثيم

### Hero (الواجهة الرئيسية)
عنوان المنصة ووصف مختصر

### Prices (قسم الأسعار)
حاوية تعرض بطاقات الأسعار

### PriceCard (بطاقة السعر)
تعرض سعر كل عيار

### Calculator (حاسبة الذهب)
حساب القيمة حسب الوزن

### Chart (الرسم البياني)
تطور الأسعار 30 يوم

### HistoryTable (جدول السجل)
سجل الأسعار اليومية

### Footer (التذييل)
حقوق النشر

## تدفق البيانات
gold.ts -> app.ts -> باقي المكونات

## التثبيت والتشغيل
```bash
npm install
ng serve

http://localhost:4200

إعداد
لا يحتاج API خارجي

---
maryamsulimanlrwhi99 - 2026
