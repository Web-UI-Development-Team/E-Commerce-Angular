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

        jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndhbGVlZC5hbG1lbmF3eUBvdXRsb29rLmNvbSIsImlhdCI6MTcxMTIyNDI4MCwiZXhwIjoxNzExMjI3ODgwfQ.1RWTv633pO3x5pl-mFaH0NAFvHAK9kJiizbkStDwyXY',

      },
    });

    return next.handle(req);
  }
}
