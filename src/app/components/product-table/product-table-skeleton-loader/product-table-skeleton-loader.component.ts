import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: "skeleton-loader-product-table",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="table-product">
      <table>
        <thead>
          <tr>
            <th *ngIf="isScreenLarge" class="column-logo">Logo</th>
            <th class="column-name">Nombre del Producto</th>
            <th *ngIf="isScreenLarge" class="column-description">
              Descripción
            </th>
            <th class="column-date">Fecha de liberación</th>
            <th class="column-date">Fecha de restruturación</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let i of [1, 2, 3, 4, 5]">
            <td *ngIf="isScreenLarge" class="column-logo">
              <div class="skeleton skeleton-logo"></div>
            </td>
            <td class="column-name">
              <div class="skeleton"></div>
            </td>
            <td *ngIf="isScreenLarge" class="column-description">
              <div class="skeleton"></div>
            </td>
            <td class="column-date">
              <div class="skeleton"></div>
            </td>
            <td class="column-date">
              <div class="skeleton"></div>
            </td>
            <td>
              <button class="btn btn-action disabled">
                <img src="assets/more_vert_20dp.svg" alt="Menu" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styleUrl: "./product-table-skeleton-loader.component.scss",
})
export class ProductTableSkeletonLoaderComponent {
  @Input() isScreenLarge: boolean = false;
}
