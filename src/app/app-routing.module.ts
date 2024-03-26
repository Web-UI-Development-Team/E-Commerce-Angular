import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/product/products/products.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { NotFound404Component } from './pages/not-found404/not-found404.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductDetailsComponent } from './pages/product/product-details/product-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { UserFormComponent } from './pages/user-profile/user-form/user-form.component';
import { OrdersComponent } from './pages/order/orders/orders.component';
import { OrderDetailsComponent } from './pages/order/order-details/order-details.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { HomeDashboardComponent } from './dashboard/home-dashboard/home-dashboard.component';
import { ProductsDashboardComponent } from './dashboard/products-dashboard/products-dashboard.component';
import { UsersDashboardComponent } from './dashboard/users-dashboard/users-dashboard.component';
import { CategoriesDashboardComponent } from './dashboard/categories-dashboard/categories-dashboard.component';
import { FormEditProductComponent } from './dashboard/products-dashboard/formEditProduct/form-edit-product/form-edit-product.component';
import { AddProductComponent } from './dashboard/products-dashboard/addNewProduct/add-product/add-product.component';
import { AddNewUserComponent } from './dashboard/users-dashboard/add-new-user/add-new-user.component';
import { EditUserComponent } from './dashboard/users-dashboard/edit-user/edit-user.component';
import { OrdersDashboardComponent } from './dashboard/orders-dashboard/orders-dashboard.component';
import { AuthGuard } from './services/guards/auth-guard.service';
import { WishListComponent } from './pages/wish-list/wish-list.component';
import { AccountComponent } from './pages/user-profile/account/account.component';
import { AdminGuard } from './services/guards/admin-guard.service';

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
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivateChild: [AdminGuard],
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        redirectTo: 'homedashboard',
        pathMatch: 'full',
      },
      {
        path: 'homedashboard',
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
