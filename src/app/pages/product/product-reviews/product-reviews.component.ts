import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductReviewService } from '../../../services/reviews/product-review.service';
import { ActivatedRoute } from '@angular/router';
import { ReviewObj, Reviews } from '../../../../modles/review.modle';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-product-reviews',
  templateUrl: './product-reviews.component.html',
  styleUrl: './product-reviews.component.css'
})
export class ProductReviewsComponent implements OnInit , OnDestroy {
  reviewData: ReviewObj = { reviews: [] }; 
   newReview:Reviews  = {
    // ...this.reviewData,
    title: '',
    comment: '',
    user: '',
    product: ''
  }; 
  constructor(private productReviews: ProductReviewService, private activeRoute: ActivatedRoute) {}
  subscription$ : Subscription = new Subscription();
  ngOnInit(): void {
    const productId = this.activeRoute.snapshot.paramMap.get('id');
    if (productId !== null) {
       this.subscription$.add(this.productReviews.getreviewsById(productId).subscribe((data:any) => {
        this.reviewData = data;
        console.log(this.reviewData);
      }))
    } else {
      console.error('Product ID is null');
    }
  }
  //
  addNewReview(){
    console.log('hi');
    
    const productId = this.activeRoute.snapshot.paramMap.get('id');
  
    if(productId !== null) {
      this.productReviews.addNewReview(productId,this.newReview).subscribe((data:any)=>{
         this.reviewData.reviews.push(data);
      });
    }
  }



  ngOnDestroy(): void {
      this.subscription$.unsubscribe();
  }
}