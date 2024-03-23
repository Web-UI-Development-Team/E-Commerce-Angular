import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }
  createNewUserRequest(user:any){
    console.log(user)
    return this.httpClient.post('http://localhost:3010/api/v1/users/register',user)
  }
}
