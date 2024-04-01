import { Component, OnInit } from '@angular/core';
import { ProductReviewService } from '../../../services/reviews/product-review.service';
import { ActivatedRoute } from '@angular/router';
import { ReviewObj } from '../../../../modles/review.modle';
@Component({
  selector: 'app-product-reviews',
  templateUrl: './product-reviews.component.html',
  styleUrl: './product-reviews.component.css'
})
export class ProductReviewsComponent implements OnInit {
  reviewData: ReviewObj = { reviews: [] }; 

  constructor(private productReviews: ProductReviewService, private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    const productId = this.activeRoute.snapshot.paramMap.get('id');
    if (productId !== null) {
      this.productReviews.getreviewsById(productId).subscribe((data:any) => {
        this.reviewData = data;
        console.log(this.reviewData);
      });
    } else {
      console.error('Product ID is null');
    }
  }
}