import { Component, OnInit } from '@angular/core';
import { CartRequestService } from '../../services/cart/cart.request.service';
import { CartService } from '../../services/cart/cart.service';
import { CategoryRequestsService } from '../../services/category/category-requests.service';
import { ICategory } from '../../../modles/category';
import { ProductsRequestsService } from '../../services/product/products-requests.service';
import { Router } from '@angular/router';
import { IProduct } from '../../../modles/product.modle';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  allCategories: ICategory[];
  allProducts: any;
  selectedCategory: ICategory | null;
  product: IProduct;

  constructor(
    private cartRequestService: CartRequestService,
    private categoryRequestsServices: CategoryRequestsService,
    private productRequestsServices: ProductsRequestsService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartRequestService.getUserCartRequest().subscribe({
      next: (carts) => (this.cartService.cartItems = carts),
      error: (error) => console.log(error),
      complete: () => {
        this.cartService.productIds = this.cartService.cartItems.map(
          (cart) => cart.product._id
        );
      },
    });

    this.categoryRequestsServices
      .getAllCategoriesRequest()
      .subscribe((data: any) => {
        this.allCategories = data.data;
        console.log(this.allCategories);
        console.log(data);
      });
    this.getAllProducts();
  }

  getProductsByCategory(category: ICategory) {
    console.log(category);
    this.selectedCategory = category;
    console.log(this.selectedCategory);
    this.categoryRequestsServices
      .getProductsByCategoryRequest(category)
      .subscribe((data) => {
        this.allProducts = data;
        console.log(this.allProducts);
        console.log(data);
      });
  }

  getAllProducts() {
    this.productRequestsServices
      .getAllProductsRequest(1)
      .subscribe((data: any) => {
        console.log(data);
        this.allProducts = data.products;
      });
  }

  addProductToCart(product: IProduct) {
    this.cartService.cartItems.push({
      product: product,
      quantity: 1,
      isInWishList: false,
    });
    this.cartRequestService.addToCart(product._id).subscribe({
      next: (data) => console.log(data),
      error: (error) => console.log(error),
    });
  }

  showDetails(productId: any) {
    this.router.navigate(['/productDetails', productId]);
  }
}
