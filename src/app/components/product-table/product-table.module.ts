
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductTableComponent } from './product-table.component';
import { ProductTableActionMenuComponent } from './product-table-action-menu/product-table-action-menu.component';
import { ProductTableFooterComponent } from './product-table-footer/product-table-footer.component';
import { ProductTableSkeletonLoaderComponent } from './product-table-skeleton-loader/product-table-skeleton-loader.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProductTableComponent, ProductTableActionMenuComponent, ProductTableFooterComponent],
  imports: [
    CommonModule,
    FormsModule,
    ProductTableSkeletonLoaderComponent,
  ],
  exports: [
    ProductTableComponent,
  ]
})
export class ProductTableModule { }
