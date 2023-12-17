// user-service.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  private baseUrl = 'http://localhost:5001';

   constructor(private http: HttpClient) {}

  registerUser(user: User): Observable<any> {
    const url = `${this.baseUrl}/registerUser`;
    return this.http.post(url, user);
  }
}
