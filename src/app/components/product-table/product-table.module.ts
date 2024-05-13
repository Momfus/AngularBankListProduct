
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductTableComponent } from './product-table.component';
import { ProductTableActionMenuComponent } from './product-table-action-menu/product-table-action-menu.component';
import { ProductTableFooterComponent } from './product-table-footer/product-table-footer.component';
import { ProductTableSkeletonLoaderComponent } from './product-table-skeleton-loader/product-table-skeleton-loader.component';

@NgModule({
  declarations: [ProductTableComponent, ProductTableActionMenuComponent, ProductTableFooterComponent],
  imports: [
    CommonModule,
    ProductTableSkeletonLoaderComponent
  ],
  exports: [
    ProductTableComponent,
  ]
})
export class ProductTableModule { }
