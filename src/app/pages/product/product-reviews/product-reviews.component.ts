import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductReviewService } from '../../../services/reviews/product-review.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Review } from '../../../../modles/review.modle';

@Component({
  selector: 'app-product-reviews',
  templateUrl: './product-reviews.component.html',
  styleUrl: './product-reviews.component.css',
})
export class ProductReviewsComponent implements OnInit, OnDestroy {
  //icon
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  //icon
  //counter
  count = 0;
  countTwo = 0;
  //
  productId: any;
  reviews: Review[];

  reviewForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    comment: new FormControl('', [Validators.required]),
  });

  isReviewed = {
    isReviewed: false,
    reviewId: '',
  };

  constructor(
    private productReviewService: ProductReviewService,
    private activeRoute: ActivatedRoute
  ) {}

  subscription$: Subscription = new Subscription();

  ngOnInit(): void {
    const productId = this.activeRoute.snapshot.paramMap.get('id');
    if (productId !== null) {
      this.subscription$.add(
        this.productReviewService
          .getreviewsById(productId)
          .subscribe((data: any) => {
            this.reviews = data;
            console.log(this.reviews);
          })
      );

      this.productReviewService.isReviewd(productId).subscribe({
        next: (data) => (this.isReviewed = data),
        complete: () => console.log(this.isReviewed),
      });
    } else {
      console.error('Product ID is null');
    }
  }
  //**counter to icon like **//
  increaeCount() {
    this.count = this.count + 1;
    console.log(this.count);
  }
  //
  descreaseCount() {
    this.countTwo = this.count + 1;
    console.log(this.count);
  }
  //**counter to icon like **//
  //delete//
  onRemoveReview(productId: string) {
    this.productReviewService.removeDelete(productId).subscribe((data) => {
      this.reviews = this.reviews.filter((review) => review.product !== productId);

      this.isReviewed = {
        isReviewed: false,
        reviewId: '',
      };
    });
  }
  ///// add
  addNewReview() {
    const reviewData = {
      title: this.reviewForm.value.title!,
      comment: this.reviewForm.value.comment!,
    };

    const productId = this.activeRoute.snapshot.paramMap.get('id');

    if (productId !== null) {
      this.productReviewService
        .addNewReview(productId, reviewData)
        .subscribe((data: any) => {
          this.reviews.push(data);

          this.isReviewed = {
            isReviewed: true,
            reviewId: '',
          };
        });
    }
  }

  //******/
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
