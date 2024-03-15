import { Injectable } from '@angular/core';
import { Order } from '../../../modles/order.modle';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root' 
}) 
export class OrdersService { 

  constructor(private httpClient : HttpClient) { } 

  getOrders(){ 
   return this.httpClient.get<Order[]>('http://localhost:3010/api/v1/orders'); 
  } 

}
