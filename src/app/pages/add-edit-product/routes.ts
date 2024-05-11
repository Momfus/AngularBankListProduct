import { Route } from "@angular/router";
import { AddEditProductComponent } from "./add-edit-product.component";


export const ADD_EDIT_ROUTES: Route[] = [
   {
      path: '',
      component: AddEditProductComponent
   },
   {
      path: ':id',
      component: AddEditProductComponent
   },
]
