import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessGuard } from './core/guards/access.guard';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { YourDietComponent } from './modules/your-diet/your-diet.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
    {
        path: 'home',
        loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule),
    },
    {
        path: 'about',
        loadChildren: () => import('./modules/about/about.module').then((m) => m.AboutModule),
    },
    {
        path: 'auth',
        component: AuthLayoutComponent,
        loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
    },
    {
        path: 'products',
        loadChildren: () =>
            import('./modules/products/products.module').then((m) => m.ProductsModule),
        canActivate: [AccessGuard],
    },
    {
        path: 'your-diet',
        component: YourDietComponent,
        canActivate: [AccessGuard],
    },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
