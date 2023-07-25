import { createReducer, on } from '@ngrx/store';
import {
  loginAction,
  loginFailed,
  loginSuccess,
  logoutAction,
  logoutActionFailed,
  logoutActionSuccess,
} from '../actions/user.actions';
import { IUserDataState } from '../models/user.model';

const initialState: IUserDataState = {
  user: null,
  error: null,
  isLoading: false,
};

export const userDataReducer = createReducer(
  initialState,
  on(
    loginAction,
    logoutAction,
    (state: IUserDataState): IUserDataState => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    loginSuccess,
    (state: IUserDataState, action): IUserDataState => ({
      ...state,
      user: action.user,
      error: null,
      isLoading: false,
    })
  ),
  on(
    logoutActionSuccess,
    (): IUserDataState => ({
      ...initialState,
    })
  ),
  on(
    loginFailed,
    logoutActionFailed,
    (state: IUserDataState, action): IUserDataState => ({
      ...state,
      error: action.error,
      isLoading: false,
    })
  )
);
