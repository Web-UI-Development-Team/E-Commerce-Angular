import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.loginForm = fb.group({
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
}


// this.existEmailValidator()

// get email(){
//   return this.SignInComponent.get('email');
// }

// submit(){
//   let userModel: ILogin= this.SignInComponent.value as ILogin;
//   console.log(userModel);
//   })

// existEmailValidator(): ValidatorFn{
//   return(control:AbstractControl):ValidationErrors | null =>{
//     let emailVal: string = control.value;
//     let ValidationErrors = {'EmailNotValid':{'value': emailVal}}
//     if(emailVal.length==0 && control.untouched)
//     return null;
//   return (emailVal.includes('@gmail.com')) ? null : ValidationErrors;
//   }
// }
