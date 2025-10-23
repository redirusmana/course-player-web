export interface IUser {
  user_id: number;
  name: string;
  email: string;
  phone: string;
  city: string;
  bank_name: string;
  account_number: string;
}

export interface ILoginResponse {
  status: number;
  message: string;
  data: IUser;
}
