import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@src/environments/environment';
import { ApplicationSettings } from '@nativescript/core';
import { UserSession } from '@src/app/interfaces/user_session';
import { AuthClass } from '@src/app/classes/auth';
import { RouterExtensions } from '@nativescript/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authClass: AuthClass = new AuthClass();

  constructor(
    private http: HttpClient,
    private routerExtensions: RouterExtensions
  ) {
  }

  hasUser() {
    if (ApplicationSettings.getString('token')) {
      if (ApplicationSettings.getString('token') !== 'undefined') {
        return true;
      }
    }
    return false;
  }

  logIn(DataUser: UserSession): Observable<any> {
    const response = this.http.post(`${environment.baseUrl}/users/login`, DataUser);
    let result: any, token: any;
    response.subscribe(
      (data) => {
        result = this.authClass.validSession(data);
        token = result.token;
        ApplicationSettings.setString('token', token);
        return true;
      }, error => {
        console.log(error);
      }, () => {
        this.redirectTo(result.url);
      }
    );
    return response;
  }

  redirectTo(url: any): void {
    this.routerExtensions.navigate([url], {
      transition: {
        name: 'fade'
      },
      clearHistory: true
    });
  }

  logOut() {
    ApplicationSettings.remove('token');
    this.routerExtensions.navigate(['/login'], {
      transition: {
        name: 'fade'
      },
      clearHistory: true
    });
  }
}

