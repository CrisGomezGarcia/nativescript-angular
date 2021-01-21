import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';
import { Dialogs } from '@nativescript/core';
import { Student } from '@src/app/core/models/student';
import { StudentService } from '@src/app/core/services/students/student.service';

@Component({
  selector: 'app-students-edit',
  templateUrl: './students-edit.component.html',
  styleUrls: ['./students-edit.component.scss']
})
export class StudentsEditComponent implements OnInit {
  student: Student;
  form: FormGroup;

  constructor(
    private routerExtensions: RouterExtensions,
    private activateRoute: ActivatedRoute,
    private studentService: StudentService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(
      params => {
        this.student = JSON.parse(params['student']);
        this.buildForm();
      }
    );
  }

  goBack() {
    this.routerExtensions.backToPreviousPage();
  }

  updateStudent() {
    const options = { title: 'Guardar', message: '', okButtonText: 'Aceptar' };
    if (this.form.valid) {
      this.studentService.updateStudent(this.form.value)
        .subscribe((response: any) => {
          if (response.error) {
            options.message = 'A ocurrido un error al guardar los cambios.';
            Dialogs.alert(options);
          } else {
            options.message = 'Se guardaron los cambios correctamente.';
            Dialogs.alert(options);
            this.goBack();
          }
        });
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      matricule: [this.student.matricule, [Validators.required]],
      name: [this.student.name, [Validators.required]],
      lastname: [this.student.lastname, [Validators.required]],
      age: [this.student.age, [Validators.required, Validators.min(18), Validators.max(100), Validators.pattern('[0-9]*')]],
      country: [this.student.country, [Validators.required]]
    });
  }

  // Propiedades get para poder hacer las validaciones en el formulario que se encuentra en el archivo .tns.html.
  /* get matriculeField() {
    return this.form.get('matricule');
  } */

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
