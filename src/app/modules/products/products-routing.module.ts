import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodTableComponent } from './pages/food-table/food-table.component';

const routes: Routes = [
    {
        path: '',
        component: FoodTableComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProductsRoutingModule {}
