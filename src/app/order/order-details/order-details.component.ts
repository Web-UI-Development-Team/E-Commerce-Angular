import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/order/orders.service';
import { Order } from '../../../modles/order.modle';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
}) 
export class OrderDetailsComponent implements OnInit  { 
  orders : Order[] = [] ;
  
  constructor(private orderService : OrdersService){} 

  ngOnInit(): void { 

      this.orderService.getOrders().subscribe((data)=>{ 
        this.orders = data ;   
        console.log(data);
        
      }) 
  }  
  

} 





