import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterExtensions } from '@nativescript/angular';
import { Dialogs } from '@nativescript/core';
import { User } from '@src/app/interfaces/user';
import { UsersService } from '@src/app/services/users/users.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
  form: FormGroup;
  Usr: User;

  constructor(
    private routerExtensions: RouterExtensions,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  goBack() {
    this.routerExtensions.backToPreviousPage();
  }
  //#region UserMetods
  registerUser() {
    if (this.form.valid) {
      this.Usr = {
        name: this.form.get('name').value,
        lastname: this.form.get('lastname').value,
        age: this.form.get('age').value,
        country: this.form.get('country').value
      };
      /* this.usersService.saveUser(this.Usr) */
      this.usersService.saveUser(this.form.value)
        .subscribe((response: any) => {
          const options = {
            title: 'Guardar',
            message: '',
            okButtonText: 'Aceptar'
          };
          if (response.error) {
            options.message = 'A ocurrido un error.\nIntente de nuevo.';
            Dialogs.alert(options);
          } else {
            options.message = 'Se guardó correctamente';
            Dialogs.alert(options);
            this.buildForm();
          }
        }, error => {
          Dialogs.alert('A ocurrido un error interno con el servidor.');
        });
    } else {
      Dialogs.alert('Verifique los campos');
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(100), Validators.pattern('[0-9]*')]],
      country: ['', [Validators.required]]
    });
  }

  // Propiedades get para hacer la validadción en el .tns.html
  get nameField() {
    return this.form.get('name');
  }

  get lastnameField() {
    return this.form.get('lastname');
  }

  get ageField() {
    return this.form.get('age');
  }

  get countryField() {
    return this.form.get('country');
  }
  //#endregion
}
