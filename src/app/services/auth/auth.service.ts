import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@src/environments/environment';
import { ApplicationSettings } from '@nativescript/core';
import { AuthClass } from '@src/app/classes/auth';
import { RouterExtensions } from '@nativescript/angular';
import { AppSession } from '@src/app/interfaces/student_session';

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

  hasStudent() {
    if (ApplicationSettings.getString('matricule') &&
      ApplicationSettings.getString('session_type')) {
      if (ApplicationSettings.getString('matricule') !== 'undefined' &&
        ApplicationSettings.getString('session_type') !== 'undefined') {
        return true;
      }
    }
    return false;
  }

  logIn(appSession: AppSession): Observable<any> {
    const response = this.http.post(`${environment.baseUrl}/sessions/login`, appSession);
    let result: any;
    let matricule: any;
    let sessionType: any;
    response.subscribe(
      (data) => {
        result = this.authClass.validSession(data);
        matricule = result.matricule;
        sessionType = result.sessionType;
        ApplicationSettings.setString('matricule', matricule);
        ApplicationSettings.setString('session_type', sessionType);
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
    ApplicationSettings.remove('matricule');
    this.routerExtensions.navigate(['/login'], {
      transition: {
        name: 'fade'
      },
      clearHistory: true
    });
  }
}

