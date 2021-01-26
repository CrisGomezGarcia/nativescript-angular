import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';
import { SwipeGestureEventData } from '@nativescript/core';
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
  isBusy = true;

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

  onTouch() {
    this.routerExtensions.navigate(['/courses/add', this.course.id], {
      transition: {
        name: 'fade'
      }
    });
  }

  private loadCourseStudents(courseID: String) {
    this.courseService.getCourseStudents(courseID)
      .subscribe(
        data => {
          this.courseStudents = data[0];
        },
        error => {
          console.log(error);
        },
        () => {
          setTimeout(() => {
            this.isBusy = false;
          }, 500);
        });
  }

  onSwipe(args: SwipeGestureEventData): void {
    const direction = args.direction;
    if (direction === 8) {
      setTimeout(() => {
        this.isBusy = true;
        this.loadCourseStudents(this.course.id);
      }, 1000);
    }
  }

}
