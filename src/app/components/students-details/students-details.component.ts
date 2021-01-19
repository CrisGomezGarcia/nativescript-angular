import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';
import { Student } from '@src/app/interfaces/student';
import { StudentService } from '@src/app/services/students/student.service';

@Component({
  selector: 'app-students-details',
  templateUrl: './students-details.component.html',
  styleUrls: ['./students-details.component.scss']
})
export class StudentsDetailsComponent implements OnInit {
  matricule: String;
  student: Student;

  constructor(
    private routerExtensions: RouterExtensions,
    private activatedRoute: ActivatedRoute,
    private studentService: StudentService
  ) {
    this.activatedRoute.params.subscribe(
      params => {
        this.matricule = params['matricule'];
      });
  }

  ngOnInit(): void {
    this.studentService.getStudent(this.matricule)
      .subscribe(data => {
        this.student = data[0][0];
      });
  }

  goBack() {
    this.routerExtensions.backToPreviousPage();
  }

}
