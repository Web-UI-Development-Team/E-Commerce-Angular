import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsRequestsService } from '../../../../services/product/products-requests.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IProduct, IUpdateProduct } from '../../../../../modles/product.modle';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

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
    @Inject(MAT_DIALOG_DATA) public data: { productId: string },
    private formBuilder: FormBuilder,
    private productRequestServices: ProductsRequestsService,
    private router: Router,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<FormEditProductComponent>
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
    //const id = param.get('id');
    const id = this.data.productId;
    if (id) {
      this.getProduct(id);
      this.productId = id;
    }
  }

  getFormControl(controlName: string) {
    return this.productForm.get(controlName);
  }

  closePopUp(): void {
    this.dialogRef.close();
  }

  getProduct(id: string) {
    console.log(id);
    this.productRequestServices.getProductByIdRequest(id).subscribe(
      (data: IProduct) => {
        this.product = data;
        console.log(data);
        this.productForm.patchValue({
          ...this.product,
          category: this.product.category.nameCategory,
        });

        this.originalProduct = { ...this.product };
      },
      (error) => {
        console.log(error);
      }
    );
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
    this.productRequestServices
      .updateProductDataRequest(updatedProductData, this.productId)
      .subscribe((data) => console.log(data));
    // this.router.navigate(['/dashboard/products']);
    this.dialogRef.close();
  }
}
