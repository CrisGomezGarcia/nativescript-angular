import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Course } from '@src/app/core/models/courses';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
    private http: HttpClient
  ) { }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${environment.baseUrl}/courses`);
  }

  saveCourse(course: Course): Observable<[]> {
    return this.http.post<[]>(`${environment.baseUrl}/courses/insert`, course);
  }

  getCourse(id: String): Observable<Course> {
    return this.http.get<Course>(`${environment.baseUrl}/courses/${id}`);
  }

  getCourseStudents(courseID: String): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/courses/students/${courseID}`);
  }

  saveStudentAndCourse(data: any): any[] {
    let Error: any;
    const Errors = [];
    for (let i = 0; i < data.length; i++) {
      const response = this.http.post<[]>(`${environment.baseUrl}/hascourses/insert`, data[i]);
      response.subscribe(
        result => {
          Error = result;
        },
        error => {
          console.log(error);
        },
        () => {
          Errors.push(Error);
        });
    }
    return Errors;
  }
}
