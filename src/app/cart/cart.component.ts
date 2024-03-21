import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { Observable, of } from 'rxjs';
import { ICart } from '../../modles/cart.modle';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  constructor(private cartService: CartService) {}

  cartItems: ICart[] = this.cartService.cartItems;

  total = this.cartService.total;

  ngOnInit() {
    this.cartService.getUserCart();
    this.cartItems = this.cartService.cartItems;
  }

  onClickMakePurches() {
    this.cartService.updateCart();
  }

  trackByProductId(index: number, cartItem: ICart): string {
    return cartItem.product._id;
  }

  test() {
    console.log(this.cartItems);
  }
}
