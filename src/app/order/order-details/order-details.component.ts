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
  status : any;
  
  constructor(private orderService : OrdersService , private route : ActivatedRoute){} 

  ngOnInit(): void {   
 
    this.orderService.getOrders().subscribe((data)=>{          
      // console.log(data[0]._id); to log id of order
      this.orders = data;
      // data = data.filter(order=>order.status= 'pendin')
      console.log(data); 

    }) 
      }//oninit 

     
    

    onCancelOrder(orderId:string , status : string){  
      if(confirm('do you need to cancel this order')) {
        console.log('cancled');
        this.orderService.cancelOrder(orderId , status).subscribe({
          next : (res)=>{
            console.log('cancled' , res); 
            const cancelOrderIndex = this.orders.findIndex(order => order._id === orderId) //  
            this.orders.splice(cancelOrderIndex,1) ;
      
          },
          error :(err)=>{
            console.log('error' , err);
          }
        })
      }
     
    }
  }   








