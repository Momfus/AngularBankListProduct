import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Pagination } from "../../../models/product.model";
import { ProductService } from "../../../services/product.service";

@Component({
  selector: "app-product-table-footer",
  templateUrl: "./product-table-footer.component.html",
  styleUrl: "./product-table-footer.component.scss",
})
export class ProductTableFooterComponent implements OnInit {
  @Input() pagination: Pagination | undefined;
  @Output() changePage = new EventEmitter();

  itemsPerPageOptions = [5, 10, 20];
  defaultPerPageValue!: number;
  constructor(private productService: ProductService) {}

  ngOnInit() {
    console.log(this.pagination?.itemsPerPage);

    this.defaultPerPageValue = this.pagination?.itemsPerPage || 10;
  }

  onPrevPage() {
    if (this.pagination && this.pagination.currentPage > 1) {
      this.changePage.emit(this.pagination.currentPage - 1);
    }
  }

  onNextPage() {
    if (
      this.pagination &&
      this.pagination.currentPage < this.pagination.totalPages
    ) {
      this.changePage.emit(this.pagination.currentPage + 1);
    }
  }

  generatePageNumbers() {
    const currentPage = this.pagination?.currentPage || 1;
    const totalPages = this.pagination?.totalPages || 1;
    const pageNumbers = [];

    pageNumbers.push(1);


    if (currentPage > 2) {
      pageNumbers.push('...');
    }


    if (currentPage > 1 && currentPage < totalPages) {
      pageNumbers.push(currentPage);
    }


    if (currentPage < totalPages - 1) {
      pageNumbers.push('...');
    }

    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  }

  onItemsPerPageChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const itemsPerPage = Number(selectElement.value);
    this.productService.updateState({ itemsPerPage });
  }

  onPageNumberClick(page: number | string) {
    if (typeof page === 'number') {
      this.changePage.emit(page);
    }
  }
}
