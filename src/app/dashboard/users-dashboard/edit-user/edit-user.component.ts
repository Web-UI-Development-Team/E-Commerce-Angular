import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IUpdateUser, IUser } from '../../../../modles/user.modle';
import { UserRequestsService } from '../../../services/users/user-requests.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { nameRegex } from '../../../regex/name';
import { emailRegex } from '../../../regex/email';
import { phoneNumberRegex } from '../../../regex/phone';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css',
})
export class EditUserComponent implements OnInit {
  userForm: FormGroup;
  user: IUpdateUser;
  originalUser: IUpdateUser;
  userId: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { userId: string },
    private formBuilder: FormBuilder,
    private userRequestService: UserRequestsService,
    private router: Router,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<EditUserComponent>
  ) {
    this.userForm = this.formBuilder.group({
      image: new FormControl('', [Validators.required]),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(nameRegex),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(emailRegex),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(12),
        Validators.maxLength(12),
        Validators.pattern(phoneNumberRegex),
      ]),
      isAdmin: new FormControl<boolean>(false, [Validators.required]),
      isDeleted: new FormControl<boolean>(false, [Validators.required]),
    });
  }

  ngOnInit() {
    //const id = param.get('id');
    const id = this.data.userId;
    console.log(id);
    if (id) {
      this.userId = id;
      this.getUserById(id);
    }
  }

  getUserById(id: string) {
    this.userRequestService.getUserByIdRequest(id).subscribe(
      (data: IUser) => {
        this.user = data;
        console.log(data);
        this.userForm.patchValue({
          ...this.user,
        });
        this.originalUser = { ...this.user };
      },
      (error) => {
        console.log(error);
      }
    );
  }

  closePopUp(): void {
    this.dialogRef.close();
  }

  getFormControl(controlName: string) {
    return this.userForm.get(controlName);
  }

  updateUser() {
    const updatedUserData: IUpdateUser = {};
    Object.keys(this.userForm.controls).forEach((key: string) => {
      const control = this.userForm.get(key);
      if (
        control &&
        control.dirty &&
        control.value !== this.originalUser[key as keyof IUpdateUser]
      ) {
        updatedUserData[key as keyof IUpdateUser] = control.value;
      }
    });
    this.user = this.userForm.value;
    this.userRequestService
      .updateUserDataRequest(updatedUserData, this.userId)
      .subscribe((data) => console.log(data));
    this.router.navigate(['/dashboard/users']);
  }
}
