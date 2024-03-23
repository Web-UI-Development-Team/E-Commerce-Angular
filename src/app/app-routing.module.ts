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
import { Sign } from 'node:crypto';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { HomeDashboardComponent } from './dashboard/home-dashboard/home-dashboard.component';
import { ProductsDashboardComponent } from './dashboard/products-dashboard/products-dashboard.component';
import { UsersDashboardComponent } from './dashboard/users-dashboard/users-dashboard.component';
import { CategoriesDashboardComponent } from './dashboard/categories-dashboard/categories-dashboard.component';
import { FormEditProductComponent } from './dashboard/products-dashboard/formEditProduct/form-edit-product/form-edit-product.component';
import { AddProductComponent } from './dashboard/products-dashboard/addNewProduct/add-product/add-product.component';
import { AddNewUserComponent } from './dashboard/users-dashboard/add-new-user/add-new-user.component';
import { EditUserComponent } from './dashboard/users-dashboard/edit-user/edit-user.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'signIn', component: SignInComponent },
  {path:"signUp",component:SignUpComponent},
  { path: 'cart', component: CartComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'products',
    component: ProductsComponent,
    children: [
      // {path:"productDetails/:id",component:ProductDetailsComponent}
    ],
  },
  { path: 'about', component: AboutComponent },
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
        // children: [
        //   {
        //     path: 'add',
        //     component: AddProductComponent,
        //   },
        // ],
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
  { path: 'contactUs', component: ContactUsComponent },
  { path: '**', component: NotFound404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
