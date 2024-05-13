import { Component, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.scss',
})
export class ProductTableComponent {

  readonly isLoaded = this.productService.isLoading.asReadonly()

  @Input() products: Product[] = [];
  @Input() totalProducts: number = 0;
  @Input() totalPages: number = 0;
  @Output() editProduct = new EventEmitter();
  @Output() deleteProduct = new EventEmitter();

  currentPage: number = 1;
  selectedProduct: Product | null = null;

  isScreenLarge: boolean = window.innerWidth > 1000;
  menuPosition = { top: 0, left: 0 };

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

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
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


}
