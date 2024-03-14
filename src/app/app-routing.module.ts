import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './product/products/products.component';
import { AboutComponent } from './static-pages/about/about.component';
import { ContactUsComponent } from './static-pages/contact-us/contact-us.component';
import { NotFound404Component } from './not-found404/not-found404.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { CartComponent } from './cart/cart.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersComponent } from './order/orders/orders.component';

const routes: Routes = [
  {path:"",redirectTo:"/home",pathMatch:'full'},
  {path:"signIn",component:SignInComponent},
  {path:"cart",component:CartComponent},
  {path:"home",component:HomeComponent},
  {path:"products",component:ProductsComponent,children:[
    // {path:"productDetails/:id",component:ProductDetailsComponent}
  ]},
  {path:"about",component:AboutComponent},
  {path:"dashboard",component:DashboardComponent}, 
  {path:"contactUs",component:ContactUsComponent},
  {path:"checkout",component:OrdersComponent},
  {path:"**",component:NotFound404Component},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
