import { Component, Input } from '@angular/core';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.scss'
})
export class ProductTableComponent {

  @Input() products: Product[] = [];
  @Input() totalProducts: number = 0;
  @Input() totalPages: number = 0;
  currentPage: number = 1;
  showMenu: boolean = false;

  readonly isLoaded = this.productService.isLoading.asReadonly()

  constructor(
    private productService: ProductService,
  ) {}

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
