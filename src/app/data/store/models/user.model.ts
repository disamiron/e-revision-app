import { IError, IUser } from 'src/app/shared/interfaces';

export const USER_DATA_KEY = 'userData';

export interface IUserDataState {
  user: IUser | null;
  error: IError | null;
  isLoading: boolean;
}

export enum UserActions {
  Login = 'Login',
  Logout = 'Logout',
}
