import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';
import { Course } from '@src/app/core/models/courses';
import { CourseService } from '@src/app/core/services/courses/course.service';

@Component({
  selector: 'app-courses-details',
  templateUrl: './courses-details.component.html',
  styleUrls: ['./courses-details.component.scss']
})
export class CoursesDetailsComponent implements OnInit {
  id: String;
  course: Course;
  courseStudents: any;

  constructor(
    private routerExtensions: RouterExtensions,
    private activatedRoute: ActivatedRoute,
    private courseService: CourseService
  ) {
    this.activatedRoute.params
      .subscribe(params => {
        this.id = params['id'];
      });
  }

  ngOnInit(): void {
    this.courseService.getCourse(this.id)
      .subscribe(
        data => {
          this.course = data[0][0];
          this.loadCourseStudents(this.course.id);
        });
  }

  goBack() {
    this.routerExtensions.backToPreviousPage();
  }

  onEditTap() {

  }

  onDeleteTap() {

  }

  private loadCourseStudents(courseID: String) {
    this.courseService.getCourseStudents(courseID)
      .subscribe(
        data => {
          this.courseStudents = data[0];
        });
  }

}
