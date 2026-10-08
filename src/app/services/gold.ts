import { Injectable } from '@angular/core';
@Injectable({providedIn:'root'})
export class GoldService {
today = [
{karat:24, price:31.20, change:0.15, label:'عيار 24'},
{karat:22, price:28.60, change:-0.05, label:'عيار 22'},
{karat:21, price:27.30, change:0.12, label:'عيار 21'},
{karat:18, price:23.40, change:0.08, label:'عيار 18'},
];
history = Array.from({length:30},(_,i)=>{
const d=new Date(); d.setDate(d.getDate()-29+i);
return {
date:d.toISOString().split('T')[0],
p24:+(31.2-Math.random()*1.5).toFixed(2),
p22:+(28.6-Math.random()*1.3).toFixed(2),
p21:+(27.3-Math.random()*1.2).toFixed(2),
p18:+(23.4-Math.random()*1).toFixed(2),}
});
}
