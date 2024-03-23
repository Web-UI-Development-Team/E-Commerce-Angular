import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserRequestsService } from '../../../services/users/user-requests.service';
import { Router } from '@angular/router';
import { emailRegex } from '../../../regex/email';
import { phoneNumberRegex } from '../../../regex/phone';
import { IUser } from '../../../../modles/user.modle';
import { nameRegex } from '../../../regex/name';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrl: './add-new-user.component.css',
})
export class AddNewUserComponent {
  constructor(
    private formBuilder: FormBuilder,
    private userRequestService: UserRequestsService,
    private router: Router,
    public dialogRef: MatDialogRef<AddNewUserComponent>
  ) {}

  userForm: FormGroup = this.formBuilder.group({
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

  initialFormValues = {
    image: '',
    name: '',
    email: '',
    phone: '',
    isAdmin: false,
    isDeleted: false,
    //wishList: [''],
  };

  getFormControl(controlName: string) {
    return this.userForm.get(controlName);
  }

  closePopUp(): void {
    this.dialogRef.close();
  }

  addNewUser() {
    console.log(this.userForm.value);
    this.userRequestService
      .addNewUserRequest(this.userForm.value)
      .subscribe((user: IUser) => console.log(user));
    this.router.navigate(['/dashboard/users']);
  }
}
