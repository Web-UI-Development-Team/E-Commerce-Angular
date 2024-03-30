import { Component, OnInit } from '@angular/core';
import { ProductReviewService } from '../../../services/reviews/product-review.service';
import { Reviews } from '../../../../modles/review.modle';

@Component({
  selector: 'app-product-reviews',
  templateUrl: './product-reviews.component.html',
  styleUrl: './product-reviews.component.css',
})
export class ProductReviewsComponent implements OnInit {
  reviews: Reviews[];
  productId: any;

  constructor(private productReviews: ProductReviewService) {}

  ngOnInit(): void {
    this.productReviews.getAllreviews(this.productId).subscribe((data) => {
      this.reviews = data;
      console.log(data);
    });
  }

  onClick() {
    this.productReviews.getAllreviews(this.productId).subscribe((data) => {
      this.reviews = data;
      console.log(data);
    });
  }
}
