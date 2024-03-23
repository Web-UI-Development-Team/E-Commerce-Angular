import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../modles/product.modle';
import { ProductsService } from '../../services/product/products.service';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { Router } from '@angular/router';
import { CartRequestService } from '../../services/cart/cart.request.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  product: IProduct[] = [];
  loading: boolean = false;
  isClicked: boolean = false;

  constructor(
    private productService: ProductsService,
    private router: Router,
    private cartReqService: CartRequestService
  ) {}

  ngOnInit(): void {
    // this.loading==false
    this.getProducts();
  }
  getProducts() {
    this.loading = true;
    this.productService.getAllProducts().subscribe(
      (res: any) => {
        // console.log(res);
        this.product = res;
        this.loading = false;
      },
      (err) => {
        alert(err.message);
        this.loading = false;

        console.log(err.message);
      }
    );
  }

  showDetails(productId: any) {
    this.router.navigate(['/productDetails', productId]);
  }

  addProductToCart(product: any) {
    console.log(product);

    this.cartReqService.addToCart(product).subscribe((res) => {
      console.log(res);
    });
  }
}
