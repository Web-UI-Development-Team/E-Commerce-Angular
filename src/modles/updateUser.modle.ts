export interface IUpdateUser {
  _id?: string;
  image?: string;
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  isAdmin?: boolean;
  isDeleted?: boolean;
  wishList?: string[];
}
