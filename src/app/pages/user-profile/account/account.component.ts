import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../../services/user-profile/user-profile.service';
import { UserProfileRequestService } from '../../../services/user-profile/user-profile.request.service';
import { Router } from '@angular/router';
import { IProfile } from '../../../../modles/profile.modle';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent {
  constructor(
    private userProfileRequestService: UserProfileRequestService,
    private userProfileService: UserProfileService,
    public router: Router
  ) {}

  user: IProfile = {
    name: '',
    email: '',
    phone: '',
    image: '',
    wishList: [],
  };

  userImageStyle: any;

  ngOnInit(): void {
    if (!this.userProfileService.user.name) {
      this.getUserData();
    } else {
      this.user = this.userProfileService.user;
    }

    console.log(this.router.url);
  }

  getUserData() {
    this.userProfileRequestService.getUserDataRequest().subscribe({
      next: (data) => (this.user = data),
      error: (error) => console.log(error),
      complete: () => {
        this.userImageStyle = {
          width: '100px',
          height: '100px',
          backgroundColor: 'black',
          backgroundImage: `url(${this.user.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        };

        console.log(this.user);

        this.userProfileService.user = this.user;
      },
    });
  }
}
