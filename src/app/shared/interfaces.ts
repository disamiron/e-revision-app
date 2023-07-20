import { Roles } from './enums';

export interface IUser {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  userId: string;
  username: string;
  userPhone: string;
  roles: Roles[];
}

export interface ILoginData {
  phoneNumber: string;
  password: string;
}

export interface IError {
  applicationErrorCode: string;
  message: string;
}
