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

  numberOfPages: number;
  pages: any = [];
  page: number;
  loading:boolean=false;

  ngOnInit() {
    this.loading=true;
    this.usersRequest.getAllUsersRequest(1).subscribe((data: any) => {
      this.loading=false
      console.log(data);
      this.allUsers = data.users;
      this.numberOfPages = data.pages;
      console.log(this.allUsers);
      this.page = 1;
      this.pages = range(this.numberOfPages);
      console.log(this.pages.length);
    });
  }

  currentPage(pageNumber: number) {
    this.usersRequest.getAllUsersRequest(pageNumber).subscribe((data: any) => {
      console.log(data);
      this.allUsers = data.users;
      console.log(this.allUsers);
      this.page = pageNumber;
    });
  }

  nextPage(pageNumber: number) {
    console.log(pageNumber);
    this.page = pageNumber + 1;
    this.currentPage(this.page);
  }

  prevPage(pageNumber: number) {
    console.log(pageNumber);
    this.page = pageNumber - 1;
    this.currentPage(this.page);
  }

  deleteUser(user: IUser) {
    // const index = this.allUsers.findIndex((item) => item._id === user._id);
    // this.allUsers.splice(index, 1);
    user.isDeleted = true;
    console.log(user.isDeleted);
    // this.usersRequest.deletUserRequest(user).subscribe((data) => {
    //   console.log(data);
    // });
  }

  openAddUserPopup() {
    console.log('entered');
    this.dialog.open(AddNewUserComponent);
  }

  openEditUserPopup(user: IUser) {
    this.dialog.open(EditUserComponent, { data: { userId: user._id } });
  }
}
