import { Component } from '@angular/core';
import { ILogin } from  './../../../modles/login.modle'
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  SignInComponent: FormGroup;
  constructor(private  fb: FormBuilder){
    this.SignInComponent = fb.group ({
      email:['',Validators.required],
      password:['',Validators.required],

    })
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