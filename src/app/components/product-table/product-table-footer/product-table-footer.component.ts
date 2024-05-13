import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pagination } from '../../../models/product.model';

@Component({
  selector: 'app-product-table-footer',
  templateUrl: './product-table-footer.component.html',
  styleUrl: './product-table-footer.component.scss'
})
export class ProductTableFooterComponent {

  @Input() pagination: Pagination | undefined;
  @Output() prevPage = new EventEmitter();
  @Output() nextPage = new EventEmitter();

  onPrevPage() {
  }

  onNextPage() {
  }
}
