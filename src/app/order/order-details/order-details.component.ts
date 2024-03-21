import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/order/orders.service';
import { Order } from '../../../modles/order.modle';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
}) 
export class OrderDetailsComponent implements OnInit  { 
  orders : Order[] = [] ;
  orderId: any;
  
  constructor(private orderService : OrdersService , private route : ActivatedRoute){} 

  ngOnInit(): void { 
      this.orderService.getOrders().subscribe((data)=>{ 
        this.orders = data ;   
        console.log(data); 
      }) 
      this.route.paramMap.subscribe(params =>{
        const id = params.get('id')
        if(id) {
          this.orderId = id;
          this.onCancelOrder(this.orderId)
        }else{
          console.log('error');
          
        }
      })
  } 
 
  // //
  onCancelOrder(orderId : string){
    this.orderService.cancelOrder(orderId).subscribe(
      respose => {
        console.log('cancled' , respose);
    }
    )
  

  }
  

} 





