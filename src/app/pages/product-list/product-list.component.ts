import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductTableComponent } from './product-table/product-table.component';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductTableComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  private productsSub!: Subscription; // Crea una propiedad para la suscripción


  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productsSub = this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  onAddProduct() {
    this.router.navigate(['/product']);
  }

  ngOnDestroy(): void { // Implementa ngOnDestroy
    if (this.productsSub) { // Si existe la suscripción
      this.productsSub.unsubscribe(); // Desuscríbete
    }
  }

  onEditProduct(product: Product) {
    console.log('Edit product', product);
  }

  onDeleteProduct(product: Product) {
    console.log('Delete product', product);
  }

}
