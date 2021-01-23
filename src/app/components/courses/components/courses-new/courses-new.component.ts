import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterExtensions } from '@nativescript/angular';
import { Dialogs } from '@nativescript/core';
import { CourseService } from '@src/app/core/services/courses/course.service';

@Component({
  selector: 'app-courses-new',
  templateUrl: './courses-new.component.html',
  styleUrls: ['./courses-new.component.scss']
})
export class CoursesNewComponent implements OnInit {
  form: FormGroup;

  constructor(
    private routerExtensions: RouterExtensions,
    private courseService: CourseService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  goBack() {
    this.routerExtensions.backToPreviousPage();
  }

  saveCourse() {
    const options = { title: 'Guardar', message: '', okButtonText: 'Aceptar' };
    if (this.form.valid) {
      this.courseService.saveCourse(this.form.value)
        .subscribe(
          (response: any) => {
            if (response.error) {
              options.message = 'A ocurrido un error al guardar el curso';
              Dialogs.alert(options);
            } else {
              options.message = 'Se guardó correctamente';
              Dialogs.alert(options);
              this.buildForm();
            }
          },
          error => {
            console.log(error);
          });
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      id: ['', [Validators.required, Validators.maxLength(10)]],
      name: ['', [Validators.required]],
      description: ['', [Validators.maxLength(250)]]
    });
  }

  get idField() {
    return this.form.get('id');
  }

  get nameField() {
    return this.form.get('name');
  }

  get descriptionField() {
    return this.form.get('description');
  }

}
