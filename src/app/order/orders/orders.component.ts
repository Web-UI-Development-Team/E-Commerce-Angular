import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent {
  constructor(private router: Router) {}

  OnSumbit() {
    this.router.navigateByUrl('orderDetails');
  }
}
