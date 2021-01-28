import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { Connectivity } from '@nativescript/core';
import { getConnectionType, startMonitoring } from '@nativescript/core/connectivity';
import { environment } from '@src/environments/environment';
import { RadSideDrawerComponent } from 'nativescript-ui-sidedrawer/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  @ViewChild(RadSideDrawerComponent, { static: false }) public drawerComponent: RadSideDrawerComponent;
  onOpenDrawerTap() {
    this.drawerComponent.sideDrawer.showDrawer();
  }

  onCloseDrawerTap() {
    this.drawerComponent.sideDrawer.closeDrawer();
  }

  constructor(
    private routerExtensions: RouterExtensions,
  ) {
    const type = getConnectionType();
    switch (type) {
      case Connectivity.connectionType.none:
        environment.connectionActive = false;
        break;
      default:
        break;
    }
  }

  ngOnInit() {
    startMonitoring((type) => {
      switch (type) {
        case Connectivity.connectionType.none:
          environment.connectionActive = false;
          break;
        case Connectivity.connectionType.mobile:
          environment.connectionActive = true;
          break;
        case Connectivity.connectionType.wifi:
          environment.connectionActive = true;
          break;
        default:
          break;
      }
    });
  }

  onTap() {
    this.routerExtensions.navigate(['error'], {
      transition: {
        name: 'fade'
      }
    });
  }
}
