import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '@src/app/interfaces/student';
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
    return this.http.get<Student[]>(`${environment.baseUrl}/information/students`);
  }

  updateStudent(student: Student): Observable<[]> {
    student.clasification = 'ALUM';
    return this.http.put<[]>(`${environment.baseUrl}/information/update/`, student);
  }

  deleteStudent(matricule: String): Observable<[]> {
    return this.http.delete<[]>(`${environment.baseUrl}/information/delete/${matricule}`);
  }

  getStudent(matricule: String): Observable<Student> {
    return this.http.get<Student>(`${environment.baseUrl}/information/students/${matricule}`);
  }

  saveStudent(student: Student): Observable<[]> {
    student.clasification = 'ALUM';
    return this.http.post<[]>(`${environment.baseUrl}/information/insert/`, student);
  }

}
