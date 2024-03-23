import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../../modles/user.modle';

@Injectable({
  providedIn: 'root',
})
export class UserProfileRequestService {
  constructor(private http: HttpClient) {}

  getUserDataRequest(): Observable<IUser> {
    return this.http.get<IUser>('http://localhost:3010/api/v1/profile');
  }
  postProductRequest(): Observable<any> {
    return this.http.post<any>('http://localhost:3010/api/v1/products', {
      title: 'Test',
      description: 'An apple mobile which is nothing like apple',
      price: 20000,
      discount: 50,
      stock: 94,
      brand: 'Apple',
      category: '65e86d05869d859988c61634',
      thumbnail: 'https://cdn.dummyjson.com/product-images/1/thumbnail.jpg',
      images: [
        'https://cdn.dummyjson.com/product-images/1/1.jpg',
        'https://cdn.dummyjson.com/product-images/1/2.jpg',
        'https://cdn.dummyjson.com/product-images/1/3.jpg',
        'https://cdn.dummyjson.com/product-images/1/4.jpg',
        'https://cdn.dummyjson.com/product-images/1/thumbnail.jpg',
      ],
    });
  }
}
