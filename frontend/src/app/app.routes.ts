import { Routes } from '@angular/router';
import { ProductList } from './pages/products/product-list/product-list';
import { ProductForm } from './pages/products/product-form/product-form';
import { Home } from './home/home';
import { CategoryList } from './pages/categories/category-list/category-list';
import { CategoryForm } from './pages/categories/category-form/category-form';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: 'home', component:Home},
  { path: 'products', component: ProductList },
  {path: 'products/new', component: ProductForm},
  {path: 'products/edit/:id', component:ProductForm},
  { path: 'categories', component: CategoryList },
  {path: 'categories/new', component: CategoryForm},
  {path: 'categories/edit/:id', component: CategoryForm},


  {path: '**', redirectTo: 'home'}


];
