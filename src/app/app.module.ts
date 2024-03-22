import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ProductsComponent } from './product/products/products.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { OrdersComponent } from './order/orders/orders.component';
import { AboutComponent } from './static-pages/about/about.component';
import { ContactUsComponent } from './static-pages/contact-us/contact-us.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrderDetailsComponent } from './order/order-details/order-details.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { CartComponent } from './cart/cart.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { CartItemComponent } from './cart/cart-item/cart-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { NotFound404Component } from './not-found404/not-found404.component';
import { SideBarComponent } from './dashboard/side-bar/side-bar.component';
import { HomeDashboardComponent } from './dashboard/home-dashboard/home-dashboard.component';
import { UsersDashboardComponent } from './dashboard/users-dashboard/users-dashboard.component';
import { ProductsDashboardComponent } from './dashboard/products-dashboard/products-dashboard.component';
import { CategoriesDashboardComponent } from './dashboard/categories-dashboard/categories-dashboard.component';
import { FormEditProductComponent } from './dashboard/products-dashboard/formEditProduct/form-edit-product/form-edit-product.component';
import { AddProductComponent } from './dashboard/products-dashboard/addNewProduct/add-product/add-product.component';
import { AddNewUserComponent } from './dashboard/users-dashboard/add-new-user/add-new-user.component';
import { EditUserComponent } from './dashboard/users-dashboard/edit-user/edit-user.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    UserProfileComponent,
    ProductsComponent,
    ProductDetailsComponent,
    OrdersComponent,
    AboutComponent,
    ContactUsComponent,
    DashboardComponent,
    OrderDetailsComponent,
    NavBarComponent,
    FooterComponent,
    CartComponent,
    CartItemComponent,
    HomeComponent,
    NotFound404Component,
    SideBarComponent,
    HomeDashboardComponent,
    UsersDashboardComponent,
    ProductsDashboardComponent,
    CategoriesDashboardComponent,
    FormEditProductComponent,
    AddProductComponent,
    AddNewUserComponent,
    EditUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideClientHydration(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
