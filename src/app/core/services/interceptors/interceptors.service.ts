import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApplicationSettings, Dialogs } from '@nativescript/core';
import { RouterExtensions } from '@nativescript/angular';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorsService implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const matricule: String = ApplicationSettings.getString('matricule');
    const isAuthenticated = this.authService.hasSessionActive();
    let request = req;
    request = req.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    if (matricule && isAuthenticated) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${matricule}`
        }
      });
    }
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        const optionsAlert = {
          title: 'Error',
          message: 'Ocurrió un error en su autentificación.\nInicie sesión nuevamente.',
          okButtonText: 'Aceptar'
        };
        if (err.status === 401) {
          Dialogs.alert(optionsAlert);
          this.authService.logOut();
        }
        return throwError(err);
      })
    );
  }
}
