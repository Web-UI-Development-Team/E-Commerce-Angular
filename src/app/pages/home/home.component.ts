import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
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

  next = false;
  prev = false;
  firstIndex = 0;
  secIndex = 0;

  bannerData = [
    {
      img: '../../../assets/banner-images/1.jpg',
      title: 'Unleash Your Creativity: The New MacBook Pro is Here',
      desc: `
      Experience groundbreaking performance with the all-new M2 chip. Tackle demanding workflows
            with ease. Edit videos, render 3D graphics, and code like a pro. The new MacBook Pro is built for those who
            push boundaries.`,
    },
    {
      img: '../../../assets/banner-images/2.jpg',
      title:
        'Capture Every Detail: Stunning Photos with the New Nikon Z Series Camera',
      desc: `Experience exceptional clarity and detail with the new Nikon Z Series camera. Its advanced
      image sensor and powerful processor deliver stunning photos and videos, even in low-light conditions.`,
    },
    {
      img: '../../../assets/banner-images/3.jpg',
      title: 'Dive into the Future: Discover Cutting-Edge Tech Products',
      desc: `Tired of the same old tech? We've got a selection of groundbreaking products that will
      transform the way you interact with the world. Discover innovative solutions designed to streamline your
      life, boost productivity, and unlock new possibilities.`,
    },
    {
      img: '../../../assets/banner-images/4.jpg',
      title: 'Immerse Yourself in Sound: Experience the New Boss Headphones',
      desc: `Get lost in the details of your music with the new Boss headphones. Featuring premium
      drivers and advanced noise cancellation, these headphones deliver an exceptional listening experience.`,
    },
  ];

  constructor(
    private cartRequestService: CartRequestService,
    private categoryRequestsServices: CategoryRequestsService,
    private productRequestsServices: ProductsRequestsService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('token')) {
        this.cartRequestService.getUserCartRequest().subscribe({
          next: (carts) => (this.cartService.cartItems = carts),
          error: (error) => console.log(error),
          complete: () => {
            this.cartService.productIds = this.cartService.cartItems.map(
              (cart) => cart.product._id
            );
          },
        });
      }
    }

    this.categoryRequestsServices
      .getAllCategoriesRequest()
      .subscribe((data: any) => {
        this.allCategories = data.data;
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

  onClickNext() {
    this.next = !this.next;

    this.secIndex = this.firstIndex + 1;

    if (this.secIndex == 4) {
      this.secIndex = 0;
    }

    setTimeout(() => {
      this.next = false;

      this.firstIndex = this.secIndex;
    }, 1000);
  }

  onClickPrev() {
    this.prev = !this.prev;

    this.secIndex = this.firstIndex - 1;

    if (this.secIndex == -1) {
      this.secIndex = 3;
    }

    setTimeout(() => {
      this.prev = false;

      this.firstIndex = this.secIndex;
    }, 1000);
  }
}
