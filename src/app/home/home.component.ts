import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  title = 'Groceries App';
  userData = {
    nombre: '',
    domicilio: '',
    nacionalidad: ''
  };

  constructor(
    private routerExtensions: RouterExtensions
  ) { }

  ngOnInit() {
  }

  Saludo() {
    if (this.userData.nombre.trim() === '' || this.userData.domicilio.trim() === '' || this.userData.nacionalidad.trim() === '') {
      alert('Llene todos los campos');
    } else {
      alert('Hola, ' + this.userData.nombre + '\nVives en ' + this.userData.domicilio + '\nY eres de ' + this.userData.nacionalidad);
      this.userData = {
        nombre: '',
        domicilio: '',
        nacionalidad: ''
      };
    }
  }

  onNavItemTap(NavItemTap: String) {
    this.routerExtensions.navigate([NavItemTap], {
      transition: {
        name: 'fade'
      }
    });
  }
}
