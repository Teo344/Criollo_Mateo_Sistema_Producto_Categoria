import { Routes } from '@angular/router';
import { ProductList } from './pages/products/product-list/product-list';
import { ProductForm } from './pages/products/product-form/product-form';
import { Home } from './home/home';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: 'home', component:Home},
  { path: 'products', component: ProductList },
  {path: 'products/new', component: ProductForm},
  {path: 'products/edit/:id', component:ProductForm},

  {path: '**', redirectTo: 'home'}


];
