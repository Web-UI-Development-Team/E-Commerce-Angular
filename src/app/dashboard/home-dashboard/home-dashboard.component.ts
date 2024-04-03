import { Component, OnInit } from '@angular/core';
import { ProductsRequestsService } from '../../services/product/products-requests.service';
import { IProduct } from '../../../modles/product.modle';
import { MatDialog } from '@angular/material/dialog';
import { FormEditProductComponent } from '../products-dashboard/formEditProduct/form-edit-product/form-edit-product.component';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrl: './home-dashboard.component.css',
})
export class HomeDashboardComponent implements OnInit {
  allProducts: any;
  isLoading:boolean=false;

  constructor(
    private productRequestsServices: ProductsRequestsService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.isLoading=true;
    this.productRequestsServices
      .getAllProductsRequest(1)
      .subscribe((data: any) => {
        console.log(data);
        this.allProducts = data.products;
        console.log(this.allProducts);
        this.isLoading=false;
      });
  }

  openEditProductPopup(product: IProduct) {
   
    this.dialog.open(FormEditProductComponent, {
     
      data: { productId: product._id },
    });
   
  }
}
