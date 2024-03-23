import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../modles/product.modle';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsRequestsService } from '../../services/product/products-requests.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  productDetails: any = {};
  loading: boolean = false;

  constructor(
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private productServiceRequest: ProductsRequestsService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    const productId = this.activatedRouter.snapshot.paramMap.get('id');
    // console.log(productId);

    this.getProductById(productId);
  }
  getProductById(id: any) {
    this.loading = true;
    this.productServiceRequest.getProductByIdRequest(id).subscribe(
      (res: any) => {
        this.productDetails = res;
        console.log(this.productDetails);
        this.loading = false;
      },
      (err) => {
        this.loading = true;
        alert(err.message);
      }
    );
  }
}
