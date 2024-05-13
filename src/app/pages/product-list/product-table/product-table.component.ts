import { Component, Input, Renderer2, ViewEncapsulation } from '@angular/core';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ProductTableComponent {

  @Input() products: Product[] = [];
  @Input() totalProducts: number = 0;
  @Input() totalPages: number = 0;
  currentPage: number = 1;

  showMenu: boolean = false;
  isScreenLarge: boolean = window.innerWidth > 1000;

  readonly isLoaded = this.productService.isLoading.asReadonly()

  constructor(
    private productService: ProductService,
    private renderer: Renderer2
  ) {
    this.renderer.listen('window', 'resize', (event) => {
      this.isScreenLarge = event.target.innerWidth > 900;
    });
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
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


}
