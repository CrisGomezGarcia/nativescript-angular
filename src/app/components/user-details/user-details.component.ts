import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';
import { User } from '@src/app/interfaces/user';
import { UsersService } from '@src/app/services/users/users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  id: number;
  user: User;

  constructor(
    private routerExtensions: RouterExtensions,
    private activateRoute: ActivatedRoute,
    private usersService: UsersService
  ) {
    this.activateRoute.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit(): void {
    this.usersService.getUser(this.id).subscribe(
      data => {
        this.user = data[0];
      }
    );
  }

  goBack() {
    this.routerExtensions.backToPreviousPage();
  }

}
