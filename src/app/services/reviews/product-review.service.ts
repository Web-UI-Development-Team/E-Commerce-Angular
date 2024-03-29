import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reviews } from '../../../modles/review.modle';
@Injectable({
  providedIn: 'root'
})
export class ProductReviewService {

  constructor(private http : HttpClient) { }
  getAllreviews(productId:string){
    return this.http.get<Reviews[]>(`http://localhost:3010/api/v1/products/${productId}/reviews`);
  }
}
