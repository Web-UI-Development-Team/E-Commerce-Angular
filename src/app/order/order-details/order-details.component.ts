import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/order/orders.service';
import { Order } from '../../../modles/order.modle';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
}) 
export class OrderDetailsComponent implements OnInit  { 
  orders : any 
  constructor(private orderService : OrdersService){} 

  ngOnInit(): void { 

      this.orderService.getOrders().subscribe((data)=>{
        console.log(data); 
        
      }) 
  }  
  

} 




