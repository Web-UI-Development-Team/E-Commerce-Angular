import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUpdatedUser, IUser } from '../../../modles/user.modle';

@Injectable({
  providedIn: 'root',
})
export class UserProfileRequestService {
  constructor(private http: HttpClient) {}

  getUserDataRequest(): Observable<IUser> {
    return this.http.get<IUser>('http://localhost:3010/api/v1/profile');
  }

  patchUserRequest(updatedProfileData: IUpdatedUser): Observable<any> {
    return this.http.patch<any>('http://localhost:3010/api/v1/profile', updatedProfileData);
  }
}
