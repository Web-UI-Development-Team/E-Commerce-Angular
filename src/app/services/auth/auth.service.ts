import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuth, ILogin, IRegister } from '../../../modles/auth.modle';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) {}

  userAuth: IAuth = {
    token: '',
    message: '',
  };

  createNewUserRequest(user: IRegister) {
    return this.httpClient.post(
      'http://localhost:3010/api/v1/users/register',
      user
    );
  }

  loginRequest(user: ILogin): Observable<IAuth> {
    return this.httpClient.post<IAuth>(
      'http://localhost:3010/api/v1/users/login',
      user
    );
  }

  isAuthenticated(): boolean {
    return this.cookieService.get('token') ? true : false;
  }
}
