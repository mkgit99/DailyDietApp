import { NgModule } from '@angular/core';

import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { FoodTableComponent } from './pages/food-table/food-table.component';
import { FoodDialogComponent } from './pages/food-dialog/food-dialog.component';

@NgModule({
    declarations: [FoodTableComponent, FoodDialogComponent],
    imports: [ProductsRoutingModule, SharedModule],
})
export class ProductsModule {}
