import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { OrdersService } from '../../../services/order/orders.service';
import { Order } from '../../../../modles/order.modle';
import { PopUpComponent } from '../pop-up/pop-up.component';
@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css',
})
export class OrderDetailsComponent implements OnInit {
  orders: Order[] = [];
  orderId: any;
  status: any;
  faX = faX;

  constructor(
    private orderService: OrdersService,
    private route: ActivatedRoute,
    private MatDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.orderService.getOrdersUser().subscribe((data) => {
      data = data.filter((order) => order.status == 'Pending');
      this.orders = data;
      console.log(data);
    });
  }

  onCancelOrder(orderId: string, status: string) {
    let refOPenDiallog = this.openDialog();
    this.orderService.cancelOrder(orderId, status).subscribe({
      next: (res) => {
        console.log('cancled', res);
        const cancelOrderIndex = this.orders.findIndex(
          (order) => order._id === orderId
        ); //
        this.orders.splice(cancelOrderIndex, 1);
      },
      error: (err) => {
        console.log('error', err);
      },
    });
  }
  openDialog() {
    this.MatDialog.open(PopUpComponent);
  }
}
