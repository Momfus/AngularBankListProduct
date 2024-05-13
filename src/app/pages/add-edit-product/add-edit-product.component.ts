import { CommonModule, formatDate } from "@angular/common";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { releaseDateValidator } from "../../../utils/validators";

@Component({
  selector: "app-add-edit-product",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./add-edit-product.component.html",
  styleUrl: "./add-edit-product.component.scss",
})
export class AddEditProductComponent implements OnInit, OnDestroy {
  productId: string | null = null;
  private $releaseDateSubscription?: Subscription;
  today: String;

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
    releaseDate: [new Date(), [Validators.required, releaseDateValidator()]],
    reviewDate: [{ value: "", disabled: true }],
  });

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router) {
    this.today = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get("id");
    if (this.productId) {
      console.log("Edit");
    } else {
      console.log("New");
    }

    this.subscribeToReleaseDateChanges();
  }

  ngOnDestroy(): void {
    if (this.$releaseDateSubscription) {
      this.$releaseDateSubscription.unsubscribe();
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
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
    this.form.get("releaseDate")?.valueChanges.subscribe((val) => {
      if (val) {
        let reviewDate = new Date(val);
        reviewDate.setFullYear(reviewDate.getFullYear() + 1);
        let formattedDate = reviewDate.toISOString().split('T')[0];
        this.form.get("reviewDate")?.setValue(formattedDate);
      }
    });
  }

}
