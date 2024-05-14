import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-edit-product-form',
  standalone: false,
  templateUrl: './edit-product-form.component.html',
  styleUrl: '../product-form.scss'
})
export class EditProductFormComponent {

  @Input() productId: string | undefined;
  @Output() submitForm: EventEmitter<Product> = new EventEmitter<Product>();


}
