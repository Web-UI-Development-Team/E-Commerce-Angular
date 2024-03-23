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

  allOrders: any;
  usersIds: string[] = [];
  userNames: string[] = [];

  ngOnInit() {
    this.ordersRequestsServices.getAllOrders().subscribe((data) => {
      this.allOrders = data;
      console.log(this.allOrders);
      this.allOrders.forEach((order: any) => {
        this.usersIds.push(order.user);
      });
      console.log(this.usersIds);
      this.usersIds.forEach((userId: string) => {
        this.userRequestServices
          .getUserByIdRequest(userId)
          .subscribe((data) => {
            this.userNames.push(data.name);
          });
      });
      console.log(this.userNames);
    });
  }
}
