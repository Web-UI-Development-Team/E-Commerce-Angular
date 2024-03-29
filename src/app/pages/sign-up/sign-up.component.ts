import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { error } from 'console';
import { IRegister } from '../../../modles/auth.modle';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  registerForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService
  ) {
    if (this.cookieService.get('token')) {
      this.router.navigate(['/home']);
    }

    this.registerForm = fb.group(
      {
        name: ['', [Validators.required, Validators.pattern('[A-Z a-z]{3,}')]],
        email: ['', [Validators.required, this.existEmailValidator()]],
        phone: ['', [Validators.required, Validators.pattern('[0-9]{12}')]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validators: [this.passwordMatch()] }
    );
  }

  get name() {
    return this.registerForm.get('name');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get phone() {
    return this.registerForm.get('phone');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  existEmailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let emailVal: string = control.value;
      let ValidationErrors = { EmailNotValid: { value: emailVal } };
      if (emailVal.length == 0 && control.untouched) return null;
      return emailVal.includes('@gmail.com') ? null : ValidationErrors;
    };
  }

  passwordMatch(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let passControl = control.get('password');
      let confirmPassControl = control.get('confirmPassword');
      if (
        !passControl ||
        !confirmPassControl ||
        !passControl.value ||
        !confirmPassControl.value
      )
        return null;
      let valErr = {
        UnmatchedPassword: {
          pass: passControl?.value,
          confirm: confirmPassControl?.value,
        },
      };
      return passControl?.value == confirmPassControl?.value ? null : valErr;
    };
  }

  submit() {
    let userModel: IRegister = this.registerForm.value as IRegister;
    delete userModel.confirmPassword;
    // console.log(userModel);
    this.authService.createNewUserRequest(userModel).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.router.navigate(['/signIn']);
      },
    });
  }
}
