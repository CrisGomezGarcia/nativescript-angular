import { HttpClient } from '@angular/common/http';
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

}
