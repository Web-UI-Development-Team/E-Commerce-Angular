import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../modles/product.modle';
import { ProductsService } from '../../services/product/products.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from './addNewProduct/add-product/add-product.component';

@Component({
  selector: 'app-products-dashboard',
  templateUrl: './products-dashboard.component.html',
  styleUrl: './products-dashboard.component.css',
})
export class ProductsDashboardComponent implements OnInit {
  constructor(
    private productService: ProductsService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  allProducts: IProduct[] = this.productService.allProducts;

  ngOnInit() {
    this.productService.getAllProducts();
    this.allProducts = this.productService.allProducts;
    console.log(this.allProducts);
    console.log(this.allProducts.length);
  }

  // goToAddProductpage() {
  //   console.log('hello');
  //   this.router.navigate(['/dashboard/addProduct']);
  // }

  openAddProductPopup() {
    const dialogRef = this.dialog.open(AddProductComponent);
  }

  goToEditProductpage(product: IProduct) {
    console.log(product._id);
    this.router.navigate([`/dashboard/editProduct/${product._id}`]);
  }

  deleteProduct(product: IProduct) {
    console.log(product._id);
    console.log('deleted');
    this.productService.deleteProduct(product);
  }
}
