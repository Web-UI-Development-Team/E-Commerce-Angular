import { IProduct } from "./product.modle";

export interface ICart {
  product: IProduct,
  isInWishList: boolean,
  quantity: number
}

export interface IPostCart {
  productId: string,
  quantity: number
}
