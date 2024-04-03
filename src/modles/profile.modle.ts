import { IProduct } from "./product.modle";

export interface IProfile {
  name: string,
  email: string,
  phone: string,
  imagePath: string,
  wishList: IProduct[]
}

export interface IEditProfile {
  name?: string,
  email?: string,
  password?: string,
  confirmPassword?: string,
  phone?: string,
  imagePath?: string,
}

export interface IWishlist {
  wishList: IProduct[];
}
