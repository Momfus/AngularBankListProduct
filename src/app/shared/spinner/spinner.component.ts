import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  standalone: true,
  template: `
    <div class="overlay" >
      <div class="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  `,
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {

}
