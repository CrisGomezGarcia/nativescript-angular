import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterExtensions } from '@nativescript/angular';
import { Dialogs, ApplicationSettings } from '@nativescript/core';
import { AuthService } from '@src/app/core/services/auth/auth.service';

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
      let matricule: String;
      let sessionType: String;
      setTimeout(() => {
        matricule = ApplicationSettings.getString('matricule');
        sessionType = ApplicationSettings.getString('session_type');
      }, 500);
      if (matricule === 'undefined' && sessionType === 'undefined') {
        Dialogs.alert('Matrícula y/o contraseña incorrectos.');
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
      matricule: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*')]],
      password: ['', [Validators.required]]
    });
  }

  get matriculeField() {
    return this.form.get('matricule');
  }

  get passwordField() {
    return this.form.get('password');
  }

  /* onBusyChanged(args: EventData) {
    const indicator: ActivityIndicator = <ActivityIndicator>args.object;
    console.log('indicator.busy changed to: ' + indicator.busy);
  } */

}
