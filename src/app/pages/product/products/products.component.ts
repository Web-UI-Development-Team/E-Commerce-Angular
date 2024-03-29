import { Component, Input, OnInit, Output, input } from '@angular/core';
import { IProduct } from '../../../../modles/product.modle';
import { Router } from '@angular/router';
import { CartRequestService } from '../../../services/cart/cart.request.service';
import { ProductsRequestsService } from '../../../services/product/products-requests.service';
import { ICart } from '../../../../modles/cart.modle';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private productRequestServices: ProductsRequestsService,
    private productService: ProductsRequestsService,
    private router: Router,
    private cartReqService: CartRequestService
  ) {}

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
  clickedButtonIndex: number | null = null;
  products: IProduct[] = [];
  loading: boolean = false;

  ngOnInit(): void {
    // this.loading==false
    this.getProducts();
  }

  sortProductByPrice() {
    this.products.sort((a, b) => a.price - b.price);
  }
  getProducts() {
    this.loading = true;

    this.productRequestServices.getAllProductsRequest(4).subscribe(
      (res: any) => {
        // console.log(res);
        this.products = res.products;
        this.loading = false;
      },
      (err) => {
        alert(err.message);
        this.loading = false;

        console.log(err.message);
      }
    );
  }
}
