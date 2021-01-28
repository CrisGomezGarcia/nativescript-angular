import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';
import { Dialogs, EventData, Switch } from '@nativescript/core';
import { Student } from '@src/app/core/models/student';
import { CourseService } from '@src/app/core/services/courses/course.service';
import { StudentService } from '@src/app/core/services/students/student.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-courses-add-students',
  templateUrl: './courses-add-students.component.html',
  styleUrls: ['./courses-add-students.component.scss']
})
export class CoursesAddStudentsComponent implements OnInit {
  students$: Observable<Student[]>;
  studentsData: Student;
  isBusy: Boolean = true;
  isBusyOnSave: Boolean = false;
  courseID: String;
  studentsAdded = [];

  constructor(
    private routerExtensions: RouterExtensions,
    private studentServie: StudentService,
    private courseService: CourseService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params
      .subscribe(params => {
        this.courseID = params['course'];
      });
  }

  ngOnInit(): void {
    this.loadListOfStudentsWithoutCourse();
  }

  goBack() {
    this.routerExtensions.backToPreviousPage();
  }

  onCheckedChange(student: Student, evt: EventData) {
    const sw = evt.object as Switch;
    const data = { matricule: student.matricule, course: this.courseID };
    if (sw.checked === true) {
      this.studentsAdded.push(data);
    } else {
      this.studentsAdded = this.studentsAdded.filter(
        e => e.matricule !== student.matricule
      );
    }
  }

  onSave() {
    const options = { title: 'Guardar', message: '', okButtonText: 'Aceptar' };
    const result = this.courseService.saveStudentAndCourse(this.studentsAdded);
    this.isBusyOnSave = true;
    this.isBusy = true;
    setTimeout(() => {
      for (let index = 0; index < result.length; index++) {
        if (result[index].error) {
          options.message = 'Ocurrió un error al guardar al alumno con la matricula: ' + result[index].matricule;
          Dialogs.alert(options);
          this.loadListOfStudentsWithoutCourse();
          this.isBusy = false;
          this.isBusyOnSave = false;
          return;
        }
      }
      options.message = 'Se guardó correctamente';
      Dialogs.alert(options);
      this.loadListOfStudentsWithoutCourse();
      this.isBusy = false;
      this.isBusyOnSave = false;
    }, 500);
  }

  loadListOfStudentsWithoutCourse(): void {
    this.students$ = this.studentServie.getStudentsWithoutCourse();
    this.students$.subscribe(
      data => {
        this.studentsData = data[0];
      },
      error => {
        console.error(error);
      },
      () => {
        setTimeout(() => {
          this.isBusy = false;
        }, 500);
      });
  }

}
