import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { IProduct } from '../../../modles/product.modle';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from './addNewProduct/add-product/add-product.component';
import { ProductsRequestsService } from '../../services/product/products-requests.service';
import { range } from '../../utils/range';
import { FormEditProductComponent } from './formEditProduct/form-edit-product/form-edit-product.component';
// import {
//   Observable,
//   debounceTime,
//   distinctUntilChanged,
//   fromEvent,
//   map,
//   startWith,
//   switchMap,
// } from 'rxjs';
import { Observable, fromEvent, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { createHttpObservable } from '../../utils/createHttpObservable';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-products-dashboard',
  templateUrl: './products-dashboard.component.html',
  styleUrl: './products-dashboard.component.css',
})
export class ProductsDashboardComponent implements OnInit, AfterViewInit {
  products$: any;
  @ViewChild('searchInput', { static: true }) input: ElementRef;

  constructor(
    private productRequestsServices: ProductsRequestsService,
    private dialog: MatDialog,
    private http: HttpClient
  ) {
    // this.initSearchForm();
  }

  allProducts: any;
  product: IProduct;

  numberOfPages: number;
  pages: any = [];
  page: number;

  ngOnInit() {
    this.productRequestsServices
      .getAllProductsRequest(1)
      .subscribe((data: any) => {
        console.log(data);
        console.log(data.products);
        this.allProducts = data.products;
        this.numberOfPages = data.pages;
        console.log(this.allProducts);
        this.page = 1;
        this.pages = range(this.numberOfPages);
      });
  }

  ngAfterViewInit() {
    this.products$ = fromEvent<any>(this.input.nativeElement, 'keyup')
      .pipe(
        map((event) => {
          console.log(event.target.value);
          return event.target.value;
        }),
        startWith(''),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((search) => this.loadProducts(search))
      )
      .subscribe();
  }

  loadProducts(search: string): Observable<any> {
    if (search) {
      return createHttpObservable(
        `http://localhost:3010/api/v1/products/search/product/${search}`
      ).pipe(
        map((res) => {
          console.log(res);
          this.allProducts = res;
          console.log(this.allProducts);
          return res['payload'];
        })
      );
    } else {
      this.productRequestsServices
        .getAllProductsRequest(1)
        .subscribe((data: any) => {
          console.log(data);
          this.allProducts = data.products;
        });
      console.log(this.allProducts);
      return this.allProducts;
    }
  }

  currentPage(pageNumber: number) {
    this.productRequestsServices
      .getAllProductsRequest(pageNumber)
      .subscribe((data: any) => {
        console.log(data);
        this.allProducts = data.products;
      });
  }

  nextPage(pageNumber: number) {
    this.page = pageNumber + 1;
    this.currentPage(this.page);
  }

  prevPage(pageNumber: number) {
    console.log(pageNumber);
    this.page = pageNumber - 1;
    this.currentPage(this.page);
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
    product.isDeleted = true;
    console.log(product.isDeleted);
    this.productRequestsServices
      .updateProductDataRequest({ isDeleted: product.isDeleted }, product._id)
      .subscribe((data) => {
        console.log(data);
      });
    // const index = this.allProducts.findIndex(
    //   (item: any) => item._id === product._id
    // );
    // this.allProducts.splice(index, 1);
    // console.log(index);
    // console.log(product._id);
    // console.log('deleted');
    // this.productRequestsServices.deleteProductRequest(product).subscribe(
    //   (data) => {
    //     console.log(data);
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }
}
