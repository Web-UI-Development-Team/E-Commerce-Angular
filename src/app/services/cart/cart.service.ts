import { Injectable } from '@angular/core';
import { ICart } from '../../../modles/cart.modle';
import { CartRequestService } from './cart.request.service';
import { faLariSign } from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private cartRequestService: CartRequestService) {}

  cartItems: ICart[] = [];

  total = {
    price: 0,
    discount: 0,
  };

  updataWishList(product: string) {
    this.cartRequestService
      .updateWishListRequest(product)
      .subscribe((data) => console.log(data));
  }

  removeCart(productId: string, index: number) {
    this.cartItems.splice(index, 1);

    this.cartRequestService
      .removeCartRequest(productId)
      .subscribe((data) => console.log(data));
  }

  calculateTotal() {
    let prices, discounts;

    prices = this.cartItems.map((item) => item.product.price * item.quantity);
    discounts = this.cartItems.map(
      (item) =>
        (item.product.discount / 100) * item.product.price * item.quantity
    );

    this.total.price = prices.reduce((preVal, curVal) => preVal + curVal);
    this.total.discount = discounts.reduce((preVal, curVal) => preVal + curVal);
  }
}
