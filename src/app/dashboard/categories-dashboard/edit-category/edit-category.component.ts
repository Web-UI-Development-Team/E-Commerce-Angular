import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IUpdateCategory } from '../../../../modles/category';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryRequestsService } from '../../../services/category/category-requests.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css',
})
export class EditCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  category: IUpdateCategory;
  originalCategory: IUpdateCategory;
  categoryId: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { categoryId: string },
    private formBuilder: FormBuilder,
    private categoryRequestsService: CategoryRequestsService,
    private router: Router,
    public dialogRef: MatDialogRef<EditCategoryComponent>
  ) {
    this.categoryForm = this.formBuilder.group({
      nameCategory: new FormControl('', [
        Validators.required,
        Validators.maxLength(500),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.maxLength(2500),
      ]),
      icon: new FormControl<String>(
        'https://cdn-icons-png.freepik.com/512/190/190497.png',
        [Validators.required]
      ),
    });
  }

  ngOnInit() {
    const id = this.data.categoryId;
    if (id) {
      console.log(id);
      this.getCategory(id);
      this.categoryId = id;
    }
  }

  getCategory(id: string) {
    this.categoryRequestsService.getCategoryByIdRequest(id).subscribe(
      (data) => {
        console.log(data);
        this.category = data;
        this.categoryForm.patchValue({
          ...this.category,
        });
        this.originalCategory = { ...this.category };
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getFormControl(controlName: string) {
    return this.categoryForm.get(controlName);
  }

  closePopUp() {
    this.dialogRef.close();
  }

  updateCategory() {
    const updatedCategoryData: IUpdateCategory = {};
    Object.keys(this.categoryForm.controls).forEach((key: string) => {
      const control = this.categoryForm.get(key);
      if (
        control &&
        control.dirty &&
        control.value !== this.originalCategory[key as keyof IUpdateCategory]
      ) {
        updatedCategoryData[key as keyof IUpdateCategory] = control.value;
      }
    });
    this.category = this.categoryForm.value;
    this.categoryRequestsService
      .updateCategoryDataRequest(updatedCategoryData, this.categoryId)
      .subscribe((data) => console.log(data));
    this.dialogRef.close();
  }
}
