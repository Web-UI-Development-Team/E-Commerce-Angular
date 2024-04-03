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
  imageData: String =
    'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png';

  constructor(
    private formBuilder: FormBuilder,
    private userRequestService: UserRequestsService,
    private router: Router,
    public dialogRef: MatDialogRef<AddNewUserComponent>
  ) {}

  userForm: FormGroup = this.formBuilder.group({
    imagePath: new FormControl(''),
    name: new FormControl('', [
      Validators.required,
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
      Validators.pattern(phoneNumberRegex),
    ]),
    isAdmin: new FormControl<boolean>(false, [Validators.required]),
    isDeleted: new FormControl<boolean>(false, [Validators.required]),
  });

  initialFormValues = {
    imagePath: '',
    name: '',
    email: '',
    phone: '',
    isAdmin: false,
    isDeleted: false,
    //wishList: [''],
  };

  ngOnInit() {}

  getFormControl(controlName: string) {
    return this.userForm.get(controlName);
  }

  onFileSelect(event: Event) {
    let file = (event.target as HTMLInputElement).files?.[0];

    const allowedMimeTypes = [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/webp',
    ];

    this.userForm.patchValue({ imagePath: file });

    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;

        console.log(this.imageData);
      };
      reader.readAsDataURL(file);
    }
  }

  closePopUp() {
    this.dialogRef.close();
  }

  addNewUser() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      this.userRequestService.addNewUserRequest(this.userForm.value).subscribe(
        (user: IUser) => {
          console.log(user);
        },
        (error) => {
          console.log(error);
        }
      );
      this.dialogRef.close();
    } else {
      console.log(this.userForm.value);
      console.log('invalid');
    }
  }
}
