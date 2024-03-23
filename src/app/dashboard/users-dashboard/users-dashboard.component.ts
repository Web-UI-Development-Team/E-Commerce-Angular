import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../modles/user.modle';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserRequestsService } from '../../services/users/user-requests.service';
import { AddNewUserComponent } from './add-new-user/add-new-user.component';
import { range } from '../../utils/range';
import { EditUserComponent } from './edit-user/edit-user.component';

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

  numberOfUsers = 15;
  numberOfUserInPage = 5;
  numberOfPages = Math.ceil(this.numberOfUsers / this.numberOfUserInPage);
  pages: any = [];

  ngOnInit() {
    this.usersRequest.getAllUsersRequest(1).subscribe((data) => {
      console.log(data);
      this.allUsers = data;
      console.log(this.allUsers);
    });
    this.pages = range(this.numberOfPages);
  }

  currentPage(pageNumber: number) {
    this.usersRequest.getAllUsersRequest(pageNumber).subscribe((data) => {
      console.log(data);
      this.allUsers = data;
    });
  }

  deleteUser(user: IUser) {
    const index = this.allUsers.findIndex((item) => item._id === user._id);
    this.allUsers.splice(index, 1);

    this.usersRequest.deletUserRequest(user).subscribe((data) => {
      console.log(data);
    });
  }

  openAddUserPopup() {
    const dialogRef = this.dialog.open(AddNewUserComponent);
  }

  openEditUserPopup(user: IUser) {
    this.dialog.open(EditUserComponent, { data: { userId: user._id } });
  }
}
