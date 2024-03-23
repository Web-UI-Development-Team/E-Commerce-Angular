import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderRequestService {
  constructor(private httpClient: HttpClient) {}

  getAllOrders() {
    return this.httpClient.get('http://localhost:3010/api/v1/orders');
  }
}
