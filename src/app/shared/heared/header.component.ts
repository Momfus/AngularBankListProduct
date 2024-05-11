import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  @Input() title: string = '';

  constructor(private router: Router) { } // Inyecta el servicio Router

  navigateToHome() { // Añade un método para navegar a la ruta /home
    this.router.navigate(['/home']);
  }

}
