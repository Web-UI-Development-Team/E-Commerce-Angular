import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEditProfile, IProfile } from '../../../modles/profile.modle';

@Injectable({
  providedIn: 'root',
})
export class UserProfileRequestService {
  constructor(private http: HttpClient) {}

  getUserDataRequest(): Observable<IProfile> {
    return this.http.get<IProfile>('http://localhost:3010/api/v1/profile');
  }

  patchUserRequest(updatedProfileData: IEditProfile): Observable<any> {
    return this.http.patch<any>('http://localhost:3010/api/v1/profile', updatedProfileData);
  }
}
