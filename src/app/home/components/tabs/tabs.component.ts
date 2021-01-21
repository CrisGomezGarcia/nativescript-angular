import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { Dialogs } from '@nativescript/core';
import { AuthService } from '@src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, OnDestroy {
  isBusy: Boolean = false;

  constructor(
    private authService: AuthService,
    private routeExtensions: RouterExtensions
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.isBusy = false;
  }

  logOut() {
    this.isBusy = true;
    setTimeout(() => {
      this.authService.logOut();
    }, 1500);
  }

  onTouchItem(route: String) {
    this.routeExtensions.navigate([route],
    {
      transition: {
        name: 'fade'
      }
    });
  }

}
