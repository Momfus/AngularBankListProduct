import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-modal-confirmation',
  standalone: true,
  imports: [],
  template: `
    <div class="overlay" (click)="onCancel($event)">
      <div class="modal" (click)="$event.stopPropagation()">
        <div class="modal-content">
          <p>¿Estas seguro de eliminar el producto {{product.name}}?</p>
          <hr>
          <div class="container-buttons">
            <button class="btn btn-main btn-secondary" (click)="onCancel()">Cancelar</button>
            <button class="btn btn-main btn-primary" (click)="onConfirm()">Confirmar</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './modal-confirmation.component.scss'
})
export class ModalConfirmationComponent {
  @Input() product!: Product;
  @Output() confirm = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit(this.product.id);
  }

  onCancel(event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }
    this.cancel.emit();
  }
}
