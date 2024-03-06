import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

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
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
