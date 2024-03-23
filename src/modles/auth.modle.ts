export interface IRegister {
  // token: string,
  // message: string
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  phone: number;
}

export interface ILogin {
  email: string,
  password: string
}

export interface IAuth {
  token: string,
  message: string
}
