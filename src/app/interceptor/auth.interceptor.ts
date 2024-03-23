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
        jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndhbGVlZC5hbG1lbmF3eUBvdXRsb29rLmNvbSIsImlhdCI6MTcxMTEwODc3NCwiZXhwIjoxNzExMTk1MTc0fQ.X1EolUebIrXoA_IQjOmV39MGgZo584P05nr3_zIqXk0',
      },
    });

    return next.handle(req);
  }
}
