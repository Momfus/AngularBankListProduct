import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Pagination } from "../../../models/product.model";
import { ProductService } from "../../../services/product.service";

@Component({
  selector: "app-product-table-footer",
  templateUrl: "./product-table-footer.component.html",
  styleUrl: "./product-table-footer.component.scss",
})
export class ProductTableFooterComponent {
  @Input() pagination: Pagination | undefined;
  @Output() changePage = new EventEmitter();

  itemsPerPageOptions = [5, 10, 20];

  constructor(private productService: ProductService) {}

  onPrevPage() {
    if (this.pagination && this.pagination.currentPage > 1) {
      this.changePage.emit(this.pagination.currentPage - 1);
    }
  }

  onNextPage() {
    if (this.pagination && this.pagination.currentPage < this.pagination.totalPages) {
      this.changePage.emit(this.pagination.currentPage + 1);
    }
  }

  generatePageNumbers() {
    const currentPage = this.pagination?.currentPage || 1;
    const totalPages = this.pagination?.totalPages || 1;
    const pageNumbers = [];

    for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  }

  onItemsPerPageChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const itemsPerPage = Number(selectElement.value);
    this.productService.updateState({ itemsPerPage });
  }

  onPageNumberClick(page: number) {
    this.changePage.emit(page);
  }
}
