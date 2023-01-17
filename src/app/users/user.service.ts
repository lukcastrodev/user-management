import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from './models/user';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.API_URL}/users`);
  }

  getOne(user_id: string): Observable<User>{
    return this.http.get<User>(`${this.API_URL}/users/${user_id}`);
  }

  storeNewUser(user: User){
    return this.http.post<User>(`${this.API_URL}/users`, user);
  }

  updateUser(user: User){
    return this.http.patch<User>(`${this.API_URL}/users/${user.id}`, user);
  }


  deleteUser(user_id: string){
    return this.http.delete<User>(`${this.API_URL}/users/${user_id}`);
  }
}
