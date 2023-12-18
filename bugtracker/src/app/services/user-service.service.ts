// user-service.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { LoginModel } from '../model/login.model';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  private baseUrl = 'https://localhost:5001/api/User';

   constructor(private http: HttpClient) {}

  registerUser(user: User): Observable<any> {
    const url = `${this.baseUrl}/RegisterUser`;
    return this.http.post(url, user);
  }

  login(loginModel: LoginModel):  Observable<any> {
    const url = `${this.baseUrl}/Login`;
    return this.http.post(url, loginModel);
  }
}
