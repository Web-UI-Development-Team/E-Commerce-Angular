export interface ReviewObj {
  
    reviews: Reviews[];
  }
  
  export interface Reviews {
    _id: string;
    title: string;
    comment: string;
    dateOfReview : Date;
    user: {
      name : string
    };
    product: string;
  }
  