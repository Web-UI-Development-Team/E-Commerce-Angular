import { Component, OnInit } from '@angular/core';
import { ProductsRequestsService } from '../../services/product/products-requests.service';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrl: './home-dashboard.component.css',
})
export class HomeDashboardComponent implements OnInit {
  allProducts: any;

  constructor(private productRequestsServices: ProductsRequestsService) {}

  ngOnInit() {
    this.productRequestsServices
      .getAllProductsRequest(1)
      .subscribe((data: any) => {
        console.log(data);
        this.allProducts = data.products;
        console.log(this.allProducts);
      });
  }
}
