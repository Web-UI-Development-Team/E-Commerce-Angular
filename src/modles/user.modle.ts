export interface IUser {
  _id: string,
  name: string,
  email: string,
  phone: string,
  image: string,
  wishList: string []
}
export interface IUpdatedUser {
  name?: string,
  email?: string,
  phone?: string,
  image?: string,
}

