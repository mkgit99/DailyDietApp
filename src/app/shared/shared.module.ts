import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../core/components/header/header.component';
import { FooterComponent } from '../core/components/footer/footer.component';
import { AboutComponent } from './components/about/about.component';
import { YourProductsPageComponent } from './components/your-products-page/your-products-page.component';
import { DailyDietPageComponent } from './components/daily-diet-page/daily-diet-page.component';
import { ProductsPageComponent } from './components/products-page/products-page.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    YourProductsPageComponent,
    DailyDietPageComponent,
    ProductsPageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
