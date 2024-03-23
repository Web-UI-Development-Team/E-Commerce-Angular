import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../modles/user.modle';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserRequestsService } from '../../services/users/user-requests.service';
import { AddNewUserComponent } from './add-new-user/add-new-user.component';

@Component({
  selector: 'app-users-dashboard',
  templateUrl: './users-dashboard.component.html',
  styleUrl: './users-dashboard.component.css',
})
export class UsersDashboardComponent implements OnInit {
  constructor(
    private usersRequest: UserRequestsService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  allUsers: IUser[];
  user: IUser;

  ngOnInit() {
    this.usersRequest.getAllUsersRequest().subscribe((data) => {
      console.log(data);
      this.allUsers = data;
      console.log(this.allUsers);
    });
  }

  deleteUser(user: IUser) {
    console.log(user);
    this.usersRequest.deletUserRequest(user).subscribe((data) => {
      console.log(data);
    });
  }

  openAddUserPopup() {
    const dialogRef = this.dialog.open(AddNewUserComponent);
  }

  goToEditUserPage(user: IUser) {
    this.router.navigate([`/dashboard/editUser/${user._id}`]);
  }
}
