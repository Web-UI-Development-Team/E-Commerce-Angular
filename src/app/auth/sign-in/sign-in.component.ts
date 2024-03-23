import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ILogin } from '../../../modles/auth.modle';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService
  ) {
    if(this.cookieService.get('token'))
    {
      this.router.navigate(['/home']);
    }
    this.loginForm = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  existEmailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let emailVal: string = control.value;
      let ValidationErrors = { EmailNotValid: { value: emailVal } };
      if (emailVal.length == 0 && control.untouched) return null;
      return emailVal.includes('@gmail.com') ? null : ValidationErrors;
    };
  }

  submit() {
    const user = this.loginForm.value as ILogin;

    this.authService.loginRequest(user).subscribe({
      next: (data) => {
        this.cookieService.set('token', data.token);
      },
      error: (error) => console.log(error),
      complete: () => {
        location.replace('/home');
      },
    });
  }
}
