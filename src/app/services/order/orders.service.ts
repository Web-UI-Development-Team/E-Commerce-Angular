import { Injectable } from '@angular/core';
import { Order } from '../../../modles/order.modle';
import { HttpClient } from '@angular/common/http';

@Injectable({ 
  providedIn: 'root'  
})  
export class OrdersService { 

  constructor(private http : HttpClient) { } 
  getOrders(){  
    return this.http.get<Order[]>('http://localhost:3010/api/v1/orders'); 
  } 
  cancelOrder(orderId:string){
    return this.http.delete(`http://localhost:3010/api/v1/orders/${orderId}/cancel`)
  }

}
// /:id/cancel
