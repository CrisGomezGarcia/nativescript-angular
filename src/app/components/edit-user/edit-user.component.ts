import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';
import { Dialogs } from '@nativescript/core';
import { User } from '@src/app/interfaces/user';
import { UsersService } from '@src/app/services/users/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  user: User;

  form: FormGroup;

  constructor(
    private routerExtensions: RouterExtensions,
    private activateRoute: ActivatedRoute,
    private usersService: UsersService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(
      (params) => {
        this.user = JSON.parse(params['user']);
        console.log(this.user);
        this.buildForm();
      });
  }
  goBack() {
    this.routerExtensions.backToPreviousPage();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      id: [this.user.id],
      name: [this.user.name, [Validators.required]],
      lastname: [this.user.lastname, [Validators.required]],
      age: [this.user.age, [Validators.required, Validators.min(18), Validators.max(100), Validators.pattern('[0-9]*')]],
      country: [this.user.country, [Validators.required]]
    });
  }

  updateUser() {
    if (this.form.valid) {
      this.usersService.updateUser(this.form.value)
        .subscribe((response: any) => {
          const options = { title: 'Guardar', message: '', okButtonText: 'Aceptar' };
          if (response.error) {
            options.message = 'A ocurrido un error al guardar la informaación.\nIntente de nuevo.';
            Dialogs.alert(options);
          } else {
            options.message = 'Se guardó correctamente.';
            Dialogs.alert(options).then (() => {
              this.goBack();
            });
          }
        });
    }
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

}
