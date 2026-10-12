
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div dir="rtl" class="min-h-screen font-sans bg-[#fefbf6] text-black">

      <!-- 1. الهيدر / شريط التنقل -->
      <header class="fixed top-0 w-full bg-white/95 backdrop-blur shadow-sm z-50">
        <div class="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 bg-[#3e2723] rounded-lg flex items-center justify-center text-[#FFD700] font-bold">
              ذ
            </div>

            <span class="font-bold text-[#3e2723]">الذهب العُماني</span>

            <span class="bg-amber-100 text-amber-800 text-[10px] px-2 py-1 rounded-full">
              بيانات تجريبية
            </span>
          </div>

          <nav class="hidden md:flex gap-6 text-sm text-gray-600">
            <a href="#prices" class="hover:text-amber-700">الأسعار</a>
            <a href="#calc" class="hover:text-amber-700">حاسبة الذهب</a>
            <a href="#chart" class="hover:text-amber-700">تغير 30 يوم</a>
            <a href="#table" class="hover:text-amber-700">سجل الأسعار</a>
          </nav>
        </div>
      </header>

      <!-- 2. الواجهة الرئيسية -->
      <section class="bg-gradient-to-br from-[#3e2723] to-[#5d4037] pt-28 pb-8 text-center text-white">
        <div class="max-w-7xl mx-auto px-6">
          <div class="text-xs text-white/60 mb-4">
            الرئيسية / تتبع أسعار الذهب
          </div>

          <h1 class="inline-block bg-[#3e2723] text-[#FFD700] border-2 border-[#FFD700] px-8 py-4 rounded-2xl text-3xl md:text-4xl font-bold">
            تتبع أسعار الذهب في سلطنة عُمان
          </h1>

          <p class="mt-4 text-white/80 text-sm max-w-2xl mx-auto">
            لوحة متابعة لأسعار الذهب في عُمان، مع حاسبة ذكية ورسم بياني لسجل الأسعار.
          </p>

          <div class="mt-6 bg-black/20 rounded-full py-2 px-4 inline-flex flex-wrap justify-center gap-3 md:gap-6 text-xs text-white/80">
            <span>آخر تحديث: {{ today }} - 10:30 ص</span>
            <span>•</span>
            <span>السوق: بيانات تجريبية</span>
          </div>
        </div>
      </section>

      <!-- 3. أسعار اليوم -->
      <section id="prices" class="max-w-7xl mx-auto px-6 py-10">
        <h2 class="text-2xl font-bold text-[#3e2723]">
          أسعار الذهب اليوم
        </h2>

        <p class="text-gray-500 text-sm mt-1 mb-6">
          أسعار تجريبية لكل العيارات المتداولة في سلطنة عُمان
        </p>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div
            *ngFor="let p of priceCards"
            class="bg-white p-6 rounded-2xl shadow border-t-4 border-[#FFD700] text-center"
          >
            <div class="text-gray-500 text-xs">{{ p.label }}</div>

            <div class="text-2xl font-bold mt-2 text-[#3e2723]">
              {{ p.price.toFixed(2) }} ر.ع
            </div>

            <div class="text-[10px] text-gray-500 mt-1">
              سعر الجرام الواحد
            </div>
          </div>
        </div>
      </section>

      <!-- 4. حاسبة الذهب -->
      <section id="calc" class="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-6">

        <div class="bg-white p-8 rounded-2xl shadow">
          <h3 class="font-bold text-xl mb-2 text-[#3e2723]">
            حاسبة الذهب
          </h3>

          <p class="text-xs text-gray-500 mb-6">
            احسب القيمة التقديرية للذهب حسب الوزن والعيار
          </p>

          <label for="karat" class="text-sm">اختر عيار الذهب</label>

          <select
            id="karat"
            name="karat"
            [(ngModel)]="karat"
            class="w-full border-2 border-gray-200 bg-white text-gray-900 p-3 rounded-xl mt-1"
          >
            <option *ngFor="let k of priceCards" [ngValue]="k.karat">
              {{ k.label }} - {{ k.price.toFixed(2) }} ر.ع
            </option>
          </select>

          <label for="weight" class="text-sm mt-4 block">
            الوزن بالجرام
          </label>

          <input
            id="weight"
            name="weight"
            type="number"
            [(ngModel)]="weight"
            min="0.01"
            step="any"
            placeholder="أدخل الوزن بالجرام"
            class="w-full border-2 border-gray-200 bg-white text-gray-900 p-3 rounded-xl mt-1"
          />

          <p *ngIf="errorMessage" class="text-red-600 text-sm mt-2">
            {{ errorMessage }}
          </p>

          <button
            type="button"
            (click)="calc()"
            class="w-full bg-[#3e2723] hover:bg-[#5d4037] text-[#FFD700] py-3 rounded-xl mt-5 font-bold transition-colors"
          >
            احسب القيمة
          </button>

          <div
            *ngIf="result === null"
            class="mt-6 p-6 bg-gray-50 rounded-xl text-center text-gray-500 text-sm border-2 border-dashed border-gray-200"
          >
            أدخل الوزن واختر العيار ثم اضغط على زر الحساب
          </div>

          <div
            *ngIf="result !== null"
            class="mt-6 p-6 bg-amber-50 rounded-xl text-center border-2 border-dashed border-amber-300"
          >
            <div class="text-sm text-gray-600">
              القيمة الإجمالية التقديرية
            </div>

            <div class="text-4xl font-bold text-[#3e2723] mt-2">
              {{ result.toFixed(2) }}
              <span class="text-lg">ر.ع</span>
            </div>

            <div class="text-xs text-gray-500 mt-2">
              {{ weight }} جرام - عيار {{ karat }}
            </div>
          </div>

          <p class="text-xs text-gray-500 mt-4">
            القيمة تقديرية ولا تشمل المصنعية أو الضرائب أو أي رسوم إضافية.
          </p>
        </div>

        <!-- 5. تغير أسعار الذهب -->
        <div id="chart" class="bg-white p-8 rounded-2xl shadow">
          <h3 class="font-bold text-xl text-[#3e2723]">
            تغير أسعار الذهب خلال آخر 30 يومًا
          </h3>

          <div class="flex flex-wrap gap-2 mt-4">
            <button
              *ngFor="let k of [24, 22, 21, 18]"
              type="button"
              (click)="activeKarat = k"
              [ngClass]="activeKarat === k
                ? 'bg-[#3e2723] text-[#FFD700] border-[#3e2723]'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-amber-50'"
              class="px-4 py-2 rounded-full text-sm border transition-colors"
            >
              {{ k }} قيراط
            </button>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
            <div class="bg-gray-50 p-3 rounded-xl text-center">
              <div class="text-xs text-gray-500">السعر الحالي</div>
              <div class="font-bold text-[#3e2723]">
                {{ currentPrice.toFixed(2) }} ر.ع
              </div>
            </div>

            <div class="bg-green-50 p-3 rounded-xl text-center">
              <div class="text-xs text-gray-500">أعلى سعر تجريبي</div>
              <div class="font-bold text-green-700">
                {{ maxPrice.toFixed(2) }} ر.ع
              </div>
            </div>

            <div class="bg-red-50 p-3 rounded-xl text-center">
              <div class="text-xs text-gray-500">أقل سعر تجريبي</div>
              <div class="font-bold text-red-700">
                {{ minPrice.toFixed(2) }} ر.ع
              </div>
            </div>
          </div>

          <svg
            viewBox="0 0 300 110"
            role="img"
            aria-label="رسم بياني تجريبي لتغير أسعار الذهب"
            class="w-full h-36 mt-6"
          >
            <line
              x1="10" y1="100" x2="290" y2="100"
              stroke="#d6d3d1" stroke-width="1"
            />

            <polyline
              [attr.points]="svgPoints"
              fill="none"
              stroke="#D4A900"
              stroke-width="3"
              stroke-linejoin="round"
              stroke-linecap="round"
            />

            <polyline
              [attr.points]="svgPoints"
              fill="none"
              stroke="#3e2723"
              stroke-width="1"
              stroke-dasharray="4 4"
              opacity="0.35"
            />
          </svg>

          <div class="mt-4 text-xs bg-amber-50 text-gray-700 p-3 rounded-xl">
            السعر الحالي: {{ currentPrice.toFixed(2) }} ر.ع
            <br />
            السعر السابق: {{ prevPrice.toFixed(2) }} ر.ع
            <br />
            التغير: {{ diff >= 0 ? '+' : '' }}{{ diff.toFixed(2) }} ر.ع
          </div>

          <p class="text-xs text-gray-500 mt-3">
            الرسم والقيم المعروضة تجريبية وليست بيانات سوق مباشرة.
          </p>
        </div>
      </section>

      <!-- 6. جدول سجل الأسعار -->
      <section id="table" class="max-w-7xl mx-auto px-6 py-10">
        <h3 class="font-bold text-xl text-[#3e2723] mb-4">
          سجل الأسعار لآخر 30 يومًا
        </h3>

        <div class="bg-white rounded-2xl shadow overflow-hidden overflow-x-auto">
          <table class="w-full text-sm min-w-[600px]">
            <thead class="bg-[#3e2723] text-[#FFD700]">
              <tr>
                <th class="p-4">التاريخ</th>
                <th class="p-4">18 قيراط</th>
                <th class="p-4">21 قيراط</th>
                <th class="p-4">22 قيراط</th>
                <th class="p-4">24 قيراط</th>
              </tr>
            </thead>

            <tbody>
              <tr
                *ngFor="let row of history; let i = index"
                [ngClass]="i % 2 === 0 ? 'bg-amber-50' : 'bg-white'"
                class="text-center border-b border-gray-100"
              >
                <td class="p-3">{{ row.date }}</td>
                <td class="p-3">{{ row.p18.toFixed(2) }}</td>
                <td class="p-3">{{ row.p21.toFixed(2) }}</td>
                <td class="p-3">{{ row.p22.toFixed(2) }}</td>
                <td class="p-3 font-bold">{{ row.p24.toFixed(2) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 7. التذييل -->
      <footer class="bg-[#3e2723] text-white/80 text-center py-8 text-sm mt-10">
        <div class="font-bold text-[#FFD700] text-base mb-2">
          الذهب العُماني 🇴🇲
        </div>

        <div>
          جميع حقوق النشر محفوظة © 2026 - لوحة متابعة أسعار الذهب في عُمان
        </div>
      </footer>

    </div>
  `
})
export class App {
  today = new Date().toLocaleDateString('ar-OM');

  karat = 21;
  weight: number | null = null;
  result: number | null = null;
  errorMessage = '';

  activeKarat = 21;

  priceCards = [
    { karat: 24, label: 'عيار 24', price: 31.2 },
    { karat: 22, label: 'عيار 22', price: 28.6 },
    { karat: 21, label: 'عيار 21', price: 27.3 },
    { karat: 18, label: 'عيار 18', price: 23.4 }
  ];

  // بيانات تاريخية تجريبية وليست أسعارًا فعلية
  history = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);

    const variation = (day: number, base: number) =>
      Number((base + Math.sin(day * 0.7) * 0.3 + Math.cos(day * 0.3) * 0.15).toFixed(2));

    return {
      date: date.toLocaleDateString('ar-OM'),
      p18: variation(i, 23.4),
      p21: variation(i, 27.3),
      p22: variation(i, 28.6),
      p24: variation(i, 31.2)
    };
  });

  get currentPrice(): number {
    return this.priceCards.find(p => p.karat === this.activeKarat)?.price ?? 0;
  }

  get maxPrice(): number {
    return Number((this.currentPrice + 1.2).toFixed(2));
  }

  get minPrice(): number {
    return Number((this.currentPrice - 0.8).toFixed(2));
  }

  get prevPrice(): number {
    return Number((this.currentPrice - 0.2).toFixed(2));
  }

  get diff(): number {
    return Number((this.currentPrice - this.prevPrice).toFixed(2));
  }

  get svgPoints(): string {
    const values = [
      55, 48, 62, 40, 45, 30, 38, 52, 34, 42,
      25, 36, 48, 32, 40, 22, 30, 38, 26, 33
    ];

    return values
      .map((value, index) => {
        const x = 10 + index * (280 / (values.length - 1));
        return `${x},${value}`;
      })
      .join(' ');
  }

  calc(): void {
    this.errorMessage = '';
    this.result = null;

    if (
      this.weight === null ||
      !Number.isFinite(this.weight) ||
      this.weight <= 0
    ) {
      this.errorMessage = 'يرجى إدخال وزن صحيح أكبر من صفر.';
      return;
    }

    const selectedPrice = this.priceCards.find(
      p => p.karat === Number(this.karat)
    );

    if (!selectedPrice) {
      this.errorMessage = 'يرجى اختيار عيار ذهب صحيح.';
      return;
    }

    this.result = Number((selectedPrice.price * this.weight).toFixed(2));
  }
}