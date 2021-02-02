import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { Image } from '@nativescript/core';
import { ImageAsset } from '@nativescript/core/image-asset';
import { AuthService } from '@src/app/core/services/auth/auth.service';
import { requestCameraPermissions, takePicture } from 'nativescript-camera';

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

  /*   onCameraTap() {
      requestCameraPermissions().then(
        () => {
          takePicture().then((imageAsset) => {
            console.log(imageAsset);
            let image = new Image;
            image.src = imageAsset;
          });
        })
        .catch(
          (error) => {
            console.error('Error ==>' + error.message);
          }
        );
    } */

}
