import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../services/user-profile/user-profile.service';
import { IUser } from '../../modles/user.modle';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {
  constructor(private userProfileService: UserProfileService) {}

  user: IUser = this.userProfileService.user;
  userImageStyle: any;

  ngOnInit(): void {
    this.userProfileService.getUserData();
    this.user = this.userProfileService.user;

    this.userImageStyle = {
      width: '100px',
      height: '100px',
      backgroundColor: 'black',
      backgroundImage: `url(${this.user.image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
  }

  onClick() {
    this.userProfileService.postProduct();
  }
}
