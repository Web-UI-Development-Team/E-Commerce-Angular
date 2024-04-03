import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductReviewService } from '../../../services/reviews/product-review.service';
import { ActivatedRoute } from '@angular/router';
import { ReviewObj, Reviews } from '../../../../modles/review.modle';
import { Subscription } from 'rxjs';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-reviews',
  templateUrl: './product-reviews.component.html',
  styleUrl: './product-reviews.component.css',
})

export class ProductReviewsComponent implements OnInit , OnDestroy {
  //icon
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  //icon
  //counter
  count = 0;
  countTwo = 0;
  //
  productId :any
  reviewData: ReviewObj = { reviews: [] }; 
   newReview:Reviews  = {
    // ...this.reviewData,
    _id:'',
    title: '',
    comment: '',
    dateOfReview : new Date(),
    user: {
      name : ''
    },
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

  //**counter to icon like **//
  increaeCount(){
    this.count = this.count +1;
    console.log(this.count);
  }
  //
  descreaseCount(){
    this.countTwo = this.count +1;
    console.log(this.count);
  }
    //**counter to icon like **//
  //delete//
  onRemoveReview(productId: string){
    this.productReviews.removeDelete(productId).subscribe(data=>{
      console.log(data);
      
      this.reviewData.reviews.filter(review=> review._id !== productId);
    })
  }
  ///// add
  addNewReview(){
    console.log('hi');
    
    const productId = this.activeRoute.snapshot.paramMap.get('id');
  
    if(productId !== null) {
      this.productReviews.addNewReview(productId,this.newReview).subscribe((data:any)=>{
         this.reviewData.reviews.push(data);
         
      });
    }
  }



  //******/
  ngOnDestroy(): void {
      this.subscription$.unsubscribe();
  }
}