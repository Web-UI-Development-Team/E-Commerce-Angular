import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct, IUpdateProduct } from '../../../modles/product.modle';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsRequestsService {
  constructor(private httpClient: HttpClient) {}

  getAllProductsRequest(pageNumber: number) {
    return this.httpClient.get<IProduct[]>(
      `http://localhost:3010/api/v1/products/?page=${pageNumber}`
    );
  }

  getProductsSearchRequest(search: string): Observable<any> {
    return this.httpClient.get(
      `http://localhost:3010/api/v1/products/search/product/${search}`
    );
  }

  getProductByIdRequest(_id: string): Observable<IProduct> {
    return this.httpClient.get<IProduct>(
      `http://localhost:3010/api/v1/products/${_id}`
    );
  }

  addNewProductRequest(data: IProduct) {
    console.log(data);
    return this.httpClient.post<IProduct>(
      'http://localhost:3010/api/v1/products',
      data
    );
  }

  updateProductDataRequest(data: IUpdateProduct, _id: string) {
    return this.httpClient.patch<IUpdateProduct>(
      `http://localhost:3010/api/v1/products/${_id}`,
      data
    );
  }

  deleteProductRequest(data: IProduct) {
    return this.httpClient.delete<IProduct>(
      `http://localhost:3010/api/v1/products/${data._id}`
    );
  }
}
