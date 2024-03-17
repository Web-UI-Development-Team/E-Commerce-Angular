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
    firstName: new FormControl('',[Validators.required]),
    lastName: new FormControl('',[Validators.required]),
    phoneNumber: new FormControl('',[Validators.required,Validators.maxLength(11)]),
    city: new FormControl('',[Validators.required]),
    state: new FormControl('',Validators.required),
    zip: new FormControl('',[Validators.required]),
  })

  OnSumbit() {
    this.router.navigateByUrl('orderDetails');
  }
}
