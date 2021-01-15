import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardUserGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private routerExtensions: RouterExtensions
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    /* console.log(this.auth.hasUser()); */
    if (this.auth.hasUser()) {
      return true;
    } else {
      this.routerExtensions.navigate(['/login'], {
        transition: {
          name: 'fade'
        }
      });
      return false;
    }

  }
}
