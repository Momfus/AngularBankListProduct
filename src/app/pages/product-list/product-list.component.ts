import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { Product, ProductPage } from '../../models/product.model';
import { Subscription } from 'rxjs';
import { ProductTableModule } from '../../components/product-table/product-table.module';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductTableModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit, OnDestroy {

  productPage: ProductPage = new ProductPage();

  private $productsSub!: Subscription;


  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.$productsSub = this.productService.getProducts(5, 1).subscribe((productPage) => {
      this.productPage = productPage;
      console.log('Product page', this.productPage);

    });
  }

  onAddProduct() {
    this.router.navigate(['/product']);
  }

  ngOnDestroy(): void { // Implementa ngOnDestroy
    if (this.$productsSub) { // Si existe la suscripción
      this.$productsSub.unsubscribe(); // Desuscríbete
    }
  }

  onEditProduct(product: Product) {
    console.log('Edit product', product);
  }

  onDeleteProduct(product: Product) {
    console.log('Delete product', product);
  }

}
