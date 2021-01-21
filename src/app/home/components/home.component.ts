import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { RadSideDrawerComponent } from 'nativescript-ui-sidedrawer/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  title = 'Groceries App';

  @ViewChild(RadSideDrawerComponent, { static: false }) public drawerComponent: RadSideDrawerComponent;
  onOpenDrawerTap() {
    this.drawerComponent.sideDrawer.showDrawer();
  }
  onCloseDrawerTap() {
    this.drawerComponent.sideDrawer.closeDrawer();
  }

  constructor(
    private routerExtensions: RouterExtensions,
  ) { }

  ngOnInit() { }

  onTap(NavItemTap: String) {
    this.routerExtensions.navigate([NavItemTap], {
      transition: {
        name: 'fade'
      }
    });
  }
}
