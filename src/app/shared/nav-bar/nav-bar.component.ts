import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth/auth.service';
import {
  Observable,
  catchError,
  map,
} from 'rxjs';
import { IProduct } from '../../../modles/product.modle';
import { createHttpObservable } from '../../utils/createHttpObservable';
import { CartRequestService } from '../../services/cart/cart.request.service';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})

export class NavBarComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private cartRequestService: CartRequestService,
    public cartService: CartService
  ) {}

  active:boolean=false;
  isAuth: boolean = false;
  role: string = '';

  ngOnInit() {
    this.isAuth = this.authService.isAuthenticated();
    this.role = this.authService.role();

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

  loadProducts(search = 'i'): Observable<IProduct[]> {
    return createHttpObservable(
      `http://localhost:3010/api/v1/products/search/product/${search}`
    ).pipe(
      map((res: any) => {
        console.log(res);
        return res['payload'];
        //return res.json();
      }),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }
}
