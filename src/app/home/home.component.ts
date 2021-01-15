import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { ActivityIndicator, EventData } from '@nativescript/core';
import { RadSideDrawerComponent } from 'nativescript-ui-sidedrawer/angular';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  title = 'Groceries App';
  isBusy: Boolean = false;

  @ViewChild(RadSideDrawerComponent, { static: false }) public drawerComponent: RadSideDrawerComponent;
  onOpenDrawerTap() {
    this.drawerComponent.sideDrawer.showDrawer();
  }
  onCloseDrawerTap() {
    this.drawerComponent.sideDrawer.closeDrawer();
  }

  constructor(
    private routerExtensions: RouterExtensions,
    private authService: AuthService
  ) { }

  ngOnInit() { }

  onTap(NavItemTap: String) {
    this.routerExtensions.navigate([NavItemTap], {
      transition: {
        name: 'fade'
      }
    });
  }

  logOut() {
    this.isBusy = true;
    this.onCloseDrawerTap();
    setTimeout(() => {
      this.isBusy = false;
      this.authService.logOut();
    }, 1000);
  }

  onBusyChanged(args: EventData) {
    const indicator: ActivityIndicator = <ActivityIndicator>args.object;
    console.log('indicator.busy changed to: ' + indicator.busy);
  }
}
