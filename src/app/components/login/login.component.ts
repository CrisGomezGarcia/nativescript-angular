import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  users = [
    {
      name: 'Cristian',
      address: 'Cuajimalpa',
      nacionality: 'Mexicana'
    },
    {
      name: 'Itzel',
      address: 'Huejutla',
      nacionality: 'Mexicana'
    },
    {
      name: 'Carlos',
      address: 'Monterrey',
      nacionality: 'Mexicano'
    },
    {
      name: 'Roxelle',
      address: 'Waukegan',
      nacionality: 'EUA'
    },
    {
      name: 'Pedro',
      address: 'Barcelona',
      nacionality: 'EUA'
    }
  ];

  constructor(
    private routerExtensions: RouterExtensions
  ) { }

  ngOnInit(): void {
  }

  onNavItemTap(NavItemTap: String) {
    this.routerExtensions.navigate([NavItemTap], {
      transition: {
        name: 'fade'
      }
    });
  }

}
