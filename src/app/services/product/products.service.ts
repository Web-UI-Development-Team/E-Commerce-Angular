import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct, IUpdateProduct } from '../../../modles/product.modle';
import { ProductsRequestsService } from './products-requests.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  allProducts: IProduct[] = [];
  product: IProduct;

  constructor(
    private productRequestService: ProductsRequestsService,
    private httpClient: HttpClient
  ) {}

  getAllProducts() {
    return this.httpClient.get('http://localhost:3010/api/v1/products');
  }

  getProductById(id: string) {
    this.productRequestService.getProductByIdRequest(id).subscribe(
      (data: IProduct) => {
        console.log(data);
        this.product = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addNewProduct(product: IProduct) {
    console.log(product);
    this.productRequestService
      .addNewProductRequest(product)
      .subscribe((data) => console.log(data));
  }

  updateProductData(product: IUpdateProduct, _id: string) {
    console.log(_id);
    this.productRequestService
      .updateProductDataRequest(product, _id)
      .subscribe((data) => console.log(data));
  }

  deleteProduct(product: IProduct) {
    console.log(product._id);
    this.productRequestService
      .deleteProductRequest(product)
      .subscribe((data) => console.log(data));
  }
}
