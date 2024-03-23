import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CartRequestService } from '../../services/cart/cart.request.service';
import { CartService } from '../../services/cart/cart.service';
import { IProduct } from '../../../modles/product.modle';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  isClicked:boolean = false;
  buttonStyle:any='';

  @Input()prd:IProduct={_id: '',
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
  }

  constructor(
   
    private router: Router,
    private cartReqService: CartRequestService,
    private cartService: CartService
  ) {}

  showDetails(productId: any) {
    this.router.navigate(['/productDetails', productId]);
  }
  
  addProductToCart(product:any) {
   
    this.isClicked= !this.isClicked
    this.cartService.cartItems.push({product:this.prd,quantity:1,isInWishList:false})
    this.cartReqService.addToCart(product).subscribe((res) => {
      console.log(res);
    
    });
  }


}
