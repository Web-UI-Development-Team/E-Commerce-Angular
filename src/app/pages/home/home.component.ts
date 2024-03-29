import { Component, OnInit } from '@angular/core';
import { CartRequestService } from '../../services/cart/cart.request.service';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(
    private cartRequestService: CartRequestService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartRequestService.getUserCartRequest().subscribe({
      next: (carts) => (this.cartService.cartItems = carts),
      error: (error) => console.log(error),
      complete: () => {
        this.cartService.productIds = this.cartService.cartItems.map(
          (cart) => cart.product._id
        );
      },
    });
  }
}
