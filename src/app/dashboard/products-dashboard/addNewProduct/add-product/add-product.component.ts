import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductsRequestsService } from '../../../../services/product/products-requests.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private productRequestServices: ProductsRequestsService,
    private router: Router,
    public dialogRef: MatDialogRef<AddProductComponent>
  ) {}
  numberPattern = /^[0-9]+$/;
  productForm: FormGroup = this.formBuilder.group({
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

  initialFormValues = {
    title: '',
    description: '',
    price: 0,
    discount: 0,
    stock: 0,
    brand: '',
    category: '',
    thumbnail: '',
    images: [
      'https://cdn.dummyjson.com/product-images/8/1.jpg',
      'https://cdn.dummyjson.com/product-images/8/2.jpg',
      'https://cdn.dummyjson.com/product-images/8/3.jpg',
      'https://cdn.dummyjson.com/product-images/8/4.jpg',
      'https://cdn.dummyjson.com/product-images/8/thumbnail.jpg',
    ],
  };

  ngOnInit(): void {
    //this.productService.addNewProduct(this.initialFormValues);
  }

  closePopUp(): void {
    this.dialogRef.close();
  }

  getFormControl(controlName: string) {
    return this.productForm.get(controlName);
  }

  addProduct() {
    console.log(this.productForm);
    console.log(this.productForm.value);
    this.productForm.value.images = this.initialFormValues.images;
    this.productRequestServices.addNewProductRequest(this.productForm.value);
    this.router.navigate(['/dashboard/products']);
  }
}
