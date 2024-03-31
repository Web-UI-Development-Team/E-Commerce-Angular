import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartRequestService } from '../../../services/cart/cart.request.service';
import { CartService } from '../../../services/cart/cart.service';
import { IProduct } from '../../../../modles/product.modle';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent implements OnInit {
  isClicked: boolean = false;
  buttonShow: boolean = false;
  buttonDisabled: boolean = false;

  buttonStyle: any = '';

  @Input() prd: IProduct = {
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
  };

  constructor(
    private router: Router,
    private cartService: CartService,
    private cartRequestService: CartRequestService
  ) {}

  ngOnInit(): void {
    // console.log(this.cartService.productIds);
    if (this.cartService.productIds.includes(this.prd._id)) {
      this.isClicked = true;
    }
  }

  showDetails(productId: any) {
    this.router.navigate(['/productDetails', productId]);
  }

  addProductToCart(productId: string) {
    this.isClicked = !this.isClicked;
    this.buttonDisabled = true;

    this.cartService.cartItems.push({
      product: this.prd,
      quantity: 1,
      isInWishList: false,
    });

    this.cartRequestService.addToCart(productId).subscribe({
      next: (data) => console.log(data),
      error: (error) => console.log(error),
    });
  }

  showButton(id: any) {
    this.buttonShow = true;
  }
  hideButton(id: any) {
    this.buttonShow = false;
  }
}
