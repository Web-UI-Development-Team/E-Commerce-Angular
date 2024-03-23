import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import {IAuth} from '../../../modles/auth.modle'
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { error } from 'console';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  SignUpComponent: FormGroup;
  constructor(private  fb: FormBuilder,private authService:AuthService, private router:Router){
    this.SignUpComponent = fb.group ({
      name:['',[Validators.required,Validators.pattern('[A-Z a-z]{3,}')]],
      email:['',[Validators.required,this.existEmailValidator()]],
      phone:['',[Validators.required,Validators.pattern('[0-9]{12}')]],
      password:['',Validators.required],
      confirmPassword:['',Validators.required],
    },{validators:[this.passwordMatch()]})
}


get name(){
  return this.SignUpComponent.get('name');
}

get email(){
  return this.SignUpComponent.get('email');
}

get phone(){
  return this.SignUpComponent.get('phone');
}

get password(){
  return this.SignUpComponent.get('password');
}

get confirmPassword(){
  return this.SignUpComponent.get('confirmPassword');
}

submit(){
  let userModel: IAuth= this.SignUpComponent.value as IAuth;
  delete userModel.confirmPassword;
  // console.log(userModel);
  this.authService.createNewUserRequest(userModel).subscribe({
    next:(data)=>{
      console.log(data)
    },
    error:(error)=>{
      console.log(error)
    },
    complete:()=>{
      this.router.navigate([".."])
    } 
  })
}


  existEmailValidator(): ValidatorFn{
    return(control:AbstractControl):ValidationErrors | null =>{
      let emailVal: string = control.value;
      let ValidationErrors = {'EmailNotValid':{'value': emailVal}}
      if(emailVal.length==0 && control.untouched)
      return null;
    return (emailVal.includes('@gmail.com')) ? null : ValidationErrors;
    }
  }

  passwordMatch(): ValidatorFn{
    return(control:AbstractControl):ValidationErrors | null =>{
      let passControl= control.get('password');
      let confirmPassControl= control.get('confirmPassword');
      if(!passControl || !confirmPassControl || !passControl.value || !confirmPassControl.value)
      return null;
    let valErr={'UnmatchedPassword':{'pass':passControl?.value, 'confirm':confirmPassControl?.value}}
    return (passControl?.value==confirmPassControl?.value)? null : valErr
    }
  }
}