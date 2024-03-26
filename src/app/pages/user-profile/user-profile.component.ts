import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {
  constructor(
    private cookieService: CookieService
  ) {}

  logOut(): void {
    this.cookieService.delete('token');
    this.cookieService.delete('role');
    location.replace('/home');
  }
}
