import { CommonModule } from "@angular/common";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ProductService } from "../../services/product.service";
import { SpinnerComponent } from "../../shared/spinner/spinner.component";
import { ProductFormModule } from "../../components/product-form/product-form.module";
import { Product } from "../../models/product.model";

@Component({
  selector: "app-add-edit-product",
  standalone: true,
  imports: [CommonModule, SpinnerComponent,  ProductFormModule],
  templateUrl: "./add-edit-product.component.html",
  styleUrl: "./add-edit-product.component.scss",
})
export class AddEditProductComponent implements OnInit, OnDestroy {
  productId: string | null = null;
  title:string = ''

  private $releaseDateSubscription?: Subscription;
  readonly isLoading = this.productService.isLoading.asReadonly()

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get("id");
    if (this.productId) {
      this.title = 'Editar Producto'
    } else {
      this.title = 'Formulario de Registro'
    }
  }

  ngOnDestroy(): void {
    if (this.$releaseDateSubscription) {
      this.$releaseDateSubscription.unsubscribe();
    }
  }

  onBack(): void {
    this.router.navigate(['/home']);
  }


  onAddProduct(product: Product): void {

    this.productService.createProduct(product).subscribe({
      next: () => {
        this.productService.changePage(1);
        this.router.navigate(['/home'])
      },
      error: (error) => console.error('Error al crear producto:', error)
    });
  }

  onEditProduct(product: Product): void {

  }

}
