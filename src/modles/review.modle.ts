export interface ReviewObj {
  
    reviews: Reviews[];
  }
  
  export interface Reviews {
    title: string;
    comment: string;
    dateOfReview : Date;
    user: string;
    product: string;
  }
  