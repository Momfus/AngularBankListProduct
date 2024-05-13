import { Component, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { Pagination, Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { Position } from '../../models/miscellaneous.model';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.scss',
})
export class ProductTableComponent {

  readonly isLoaded = this.productService.isLoading.asReadonly()

  @Input() products!: Product[] | undefined;
  @Input() pagination!: Pagination | undefined;
  @Output() editProduct = new EventEmitter();
  @Output() deleteProduct = new EventEmitter();

  currentPage: number = 1;
  selectedProduct: Product | null = null;

  isScreenLarge: boolean = window.innerWidth > 1000;
  menuPosition: Position = { top: 0, left: 0 };

  constructor(
    private productService: ProductService,
    private renderer: Renderer2
  ) {

    // Listener to detect screen size
    this.renderer.listen('window', 'resize', (event) => {
      this.isScreenLarge = event.target.innerWidth > 900;
    });

    // Listener to close menu when clicking outside
    this.renderer.listen('document', 'click', (event) => {
      if (!event.target.closest('.menu') && !event.target.closest('.btn-action')) {
        this.selectedProduct = null;
      }
    });
  }

  toggleMenu(product: Product, target: EventTarget | null) {
    if (target instanceof HTMLElement) {
      this.selectedProduct = this.selectedProduct === product ? null : product;
      const rect = target.getBoundingClientRect();
      this.menuPosition = { top: rect.top, left: rect.left };
    }
  }

  onEditProduct(product: Product) {
    this.selectedProduct = null;
    this.editProduct.emit(product);
  }

  onDeleteProduct(product: Product) {
    this.selectedProduct = null;
    this.deleteProduct.emit(product);
  }

  onPageChange(page: number) {
    this.productService.changePage(page);
  }


}
