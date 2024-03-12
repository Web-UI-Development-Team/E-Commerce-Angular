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
        jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndhbGVlZC5hbG1lbmF3eUBvdXRsb29rLmNvbSIsImlhdCI6MTcxMDI1NzkzOSwiZXhwIjoxNzEwMjYxNTM5fQ.Ly6NjzE8s6gK-UZCw3GI3gbsPsSHc7Wh96ouCODWn7Q',
      },
    });

    return next.handle(req);
  }
}
