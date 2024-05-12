import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductTableComponent } from './product-table/product-table.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductTableComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      console.log(products);
    });
  }

  onAddProduct() {
    this.router.navigate(['/product']);
  }

}
