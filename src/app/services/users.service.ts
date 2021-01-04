import { Injectable } from '@angular/core';
import { User } from './../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient
  ) { }

  getusers() {
    //return this.http.get<any[]>('https://jsonplaceholder.typicode.com/posts/');
    return this.http.get<any[]>('http://192.168.53.2:3000/users/');
    
  }

}
