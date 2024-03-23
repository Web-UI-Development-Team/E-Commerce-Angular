import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../../../modles/user.modle';
import { Observable } from 'rxjs';
import { IUpdateUser } from '../../../modles/updateUser.modle';

@Injectable({
  providedIn: 'root',
})
export class UserRequestsService {
  constructor(private httpClient: HttpClient) {}

  getAllUsersRequest(pageNumber: number) {
    return this.httpClient.get<IUser[]>(
      `http://localhost:3010/api/v1/users/?page=${pageNumber}`
    );
  }

  getUserByIdRequest(_id: string) {
    return this.httpClient.get<IUser>(
      `http://localhost:3010/api/v1/users/${_id}`
    );
  }

  addNewUserRequest(data: IUser) {
    return this.httpClient.post<IUser>(
      'http://localhost:3010/api/v1/users/register',
      data
    );
  }

  updateUserDataRequest(data: IUpdateUser, _id: string) {
    return this.httpClient.patch<IUpdateUser>(
      `http://localhost:3010/api/v1/users/${_id}`,
      data
    );
  }

  deletUserRequest(data: IUser) {
    return this.httpClient.delete<IUser>(
      `http://localhost:3010/api/v1/users/${data._id}`
    );
  }
}
