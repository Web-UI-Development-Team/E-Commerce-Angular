import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {
  active:boolean=false;

  
  constructor(private authService: AuthService) {}

  isAuth: boolean = false;

  
  
  ngOnInit() {
    this.isAuth = this.authService.isAuthenticated();
   
    
   
  }
}
