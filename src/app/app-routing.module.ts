import { Routes } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: ProductListComponent,
  },
  {
    path: 'product',
    loadChildren: () =>
      import('./pages/add-edit-product/routes').then(
        (mod) => mod.ADD_EDIT_ROUTES
      ),
  },

];
