import { Component } from '@angular/core';
import { UserProfileService } from '../../services/user-profile/user-profile.service';
import { Router } from '@angular/router';
import { relative } from 'path';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  constructor(private userProfileService: UserProfileService, private location: Location) {}

  userChecker = {...this.userProfileService.user};

  onClick() {
    this.userProfileService.patchUser();
    this.location.back();
  }
}
