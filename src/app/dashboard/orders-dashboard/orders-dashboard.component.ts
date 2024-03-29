import { Component, OnInit } from '@angular/core';
import { OrderRequestService } from '../../services/order/order-request.service';
import { UserRequestsService } from '../../services/users/user-requests.service';

@Component({
  selector: 'app-orders-dashboard',
  templateUrl: './orders-dashboard.component.html',
  styleUrl: './orders-dashboard.component.css',
})
export class OrdersDashboardComponent implements OnInit {
  constructor(
    private ordersRequestsServices: OrderRequestService,
    private userRequestServices: UserRequestsService
  ) {}

  allOrders: any = [];
  options: string[] = ['Accepted', 'Pending', 'Canceled'];
  selectedOption: string;

  ngOnInit() {
    this.ordersRequestsServices.getAllOrders().subscribe((data: any) => {
      this.allOrders = data;
      this.allOrders.forEach((data: any) => {
        data.dateOfOrder = data.dateOfOrder.split('T')[0];
        console.log(data.dateOfOrder);
        this.selectedOption = data.status;
        console.log(this.selectedOption);
      });
    });
  }
}
