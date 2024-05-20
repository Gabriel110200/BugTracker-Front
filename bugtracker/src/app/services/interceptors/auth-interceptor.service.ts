import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('interceptr');

    let authToken = localStorage.getItem('token'); 

    const authReq = req.clone({
      setHeaders: {Authorization: `Bearer ${authToken}`}
    })

    return next.handle(authReq);
  }

}
