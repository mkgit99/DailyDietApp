import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './components/about/about.component';
import { DailyDietPageComponent } from './components/daily-diet-page/daily-diet-page.component';
import { ProductsPageComponent } from './components/products-page/products-page.component';



@NgModule({
  declarations: [
    AboutComponent,
    DailyDietPageComponent,
    ProductsPageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
