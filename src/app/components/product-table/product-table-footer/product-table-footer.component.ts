import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pagination } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-table-footer',
  templateUrl: './product-table-footer.component.html',
  styleUrl: './product-table-footer.component.scss'
})
export class ProductTableFooterComponent {

  @Input() pagination: Pagination | undefined;
  @Output() prevPage = new EventEmitter();
  @Output() nextPage = new EventEmitter();

  constructor(private productService: ProductService) {}

  onPrevPage() {
  }

  onNextPage() {
  }

  onItemsPerPageChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const itemsPerPage = Number(selectElement.value);
    this.productService.updateState({ itemsPerPage });
  }
}
