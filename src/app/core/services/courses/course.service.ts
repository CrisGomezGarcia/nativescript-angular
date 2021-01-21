import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Courses } from '@src/app/core/models/courses';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
    private http: HttpClient
  ) { }

  getCourses(): Observable<Courses[]> {
    return this.http.get<Courses[]>(`${environment.baseUrl}/courses`);
  }
}
