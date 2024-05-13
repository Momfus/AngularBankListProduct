import { Component, EventEmitter, Input, Output, OnDestroy } from '@angular/core';
import { Position } from '../../../models/miscellaneous.model';

@Component({
  selector: 'app-table-action-menu',
  templateUrl: './product-table-action-menu.component.html',
  styleUrl: './product-table-action-menu.component.scss'
})
export class ProductTableActionMenuComponent {

  @Input() menuPosition: Position = { top: 0, left: 0, right: 0, bottom: 0 };
  @Output() editProduct = new EventEmitter();
  @Output() deleteProduct = new EventEmitter();

  onEditProduct() {
    this.editProduct.emit();
  }

  onDeleteProduct() {
    this.deleteProduct.emit();
  }

}
