import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { IProduct } from '../../../modles/product.modle';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from './addNewProduct/add-product/add-product.component';
import { ProductsRequestsService } from '../../services/product/products-requests.service';
import { range } from '../../utils/range';
import { FormEditProductComponent } from './formEditProduct/form-edit-product/form-edit-product.component';
import { error } from 'console';
import { FormControl, FormGroup } from '@angular/forms';
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  startWith,
  switchMap,
} from 'rxjs';
import { createHttpObservable } from '../../utils/createHttpObservable';

@Component({
  selector: 'app-products-dashboard',
  templateUrl: './products-dashboard.component.html',
  styleUrl: './products-dashboard.component.css',
})
export class ProductsDashboardComponent implements OnInit {
  // searchForm: FormGroup = new FormGroup({
  //   search: new FormControl(''),
  // });

  // searchedProduts: IProduct[] = [];

  products$: Observable<IProduct[]>;
  @ViewChild('searchInput', { static: true }) input: ElementRef;
  constructor(
    private productRequestsServices: ProductsRequestsService,
    private router: Router,
    private dialog: MatDialog
  ) {
    // this.searchForm
    //   .get('search')
    //   ?.valueChanges.pipe(
    //     debounceTime(400),
    //     distinctUntilChanged(),
    //     switchMap((value) =>
    //       this.productRequestsServices.getProductsSearchRequest(value)
    //     )
    //   )
    //   .subscribe((value) => {
    //     console.log(value);
    //     this.searchForm = value?.products;
    //   });
  }

  allProducts: IProduct[];
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

  // ngAfterViewInit() {
  //   console.log(this.input.nativeElement.value);
  //   this.products$ = fromEvent<any>(this.input.nativeElement, 'change').pipe(
  //     map((event) => event.target.value),
  //     startWith(''),
  //     debounceTime(500),
  //     distinctUntilChanged(),
  //     switchMap((search) => this.loadProducts(search))
  //   );
  //   console.log(this.products$);
  // }

  loadProducts(search = ''): Observable<IProduct[]> {
    console.log(search);
    return createHttpObservable(
      `http://localhost:3010/api/v1/products/search/product/${search}`
    ).pipe(map((res) => res['payload']));
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
      (item) => item._id === product._id
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
