import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { IProduct } from '../../../../modles/product.modle';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsRequestsService } from '../../../services/product/products-requests.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  productDetails: any = {};
  loading: boolean = false;
  buttonShow: boolean = false;
  subscription: Subscription;

  constructor(
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private productsRequestsService: ProductsRequestsService
  ) {
    this.subscription = this.activatedRouter.params.subscribe({
      next: (data) => this.getProductById(data['id'])
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  ngOnInit(): void {
    this.loading = true;
    const productId = this.activatedRouter.snapshot.paramMap.get('id');
    console.log(productId);

    this.getProductById(productId);
  }

  getProductById(id: any) {
    this.loading = true;
    this.productsRequestsService.getProductByIdRequest(id).subscribe(
      (res: any) => {
        this.productDetails = res;
        this.loading = false;
      },
      (err) => {
        this.loading = true;
        alert(err.message);
      }
    );
  }

  showButton(id: any) {
    this.buttonShow = true;
  }

  hideButton(id: any) {
    this.buttonShow = false;
  }
}
