import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { Product, ProductPage } from '../../models/product.model';
import { Subscription } from 'rxjs';
import { ProductTableModule } from '../../components/product-table/product-table.module';
import { ModalConfirmationComponent } from '../../shared/modal-confirmation/modal-confirmation.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductTableModule, ModalConfirmationComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit, OnDestroy {

  readonly isLoaded = this.productService.isLoading.asReadonly()
  showConfirmationDeleteModal = false;
  productToDeleteAux!: Product;

  productPage: ProductPage = new ProductPage();
  private $stateSub!: Subscription;


  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.$stateSub = this.productService.getState().subscribe((state) => {
      this.productService.getProducts(state.itemsPerPage, state.page).subscribe((productPage) => {
        this.productPage = productPage;
      });
    });

  }

  onAddProduct() {
    this.router.navigate(['/product']);
  }

  ngOnDestroy(): void {
    if (this.$stateSub) {
      this.$stateSub.unsubscribe();
    }
  }

  onEditProduct(productId: string) {
    this.router.navigate(['/product', productId])
  }

  onShowConfirmationDelteModal(product: Product) {
    this.productToDeleteAux = product;
    this.showConfirmationDeleteModal = true;
  }

  onDeleteProduct(productId: string) {
    this.showConfirmationDeleteModal = false;

    this.productService.deleteProduct(productId).subscribe({
      next: () => {
        this.productService.changePage(1);
      },
      error: (error) => {
        console.error('Error deleting product', error);
      }
    });
  }

}
