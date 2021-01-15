import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterExtensions } from '@nativescript/angular';
import { Dialogs, ApplicationSettings, EventData, ActivityIndicator } from '@nativescript/core';
import { AuthService } from '@src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isBusy: Boolean = false;

  constructor(
    private routerExtensions: RouterExtensions,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  onNavItemTap(NavItemTap: String) {
    this.routerExtensions.navigate([NavItemTap], {
      transition: {
        name: 'fade'
      }
    });
  }

  logIn() {
    /* ApplicationSettings.setString('token', 'undefined'); */
    const alertOptions = { title: 'Inicio de sesión', message: '', okButtonText: 'Aceptar' };
    if (this.form.valid) {
      this.authService.logIn(this.form.value);
      let token: string;
      setTimeout(() => {
        token = ApplicationSettings.getString('token');
      }, 500);
      if (token === 'undefined') {
        Dialogs.alert('Usuario y/o contraseña incorrectos.');
      } else {
        this.isBusy = true;
      }
    } else {
      alertOptions.message = 'Todos los campos son requeridos';
      Dialogs.alert(alertOptions);
    }
  }

  buildForm() {
    this.form = this.formBuilder.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  get userField() {
    return this.form.get('user');
  }

  get passwordField() {
    return this.form.get('password');
  }

  onBusyChanged(args: EventData) {
    const indicator: ActivityIndicator = <ActivityIndicator>args.object;
    console.log('indicator.busy changed to: ' + indicator.busy);
  }

}
