import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsRequestsService } from '../../../../services/product/products-requests.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProductsService } from '../../../../services/product/products.service';
import { IUpdateProduct } from '../../../../../modles/product.modle';

@Component({
  selector: 'app-form-edit-product',
  templateUrl: './form-edit-product.component.html',
  styleUrl: './form-edit-product.component.css',
})
export class FormEditProductComponent implements OnInit {
  productForm: FormGroup;
  product: IUpdateProduct;
  originalProduct: IUpdateProduct;
  productId: string;

  numberPattern = /^[0-9]+$/;

  constructor(
    private productService: ProductsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.productForm = this.formBuilder.group({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(500),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(1000),
      ]),
      price: new FormControl<Number>(0, [
        Validators.required,
        Validators.pattern(this.numberPattern),
      ]),
      discount: new FormControl<Number>(0, [
        Validators.required,
        Validators.pattern(this.numberPattern),
      ]),
      stock: new FormControl<Number>(0, [
        Validators.required,
        Validators.pattern(this.numberPattern),
      ]),
      brand: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(500),
      ]),
      category: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      thumbnail: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(500),
      ]),
      images: new FormControl([''], [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      const id = param.get('id');
      if (id) {
        this.getProduct(id);
        this.productId = id;
      }
    });
  }

  getFormControl(controlName: string) {
    return this.productForm.get(controlName);
  }

  getProduct(id: string) {
    console.log(id);
    this.productService.getProductById(id);
    this.product = this.productService.product;
    this.productForm.patchValue({
      ...this.product,
      category: this.product.category.nameCategory,
    });
    //this.productForm.patchValue(this.product);
    this.originalProduct = { ...this.product };
  }

  updateProduct() {
    const updatedProductData: IUpdateProduct = {};
    Object.keys(this.productForm.controls).forEach((key: string) => {
      const control = this.productForm.get(key);
      if (
        control &&
        control.dirty &&
        control.value !== this.originalProduct[key as keyof IUpdateProduct]
      ) {
        updatedProductData[key as keyof IUpdateProduct] = control.value;
      }
    });
    this.product = this.productForm.value;
    console.log(updatedProductData);
    console.log(this.product);
    this.productService.updateProductData(updatedProductData, this.productId);
    this.router.navigate(['/dashboard/products']);
  }
}
