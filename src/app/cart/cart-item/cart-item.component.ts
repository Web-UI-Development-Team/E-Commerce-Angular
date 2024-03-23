import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICart } from '../../../modles/cart.modle';
import { CartService } from '../../services/cart/cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css',
})
export class CartItemComponent implements OnInit {
  constructor(private cartService: CartService,private activatedRouter:ActivatedRoute) {}

  @Input() cartItem: ICart = {
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
  };

  isQuantityEdited: boolean = false;
  buttonStyle: string = '';

  ngOnInit() {
  
    this.isQuantityEdited = this.cartItem.quantity > 1;
    this.buttonStyle = this.cartItem.isInWishList ? 'text-danger' : '';
  }

  onClickRemove() {
    const index = this.cartService.cartItems.findIndex(
      (item) => item.product._id === this.cartItem.product._id
    );

    this.cartService.removeCart(this.cartItem.product._id, index);
  }

  onClickHeartIcon() {
    this.cartService.updataWishList(this.cartItem.product._id);
    this.cartItem.isInWishList = !this.cartItem.isInWishList;
    this.buttonStyle = this.cartItem.isInWishList ? 'text-danger' : '';
  }

  onChangeQuantity() {
    this.cartService.calculateTotal();
  }
  




}
