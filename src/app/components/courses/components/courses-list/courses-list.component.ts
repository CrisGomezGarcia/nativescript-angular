import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { ItemEventData } from '@nativescript/core';
import { CourseService } from '@src/app/core/services/courses/course.service';
import { Observable } from 'rxjs';
import { Course } from '../../../../core/models/courses';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  Courses$: Observable<Course[]>;
  coursesData: Course;
  isBusy: Boolean = true;

  constructor(
    private courseService: CourseService,
    private routerExtensions: RouterExtensions
  ) { }

  ngOnInit(): void {
    this.loadCoursesList();
  }

  goBack(): void {
    this.routerExtensions.navigate(['/home'],
      {
        transition: {
          name: 'fade'
        }
      });
  }

  onTouch(): void {
    this.routerExtensions.navigate(['/courses/new'], {
      transition: {
        name: 'fade'
      }
    });
  }

  onItemTap(evt: ItemEventData): void {
    const index = evt.index;
    this.Courses$
      .subscribe(data => {
        const selectedItem = data[0][index];
        this.openDetails(selectedItem);
      });
  }

  private openDetails(selectedItem: Course) {
    const id = selectedItem['id'];
    this.routerExtensions.navigate(['/courses/details', id], {
      transition: {
        name: 'fade'
      }
    });
  }

  loadCoursesList(): void {
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
