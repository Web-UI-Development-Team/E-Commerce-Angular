import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndhbGVlZC5hbG1lbmF3eUBvdXRsb29rLmNvbSIsImlhdCI6MTcxMDI5MDY3NywiZXhwIjoxNzEwMjk0Mjc3fQ.D8y1SRzJNl80km6K03bnZw3cpscwBTJSxagnPwx0kog',
      },
    });

    return next.handle(req);
  }
}
