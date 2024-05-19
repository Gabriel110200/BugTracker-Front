import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  constructor() { }

  intercep(req: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>>{


    let authToken = localStorage.getItem('token'); 

    const authReq = req.clone({
      setHeaders: {Authorization: `Bearer ${authToken}`}
    })

    return next.handle(authReq);

  }
}
