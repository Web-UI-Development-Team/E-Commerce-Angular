import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICart, IPostCart } from '../../../modles/cart.modle';
import { Observable, of } from 'rxjs';
import { IAuth } from '../../../modles/auth.modle';
import { ILogin } from '../../../modles/login.modle';


@Injectable({
  providedIn: 'root',
})
export class CartRequestService {
  constructor(private http: HttpClient) {}

  addToCart(product:any){
   return this.http.post('http://localhost:3010/api/v1/cart/add', product);
  };

  getUserCartRequest(): Observable<ICart[]> {
    return this.http.get<ICart[]>('http://localhost:3010/api/v1/cart');
  }

  updateCartRequest(carts: IPostCart[]) {
    return this.http.patch<string>(
      'http://localhost:3010/api/v1/cart',
      {carts}
    );
  }

  removeCartRequest(productId: string) {
    return this.http.delete<string>("http://localhost:3010/api/v1/cart/" + productId);
  }

  clearCartRequest() {}

  tryLogin(user: ILogin): Observable<IAuth> {
    return this.http.post<IAuth>(
      'http://localhost:3010/api/v1/users/login',
      user
    );
  }
}
