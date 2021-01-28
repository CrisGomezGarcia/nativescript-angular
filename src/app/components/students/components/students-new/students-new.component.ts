import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterExtensions } from '@nativescript/angular';
import { Dialogs, Page } from '@nativescript/core';
import { Student } from '@src/app/core/models/student';
import { StudentService } from '@src/app/core/services/students/student.service';
import { environment } from '@src/environments/environment';

@Component({
  selector: 'app-students-new',
  templateUrl: './students-new.component.html',
  styleUrls: ['./students-new.component.scss']
})
export class StudentsNewComponent implements OnInit {
  form: FormGroup;
  student: Student;
  connectionActive: Boolean;

  constructor(
    private routerExtensions: RouterExtensions,
    private studentService: StudentService,
    private formBuilder: FormBuilder,
    private page: Page
  ) {
    this.verifyConnectionOnInternet();
  }

  ngOnInit(): void {
    this.buildForm();
  }

  goBack() {
    this.routerExtensions.backToPreviousPage();
  }

  //#region StudentsMethods
  saveStudent() {
    if (this.verifyConnectionOnInternet()) {
      const options = { title: 'Guardar', message: '', okButtonText: 'Aceptar' };
      if (this.form.valid) {
        this.studentService.saveStudent(this.form.value)
          .subscribe(
            (response: any) => {
              if (response.error) {
                options.message = 'Ocurrió un error al guardar.';
              } else {
                options.message = 'Se guardó correctamente.';
                this.buildForm();
              }
              Dialogs.alert(options);
            },
            error => {
              Dialogs.alert(error);
            });
      }
    }
  }

  verifyConnectionOnInternet(): Boolean {
    this.connectionActive = environment.connectionActive;
    return this.connectionActive;
  }

  tryConnection(statusConnection: any) {
    this.connectionActive = statusConnection;
    if (this.connectionActive) {
      this.page.actionBarHidden = false;
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      matricule: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*')]],
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(100), Validators.pattern('[0-9]*')]],
      country: ['', [Validators.required]]
    });
  }

  // Propiedades get para hacer la validación en el .tns.html
  get matriculeField() {
    return this.form.get('matricule');
  }

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


