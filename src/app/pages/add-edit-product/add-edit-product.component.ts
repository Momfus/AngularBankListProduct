import { CommonModule, formatDate } from "@angular/common";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { releaseDateValidator } from "../../../utils/validators";
import { Product } from "../../models/product.model";
import { ProductService } from "../../services/product.service";
import { SpinnerComponent } from "../../shared/spinner/spinner.component";

@Component({
  selector: "app-add-edit-product",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SpinnerComponent],
  templateUrl: "./add-edit-product.component.html",
  styleUrl: "./add-edit-product.component.scss",
})
export class AddEditProductComponent implements OnInit, OnDestroy {
  productId: string | null = null;
  today: string;

  private $releaseDateSubscription?: Subscription;
  readonly isLoading = this.productService.isLoading.asReadonly()

  form = this.fb.group({
    id: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
    ],
    name: [
      "",
      [Validators.required, Validators.minLength(5), Validators.maxLength(100)],
    ],
    description: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
    logo: ["", Validators.required],
    date_release: [formatDate(new Date(), 'yyyy-MM-dd', 'en-US'), [Validators.required, releaseDateValidator()]],
    date_revision: [{ value: "", disabled: true }],
  });

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private productService: ProductService) {
    let todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    this.today = formatDate(todayDate, 'yyyy-MM-dd', 'en-US');
    console.log(this.today);

  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get("id");
    if (this.productId) {
      console.log("Edit");
    } else {
      console.log("New");
    }

    this.subscribeToReleaseDateChanges();
    this.form.get('date_release')?.setValue(formatDate(new Date(), 'yyyy-MM-dd', 'en-US'));
  }

  ngOnDestroy(): void {
    if (this.$releaseDateSubscription) {
      this.$releaseDateSubscription.unsubscribe();
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formValue = this.form.value;
      const product: Product = {
        id: formValue.id || '',
        name: formValue.name || '',
        description: formValue.description || '',
        logo: formValue.logo || '',
        date_release: new Date(formValue.date_release || Date.now()),
        date_revision: new Date(formValue.date_revision || Date.now()),
      };

      this.productService.createProduct(product).subscribe({
        next: () => {
          this.productService.changePage(1);
          this.router.navigate(['/home'])
        },
        error: (error) => console.error('Error al crear producto:', error)
      });
    } else {
      console.error("Form is invalid");
    }
  }

  onBack(): void {
    this.router.navigate(['/home']);
  }

  /**
   * Subscribe to changes in the releaseDate field of the form.
   * When the releaseDate changes, set the reviewDate to be one year after the new releaseDate.
   */
  private subscribeToReleaseDateChanges(): void {
    this.form.get("date_release")?.valueChanges.subscribe((val) => {
      if (val) {
        let releaseDateParts = val.split('-').map(part => parseInt(part, 10));
        let reviewDate = new Date(releaseDateParts[0] + 1, releaseDateParts[1] - 1, releaseDateParts[2]);
        let formattedDate = formatDate(reviewDate, 'yyyy-MM-dd', 'en-US');
        this.form.get("date_revision")?.setValue(formattedDate);
      }
    });
  }


}
