import { Component, OnInit } from '@angular/core';
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
    private formBuilder: FormBuilder,
    private userRequestService: UserRequestsService,
    private router: Router,
    private route: ActivatedRoute
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
    this.route.paramMap.subscribe((param) => {
      const id = param.get('id');
      console.log(id);
      if (id) {
        this.userId = id;
        this.getUserById(id);
      }
    });
  }

  getUserById(id: string) {
    this.userRequestService.getUserByIdRequest(id).subscribe(
      (data: IUser) => {
        this.user = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
    this.userForm.patchValue({
      ...this.user,
    });
    this.originalUser = { ...this.user };
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
