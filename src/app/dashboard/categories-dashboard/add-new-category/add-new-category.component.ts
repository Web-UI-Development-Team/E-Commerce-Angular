import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CategoryRequestsService } from '../../../services/category/category-requests.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ICategory } from '../../../../modles/category';

@Component({
  selector: 'app-add-new-category',
  templateUrl: './add-new-category.component.html',
  styleUrl: './add-new-category.component.css',
})
export class AddNewCategoryComponent {
  constructor(
    private formBuilder: FormBuilder,
    private categoryRequestsService: CategoryRequestsService,
    public dialogRef: MatDialogRef<AddNewCategoryComponent>
  ) {}

  categoryForm: FormGroup = this.formBuilder.group({
    nameCategory: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(2500),
    ]),
    icon: new FormControl<String>(
      'https://cdn1.iconfinder.com/data/icons/family-68/512/grocery-shopping-bag-store-groceries-512.png',
      [Validators.required]
    ),
  });

  initialFormValues = {
    nameCategory: '',
    description: '',
    icon: 'https://cdn1.iconfinder.com/data/icons/family-68/512/grocery-shopping-bag-store-groceries-512.png',
  };

  getFormControl(controlName: string) {
    return this.categoryForm.get(controlName);
  }

  closePopup() {
    this.dialogRef.close();
  }

  addNewCategory() {
    if (this.categoryForm.valid) {
      console.log(this.categoryForm.value);
      this.categoryRequestsService
        .addNewCategoryUpdate(this.categoryForm.value)
        .subscribe(
          (category: ICategory) => {
            console.log(category);
          },
          (error) => {
            console.log(error);
          }
        );
      this.dialogRef.close();
    } else {
      console.log(this.categoryForm.value);
      console.log('invalid');
    }
  }
}
