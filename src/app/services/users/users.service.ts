import { Injectable } from '@angular/core';
import { User } from './../../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<User[]> {
    // return this.http.get<any[]>('https://jsonplaceholder.typicode.com/posts/');
    return this.http.get<User[]>(`${environment.baseUrl}/users/`);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${environment.baseUrl}/users/${id}`);
  }

  saveUser(data: User): Observable<[]> {
    return this.http.post<[]>(`${environment.baseUrl}/users/`, data);
  }

  deleteUser(id: number): Observable<[]> {
    return this.http.delete<[]>(`${environment.baseUrl}/users/${id}`);
  }

  updateUser(data: User): Observable<[]> {
    return this.http.put<[]>(`${environment.baseUrl}/users/`, data);
  }

}
