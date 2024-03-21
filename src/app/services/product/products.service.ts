import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient:HttpClient){
  
  }

  getAllProducts(){
   return this.httpClient.get('http://localhost:3010/api/v1/products');
  }

  getProductsById(prdId:any){
    return this.httpClient.get(`http://localhost:3010/api/v1/products/${prdId}`)
  }
}
