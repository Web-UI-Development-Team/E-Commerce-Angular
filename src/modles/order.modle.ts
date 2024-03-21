export interface Order  
    {
        orderItems:[{ 
            title: string,
            price : number
            quantity : number
        }], 
        status : string,
        totalPrice : number,
        dateOfOrder : Date,
}
    


