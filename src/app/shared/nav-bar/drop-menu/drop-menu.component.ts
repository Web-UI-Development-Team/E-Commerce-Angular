import { Component, Input } from '@angular/core';
import { IProduct } from '../../../../modles/product.modle';
import { UserProfileService } from '../../../services/user-profile/user-profile.service';
import { CartService } from '../../../services/cart/cart.service';
import { CartRequestService } from '../../../services/cart/cart.request.service';

@Component({
  selector: 'app-drop-menu',
  templateUrl: './drop-menu.component.html',
  styleUrl: './drop-menu.component.css'
})
export class DropMenuComponent {

  @Input() product: IProduct
  constructor(private cartService: CartService, private cartRequestService: CartRequestService) {}

  isInCart: boolean = false;
  isInWishlist: boolean = false;


  isQuantityEdited: boolean = false;
  buttonStyle: string = '';

  ngOnInit() {
  }

  addToCart(productId: string) {
    this.isInCart = !this.isInCart;

    this.cartService.cartItems.push({
      product: this.product,
      quantity: 1,
      isInWishList: false,
    });

    this.cartRequestService.addToCart(productId).subscribe({
      next: (data) => console.log(data),
      error: (error) => console.log(error),
    });
  }

  addToWishList() {
    this.cartService.updataWishList(this.product._id);
    this.isInWishlist = !this.isInWishlist;
  }
}
