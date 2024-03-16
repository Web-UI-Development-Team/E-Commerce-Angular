export interface Order  
    {
        orderItems:[{ 
            product: string,
            quantity : number
        }], 
        status : string,
        totalPrice : number,
        dateOfOrder : Date,
}
    

