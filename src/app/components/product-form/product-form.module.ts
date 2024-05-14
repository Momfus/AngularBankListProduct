
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductFormComponent } from './add-product-form/add-product-form.component';
import { EditProductFormComponent } from './edit-product-form/edit-product-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddProductFormComponent,
    EditProductFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    AddProductFormComponent,
    EditProductFormComponent
  ]
})
export class ProductFormModule { }
