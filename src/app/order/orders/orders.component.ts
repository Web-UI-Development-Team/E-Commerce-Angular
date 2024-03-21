import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent {
  constructor(private router: Router ) {} 

    isSubmitted : boolean = false;
    UserForm = new FormGroup({
    firstName: new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
    lastName: new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
    phoneNumber: new FormControl('',[Validators.required,Validators.maxLength(11), Validators.pattern('^[0-9]+$')]),
    city: new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z ]*')]), 
    state: new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
    zip: new FormControl('',[Validators.required , Validators.pattern('^[0-9]+$')]),
  })

  OnSumbit() {
    this.isSubmitted = true ; 
    if(this.UserForm.invalid){
      console.log('invalid');
      return
    }
    this.router.navigateByUrl('orderDetails');
  }
}
