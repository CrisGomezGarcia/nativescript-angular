import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '@src/app/interfaces/student';
import { User } from '@src/app/interfaces/user';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(
    private http: HttpClient
  ) { }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${environment.baseUrl}/students/`);
  }

  updateStudent(student: Student): Observable<[]> {
    return this.http.put<[]>(`${environment.baseUrl}/students/`, student);
  }

  deleteStudent(matricule: String): Observable<[]> {
    return this.http.delete<[]>(`${environment.baseUrl}/students/${matricule}`);
  }

  getStudent(matricule: String): Observable<Student> {
    return this.http.get<Student>(`${environment.baseUrl}/students/${matricule}`)
  }

  saveStudent(student: Student): Observable<[]> {
    return this.http.post<[]>(`${environment.baseUrl}/students/`, student);
  }

}
