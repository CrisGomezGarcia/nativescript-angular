import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './../../interfaces/user';
import { UsersService } from './../../services/users.service';
import { RouterExtensions } from '@nativescript/angular';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  Users: any = {
    userId: 0,
    id: 0,
    title: "",
    body: ""
  };

  constructor(
    private usersService: UsersService,
    private routerExtensions: RouterExtensions

  ) { }

  ngOnInit(): void {
    this.usersService.getusers()
      .subscribe(
        (usr) => {
          this.Users = usr
          console.log('Esto contiene el arreglo: ' + this.Users);
        });

  }

  onNavItemTap(NavItemTap: String) {
    this.routerExtensions.navigate([NavItemTap], {
      transition: {
        name: 'fade'
      }
    });
  }

}
