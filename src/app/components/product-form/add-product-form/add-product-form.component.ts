import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ProductService } from "../../../services/product.service";
import { formatDate } from "@angular/common";
import { releaseDateValidator } from "../../../../utils/validators";
import { Observable, map } from "rxjs";
import { Product } from "../../../models/product.model";

@Component({
  selector: "app-add-product-form",
  standalone: false,
  templateUrl: "./add-product-form.component.html",
  styleUrl: "../product-form.scss",
})
export class AddProductFormComponent implements OnInit {

  @Output() submitForm: EventEmitter<Product> = new EventEmitter<Product>();

  readonly isCheckingId = this.productService.isCheckingId.asReadonly();

  today!: string;

  form = this.fb.group({
    id: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
      [this.checkProductIdNotTaken.bind(this)],
    ],
    name: [
      "",
      [Validators.required, Validators.minLength(5), Validators.maxLength(100)],
    ],
    description: [
      "",
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200),
      ],
    ],
    logo: ["", Validators.required],
    date_release: [
      formatDate(new Date(), "yyyy-MM-dd", "en-US"),
      [Validators.required, releaseDateValidator()],
    ],
    date_revision: [{ value: "", disabled: true }],
  });

  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) {
    let todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    this.today = formatDate(todayDate, 'yyyy-MM-dd', 'en-US');
  }


  ngOnInit(): void {
    this.subscribeToReleaseDateChanges();
    this.form.get('date_release')?.setValue(formatDate(new Date(), 'yyyy-MM-dd', 'en-US'));
  }

  onSubmit(): void {

    if (this.form.invalid || this.isCheckingId()) {
      return;
    }

    const formValue = this.form.value;
    const product: Product = {
      id: formValue.id || '',
      name: formValue.name || '',
      description: formValue.description || '',
      logo: formValue.logo || '',
      date_release: new Date(formValue.date_release || Date.now()),
      date_revision: new Date(formValue.date_revision || Date.now()),
    };

    this.submitForm.emit(product);

  }

  onReset(event: Event): void {

    event.preventDefault();
    if (this.form.pristine) {
      return;
    }
    this.form.reset();
    this.form.get('date_release')?.setValue(this.today);

  }


  checkProductIdNotTaken(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    return this.productService
      .verifyProductId(control.value)
      .pipe(map((res) => (res ? { idTaken: true } : null)));
  }

  /**
   * Subscribe to changes in the releaseDate field of the form.
   * When the releaseDate changes, set the reviewDate to be one year after the new releaseDate.
   */
  private subscribeToReleaseDateChanges(): void {
    this.form.get("date_release")?.valueChanges.subscribe((val) => {
      if (val) {
        let releaseDateParts = val.split("-").map((part) => parseInt(part, 10));
        let reviewDate = new Date(
          releaseDateParts[0] + 1,
          releaseDateParts[1] - 1,
          releaseDateParts[2]
        );
        let formattedDate = formatDate(reviewDate, "yyyy-MM-dd", "en-US");
        this.form.get("date_revision")?.setValue(formattedDate);
      }
    });
  }
}
