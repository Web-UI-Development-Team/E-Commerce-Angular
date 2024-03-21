import { Injectable, OnInit } from '@angular/core';
import { UserProfileRequestService } from './user-profile.request.service';
import { IUser } from '../../../modles/user.modle';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  constructor(private userProfileRequestService: UserProfileRequestService) {}

  user: IUser = {
    name: "",
    email: "",
    phone: "",
    image: "",
    wishList: []
  }

  getUserData() {
    this.userProfileRequestService.getUserDataRequest().subscribe(
      data => this.user = {...data}
    )
  }

  postProduct() {
    this.userProfileRequestService.postProductRequest().subscribe(
      data => console.log(data)
    )
  }
}
