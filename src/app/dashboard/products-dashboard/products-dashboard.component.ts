import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../modles/product.modle';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from './addNewProduct/add-product/add-product.component';
import { ProductsRequestsService } from '../../services/product/products-requests.service';
import { range } from '../../utils/range';
import { FormEditProductComponent } from './formEditProduct/form-edit-product/form-edit-product.component';

@Component({
  selector: 'app-products-dashboard',
  templateUrl: './products-dashboard.component.html',
  styleUrl: './products-dashboard.component.css',
})
export class ProductsDashboardComponent implements OnInit {
  constructor(
    private productRequestsServices: ProductsRequestsService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  allProducts: IProduct[];

  numberOfProducts = 30;
  numberOfProductsInPage = 4;

  numberOfPages = Math.ceil(
    this.numberOfProducts / this.numberOfProductsInPage
  );
  pages: any = [];

  ngOnInit() {
    this.productRequestsServices.getAllProductsRequest(1).subscribe((data) => {
      console.log(data);
      this.allProducts = data;
      console.log(this.allProducts);
    });
    this.pages = range(this.numberOfPages);
    console.log(this.pages);
  }

  currentPage(pageNumber: number) {
    this.productRequestsServices
      .getAllProductsRequest(pageNumber)
      .subscribe((data) => {
        console.log(data);
        this.allProducts = data;
      });
  }

  openAddProductPopup() {
    const dialogRef = this.dialog.open(AddProductComponent);
  }

  openEditProductPopup(product: IProduct) {
    this.dialog.open(FormEditProductComponent, {
      data: { productId: product._id },
    });
  }

  deleteProduct(product: IProduct) {
    const index = this.allProducts.findIndex(
      (item) => item._id === product._id
    );
    this.allProducts.splice(index, 1);
    console.log(index);
    console.log(product._id);
    console.log('deleted');
    this.productRequestsServices
      .deleteProductRequest(product)
      .subscribe((data) => {
        console.log(data);
      });
  }
}
