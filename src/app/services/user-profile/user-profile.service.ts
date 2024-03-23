import { Injectable, OnInit } from '@angular/core';
import { UserProfileRequestService } from './user-profile.request.service';
import { IUser } from '../../../modles/user.modle';
import { error } from 'console';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  constructor(private userProfileRequestService: UserProfileRequestService) {}

  user: IUser = {
    _id: "",
    name: "",
    email: "",
    phone: "",
    image: "",
    wishList: []
  }

  patchUser() {
    this.userProfileRequestService.patchUserRequest({name: "Waleed Hesham"}).subscribe({
      next: data => console.log(data),
      error: error => console.log(error),
      complete: () => console.log("done")
    })
  }
}
