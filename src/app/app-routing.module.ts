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
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserFormComponent } from './user-profile/user-form/user-form.component';
import { OrdersComponent } from './order/orders/orders.component';
import { OrderDetailsComponent } from './order/order-details/order-details.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { HomeDashboardComponent } from './dashboard/home-dashboard/home-dashboard.component';
import { ProductsDashboardComponent } from './dashboard/products-dashboard/products-dashboard.component';
import { UsersDashboardComponent } from './dashboard/users-dashboard/users-dashboard.component';
import { CategoriesDashboardComponent } from './dashboard/categories-dashboard/categories-dashboard.component';
import { FormEditProductComponent } from './dashboard/products-dashboard/formEditProduct/form-edit-product/form-edit-product.component';
import { AddProductComponent } from './dashboard/products-dashboard/addNewProduct/add-product/add-product.component';
import { AddNewUserComponent } from './dashboard/users-dashboard/add-new-user/add-new-user.component';
import { EditUserComponent } from './dashboard/users-dashboard/edit-user/edit-user.component';
import { OrdersDashboardComponent } from './dashboard/orders-dashboard/orders-dashboard.component';
import { AuthGuard } from './guards/auth-guard.service';
import { WishListComponent } from './wish-list/wish-list.component';
import { AccountComponent } from './user-profile/account/account.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'signIn', component: SignInComponent },
  { path: 'signUp', component: SignUpComponent },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'productDetails/:id', component: ProductDetailsComponent },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'account',
        component: AccountComponent,
        children: [{ path: 'edit', component: UserFormComponent }],
      },
      { path: 'orders', component: OrderDetailsComponent },
      { path: 'orders-history', component: OrderDetailsComponent },
      { path: 'wish-list', component: WishListComponent },
    ],
  },
  { path: 'cart', canActivate: [AuthGuard], component: CartComponent },
  {
    path: 'contactUs',
    canActivate: [AuthGuard],
    component: ContactUsComponent,
  },
  { path: 'checkout', canActivate: [AuthGuard], component: OrdersComponent },

  { path: 'about', component: AboutComponent },
  { path: 'orderDetails', component: OrderDetailsComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      // {
      //   path: '',
      //   redirectTo: '/home',
      //   pathMatch: 'full',
      // },
      {
        path: 'home',
        component: HomeDashboardComponent,
      },
      {
        path: 'products',
        component: ProductsDashboardComponent,
      },
      {
        path: 'users',
        component: UsersDashboardComponent,
      },
      {
        path: 'categories',
        component: CategoriesDashboardComponent,
      },
      {
        path: 'orders',
        component: OrdersDashboardComponent,
      },
      {
        path: 'editProduct/:id',
        component: FormEditProductComponent,
      },
      {
        path: 'addProduct',
        component: AddProductComponent,
      },
      {
        path: 'addUser',
        component: AddNewUserComponent,
      },
      {
        path: 'editUser/:id',
        component: EditUserComponent,
      },
    ],
  },
  { path: '**', component: NotFound404Component },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
