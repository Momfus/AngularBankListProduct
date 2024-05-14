import { Route } from "@angular/router";
import { AddEditProductComponent } from "./add-edit-product.component";
import { ProductGuard } from "../../guard/product-guard.guard";


export const ADD_EDIT_ROUTES: Route[] = [
   {
      path: '',
      component: AddEditProductComponent
   },
   {
      path: ':id',
      component: AddEditProductComponent,
      canActivate: [ProductGuard]
   },
]
