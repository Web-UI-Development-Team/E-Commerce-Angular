import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth/auth.service';
import {
  Observable,
  catchError,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  startWith,
  switchMap,
} from 'rxjs';
import { IProduct } from '../../../modles/product.modle';
import { createHttpObservable } from '../../utils/createHttpObservable';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit, AfterViewInit {
  products$: Observable<IProduct[]>;

  @ViewChild('searchInput', { static: true }) input: ElementRef;
  constructor(private authService: AuthService) {}
  isAuth: boolean = false;

  ngOnInit() {
    this.isAuth = this.authService.isAuthenticated();
  }

  ngAfterViewInit() {
    this.products$ = fromEvent<any>(this.input.nativeElement, 'keyup').pipe(
      map((evevt) => {
        console.log(evevt.target.value);
        return evevt.target.value;
      }),
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((search: any) => this.loadProducts(search)),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  loadProducts(search = 'i'): Observable<IProduct[]> {
    return createHttpObservable(
      `http://localhost:3010/api/v1/products/search/product/${search}`
    ).pipe(
      map((res: any) => {
        console.log(res);
        return res['payload'];
        //return res.json();
      }),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }
}
