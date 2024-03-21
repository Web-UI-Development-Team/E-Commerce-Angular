import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { Observable, of } from 'rxjs';
import { ICart } from '../../modles/cart.modle';
import { ActivatedRoute } from '@angular/router';
import { CartRequestService } from '../services/cart/cart.request.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  constructor(
    private cartRequestService: CartRequestService,
    private cartService: CartService
  ) {}

  cartItems: ICart[] = [];

  total = {
    price: 0,
    discount: 0,
  };

  isLoading = true;

  ngOnInit() {
    if (!this.cartService.cartItems[0]) {
      this.getUserCart();
      this.total = this.cartService.total;
    } else {
      this.cartItems = this.cartService.cartItems;
      this.total = this.cartService.total;
      this.isLoading = false;
    }
  }

  onClickMakePurches() {
    this.updateCart();
  }

  trackByProductId(index: number, cartItem: ICart): string {
    return cartItem.product._id;
  }

  test() {
    console.log(this.cartItems);
  }
  // addproductToCart(productId,quantity){
  //   this.cartReqService.addToCart()
  // }

  getUserCart() {
    this.cartRequestService.getUserCartRequest().subscribe({
      next: (data) => (this.cartItems = data),
      error: (error) => console.log(error),
      complete: () => {
        this.isLoading = false;
        this.cartService.cartItems = this.cartItems;
        this.cartService.calculateTotal();
      },
    });
  }

  updateCart() {
    let carts = this.cartItems.map((item) => {
      return { productId: item.product._id, quantity: +item.quantity };
    });

    this.cartRequestService
      .updateCartRequest(carts)
      .subscribe((data) => console.log(data));
  }

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
}
