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
  products$: Observable<any>;

  @ViewChild('searchInput', { static: true }) input: ElementRef;
  searchFormControl: FormControl = new FormControl();
  constructor(
    private productRequestsServices: ProductsRequestsService,
    private dialog: MatDialog,
    private http: HttpClient
  ) {
    // this.initSearchForm();
  }

  allProducts: any;
  product: IProduct;
  isLoading:boolean=false;

  numberOfPages: number;
  pages: any = [];
  page: number;

  // initSearchForm(): void {
  //   this.searchFormControl.valueChanges
  //     .pipe(
  //       debounceTime(1000),
  //       distinctUntilChanged(),
  //       switchMap((search: string): Observable<any[]> => {
  //         if (search) {
  //           return this.productRequestsServices
  //             .getProductsSearchRequest(search)
  //             .pipe(
  //               catchError((error) => {
  //                 console.error(error);
  //                 return of([]);
  //               })
  //             );
  //         } else {
  //           console.log(this.allProducts);
  //           return of([]);
  //         }
  //       }),
  //       catchError((error) => {
  //         console.log(error);
  //         return of([]);
  //       })
  //     )
  //     .subscribe((response: any[]) => {
  //       this.allProducts = response;
  //       console.log(response);
  //     });
  // }

  ngAfterViewInit() {
    this.searchFormControl.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((search: any) => {
        console.log(search);
        return this.loadProducts(search);
      })
    );
  }

  loadProducts(search = ''): Observable<any> {
    return createHttpObservable(
      `http://localhost:3010/api/v1/products/search/product/${search}`
    ).pipe(
      map((res) => {
        console.log(res);
        return res['payload'];
      })
    );
  }

  ngOnInit() {
    this.isLoading=true;
    this.productRequestsServices
      .getAllProductsRequest(1)
      .subscribe((data: any) => {
        this.isLoading=false;
        console.log(data);
        console.log(data.products);
        this.allProducts = data.products;
        this.numberOfPages = data.pages;
        console.log(this.allProducts);
        this.page = 1;
        this.pages = range(this.numberOfPages);
      });
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
    const index = this.allProducts.findIndex(
      (item: any) => item._id === product._id
    );
    this.allProducts.splice(index, 1);
    console.log(index);
    console.log(product._id);
    console.log('deleted');
    this.productRequestsServices.deleteProductRequest(product).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
