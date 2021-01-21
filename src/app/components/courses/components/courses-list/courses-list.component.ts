import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { CourseService } from '@src/app/core/services/courses/course.service';
import { Observable } from 'rxjs';
import { Courses } from '../../../../core/models/courses';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  Courses$: Observable<Courses[]>;
  coursesData: Courses;
  isBusy: Boolean = true;

  constructor(
    private courseService: CourseService,
    private routerExtensions: RouterExtensions
  ) { }

  ngOnInit(): void {
    this.loadCoursesList();
  }

  goBack() {
    this.routerExtensions.navigate(['/home'],
      {
        transition: {
          name: 'fade'
        }
      });
  }

  onTouch() {
    this.routerExtensions.navigate(['/courses/new'], {
      transition: {
        name: 'fade'
      }
    });
  }

  loadCoursesList() {
    this.Courses$ = this.courseService.getCourses();
    this.Courses$.subscribe(
      data => {
        this.coursesData = data[0];
      },
      error => {
        console.log(error);
      },
      () => {
        this.isBusy = false;
      });
  }

}
