export interface Product {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: Date;
  date_revision: Date;
}

export interface Pagination {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export class ProductPage {
  products: Product[];
  pagination: Pagination;

  constructor(
    products: Product[] = [],
    pagination: Pagination = {
      currentPage: 0,
      itemsPerPage: 5,
      totalItems: 0,
      totalPages: 0,
    }
  ) {
    this.products = products;
    this.pagination = pagination;
  }
}
