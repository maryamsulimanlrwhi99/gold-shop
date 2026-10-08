import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
selector: 'app-root',
standalone: true,
imports: [CommonModule, FormsModule],
template: `
<div dir="rtl" class="min-h-screen font-sans" [style.background]="isDark? '#121212' : '#fefbf6'" [style.color]="isDark? 'white' : 'black'">

<!-- 1. الهيدر / شريط التنقل -->
<header class="fixed top-0 w-full bg-white/90 backdrop-blur shadow-sm z-50">
<div class="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
<div class="flex items-center gap-3">
<div class="w-9 h-9 bg-[#3e2723] rounded-lg flex items-center justify-center text-[#FFD700] font-bold">ذ</div>
<span class="font-bold text-[#3e2723]">الذهب العُماني</span>
<span class="bg-amber-100 text-amber-800 text-[10px] px-2 py-1 rounded-full">بيانات تجريبية</span> <button (click)="isDark =!isDark" class="mr-2 px-3 py-1 rounded-full bg-[#3e2723] text-[#FFD700] text-xs">
{{ isDark? '☀️ فاتح' : '🌙 داكن' }}
</button>
</div>
<nav class="hidden md:flex gap-6 text-sm text-gray-600">
<a href="#prices" class="hover:text-amber-700">الأسعار</a>
<a href="#calc" class="hover:text-amber-700">حاسبة الذهب</a>
<a href="#chart" class="hover:text-amber-700">تغير 30 يوم</a>
<a href="#table" class="hover:text-amber-700">سجل الأسعار</a>
</nav>
</div>
</header>

<!-- 2. الواجهة الرئيسية Hero -->
<div class="bg-gradient-to-br from-[#3e2723] to-[#5d4037] pt-28 pb-8 text-center text-white relative">
<div class="max-w-7xl mx-auto px-6">
<div class="text-xs text-white/50 mb-4">الرئيسية / تتبع أسعار الذهب</div>
<h1 class="inline-block bg-[#3e2723] text-[#FFD700] border-2 border-[#FFD700] px-8 py-4 rounded-2xl text-3xl md:text-4xl font-bold">
تتبع اسعار الذهب في سلطنة عمان
</h1>
<p class="mt-4 text-white/70 text-sm max-w-2xl mx-auto">لوحة متابعة شاملة لأسعار الذهب في عمان - عرض مباشر، حاسبة ذكية، ورسم بياني لآخر 30 يوما</p>
<div class="mt-6 bg-black/20 rounded-full py-2 px-4 inline-flex gap-6 text-xs text-white/60">
<span>آخر تحديث: {{today}} - 10:30 ص</span>
<span>•</span>
<span>السوق: مستقر ▲ 0.3%</span>
</div>
</div>
</div>

<!-- 3. أسعار اليوم -->
<section id="prices" class="max-w-7xl mx-auto px-6 py-10">
<h2 class="text-2xl font-bold text-[#3e2723]">أسعار الذهب اليوم</h2>
<p class="text-gray-500 text-sm mt-1 mb-6">أسعار محدثة لكل العيارات المتداولة في سلطنة عمان</p>
<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
<div *ngFor="let p of priceCards" class="bg-white p-6 rounded-2xl shadow border-t-4 border-[#FFD700] text-center">
<div class="text-gray-400 text-xs">{{p.label}}</div>
<div class="text-2xl font-bold mt-2 text-[#3e2723]">{{p.price}} ر.ع</div>
<div class="text-[10px] text-gray-400 mt-1">لكل جرام / ر.ع</div>
</div>
</div>
</section>

<!-- 4. حاسبة الذهب -->
<section id="calc" class="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-6">
<div class="bg-white p-8 rounded-2xl shadow">
<h3 class="font-bold text-xl mb-2">حاسبة الذهب</h3>
<p class="text-xs text-gray-400 mb-6">احسب القيمة التقديرية حسب الوزن والعيار</p>
<label class="text-sm">اختر عيار الذهب</label>
<select [(ngModel)]="karat" class="w-full border-2 p-3 rounded-xl mt-1">
<option *ngFor="let k of priceCards" [value]="k.karat">{{k.label}} - {{k.price}} ر.ع</option>
</select>
<label class="text-sm mt-4 block">الوزن بالجرام</label>
<input type="number" [(ngModel)]="weight" placeholder="أدخل الوزن بالجرام" class="w-full border-2 p-3 rounded-xl mt-1">
<button (click)="calc()" class="w-full bg-[#3e2723] text-[#FFD700] py-3 rounded-xl mt-5 font-bold">احسب</button>

<div *ngIf="!result" class="mt-6 p-6 bg-gray-50 rounded-xl text-center text-gray-400 text-sm border-2 border-dashed">لم يتم إجراء عملية حساب بعد - أدخل الوزن واضغط احسب</div>
<div *ngIf="result" class="mt-6 p-6 bg-amber-50 rounded-xl text-center border-2 border-dashed border-amber-300">
<div class="text-sm text-gray-500">القيمة الإجمالية التقديرية</div>
<div class="text-4xl font-bold text-[#3e2723] mt-2">{{result}} <span class="text-lg">ر.ع</span></div>
</div>
</div>

<!-- 5. تغير أسعار 30 يوم -->
<div id="chart" class="bg-white p-8 rounded-2xl shadow">
<h3 class="font-bold text-xl">تغير أسعار الذهب خلال آخر 30 يوما</h3>
<div class="flex gap-2 mt-4">
<button *ngFor="let k of [24,22,21,18]" (click)="activeKarat=k" [class.bg-[#3e2723]]="activeKarat===k" [class.text-[#FFD700]]="activeKarat===k" class="px-4 py-1.5 rounded-full text-sm border">{{k}} قيراط</button>
</div>
<div class="grid grid-cols-3 gap-3 mt-6">
<div class="bg-gray-50 p-3 rounded-xl text-center"><div class="text-[10px] text-gray-400">السعر الحالي</div><div class="font-bold">{{currentPrice}} ر.ع</div></div>
<div class="bg-green-50 p-3 rounded-xl text-center"><div class="text-[10px] text-gray-400">أعلى سعر</div><div class="font-bold text-green-700">{{maxPrice}} ر.ع</div></div>
<div class="bg-red-50 p-3 rounded-xl text-center"><div class="text-[10px] text-gray-400">أقل سعر</div><div class="font-bold text-red-700">{{minPrice}} ر.ع</div></div>
</div>
<svg viewBox="0 0 300 100" class="w-full h-32 mt-6">
<polyline [attr.points]="svgPoints" fill="none" stroke="#FFD700" stroke-width="3" stroke-linejoin="round"/>
<polyline [attr.points]="svgPoints" fill="none" stroke="#3e2723" stroke-width="1" stroke-dasharray="4" opacity="0.3"/>
</svg>
<div class="mt-4 text-xs bg-amber-50 p-3 rounded-xl">السعر الحالي {{currentPrice}} ر.ع، السابق {{prevPrice}} ر.ع، التغير {{diff}} ر.ع ▲</div>
</div>
</section>

<!-- 6. جدول سجل الأسعار -->
<section id="table" class="max-w-7xl mx-auto px-6 py-10">
<h3 class="font-bold text-xl mb-4">جدول سجل الأسعار لآخر 30 يوما</h3>
<div class="bg-white rounded-2xl shadow overflow-hidden overflow-x-auto">
<table class="w-full text-sm min-w-[600px]">
<thead class="bg-[#3e2723] text-[#FFD700]">
<tr><th class="p-4">التاريخ</th><th class="p-4">18 قيراط</th><th class="p-4">21 قيراط</th><th class="p-4">22 قيراط</th><th class="p-4">24 قيراط</th></tr>
</thead>
<tbody>
<tr *ngFor="let row of history; let i=index" [class.bg-amber-50]="i%2===0" class="text-center border-b">
<td class="p-3">{{row.date}}</td>
<td class="p-3">{{row.p18}}</td>
<td class="p-3">{{row.p21}}</td>
<td class="p-3">{{row.p22}}</td>
<td class="p-3 font-bold">{{row.p24}}</td>
</tr>
</tbody>
</table>
</div>
</section>

<footer class="bg-[#3e2723] text-white/60 text-center py-8 text-sm mt-10">
<div class="font-bold text-[#FFD700] text-base mb-2">الذهب العُماني 🇴🇲</div>
<div>جميع حقوق النشر محفوظة © 2026 - لوحة متابعة أسعار الذهب في عمان</div>
</footer>
</div>
`
})
export class App { isDark = false;
today = new Date().toLocaleDateString('ar-OM');
karat = 21; weight:any=''; result:any=null;
activeKarat = 21;
priceCards = [
{ karat:24, label:'عيار 24', price:31.2 },
{ karat:22, label:'عيار 22', price:28.6 },
{ karat:21, label:'عيار 21', price:27.3 },
{ karat:18, label:'عيار 18', price:23.4 },
];
history = Array.from({length:30}, (_,i)=>{
const d = new Date(); d.setDate(d.getDate()-i);
return { date: d.toLocaleDateString('ar-OM'), p18:(23.4 + Math.random()).toFixed(2), p21:(27.3+Math.random()).toFixed(2), p22:(28.6+Math.random()).toFixed(2), p24:(31.2+Math.random()).toFixed(2) }
});
get currentPrice(){ return this.priceCards.find(p=>p.karat===this.activeKarat)?.price }
get maxPrice(){ return (Number(this.currentPrice)+1.2).toFixed(1) }
get minPrice(){ return (Number(this.currentPrice)-0.8).toFixed(1) }
get prevPrice(){ return (Number(this.currentPrice)-0.2).toFixed(1) }
get diff(){ return (Number(this.currentPrice)-Number(this.prevPrice)).toFixed(2) }
get svgPoints(){ return [20,30,45,50,35,70,60,40,80,60,100,30,120,50,140,20,160,35,180,10,200,25,220,15,240,30,260,20,280,25].map((v,i)=> i%2===0? v : 100-v).reduce((acc,_,i,arr)=> i%2===0? acc+arr[i]+','+arr[i+1]+' ' : acc,'') }
calc(){ if(this.weight){ const pr = this.priceCards.find(p=>p.karat==this.karat)!.price; this.result=(pr*this.weight).toFixed(2) } }
}
