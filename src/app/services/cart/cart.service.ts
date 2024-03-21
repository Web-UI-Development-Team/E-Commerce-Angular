import { Injectable } from '@angular/core';
import { ICart } from '../../../modles/cart.modle';
import { CartRequestService } from './cart.request.service';
import { faLariSign } from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private cartRequestService: CartRequestService) {}

  cartItems: ICart[] = [
    {
      product: {
        _id: '',
        title: '',
        description: '',
        price: 0,
        discount: 0,
        stock: 0,
        brand: '',
        category: '',
        thumbnail: '',
        images: [''],
        rating: 0,
        reviews: [''],
        createdAt: '',
        updatedAt: '',
      },
      isInWishList: false,
      quantity: 0,
    },
  ];

  total = {
    price: 0,
    discount: 0,
  };

  getUserCart() {
    this.cartRequestService.getUserCartRequest().subscribe((data) => {
      this.cartItems = data;

      if(data[0])
      {
        this.calculateTotal();
      }
    });
  }

  updateCart() {
    let carts = this.cartItems.map(
      item => {
        return {productId: item.product._id, quantity: +item.quantity}
      }
    )

    this.cartRequestService.updateCartRequest(carts).subscribe(
      data => console.log(data)
    );
  }

  updataWishList(product: string) {
    this.cartRequestService.updateWishListRequest(product).subscribe(
      data => console.log(data)
    );
  }

  removeCart(productId: string, index: number) {
    this.cartItems.splice(index, 1)

    this.cartRequestService.removeCartRequest(productId).subscribe(
      data => console.log(data)
    )
  }

  calculateTotal() {
    let prices, discounts;

    prices = this.cartItems.map((item) => item.product.price * item.quantity);
    discounts = this.cartItems.map(
      (item) => ((item.product.discount / 100) * item.product.price) * item.quantity
    );

    this.total.price = prices.reduce((preVal, curVal) => preVal + curVal);
    this.total.discount = discounts.reduce((preVal, curVal) => preVal + curVal);
  }

 
}
