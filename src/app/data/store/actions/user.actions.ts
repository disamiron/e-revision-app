import { createAction, props } from '@ngrx/store';
import { ReducerSections, ReducerStatuses } from '../models/reducer';
import { UserActions } from '../models/user.model';
import { IError, ILoginData, IUser } from 'src/app/shared/interfaces';

export const loginAction = createAction(
  `${ReducerSections.USERS} ${UserActions.Login}`,
  props<{ data: ILoginData }>()
);

export const loginSuccess = createAction(
  `${ReducerSections.USERS}  ${UserActions.Login} ${ReducerStatuses.SUCCESS}`,
  props<{ user: IUser }>()
);

export const loginFailed = createAction(
  `${ReducerSections.USERS} ${UserActions.Login} ${ReducerStatuses.FAILED}`,
  props<{ error: IError }>()
);

export const logoutAction = createAction(
  `${ReducerSections.USERS} ${UserActions.Logout}`
);

export const logoutActionSuccess = createAction(
  `${ReducerSections.USERS} ${UserActions.Logout} ${ReducerStatuses.SUCCESS}`
);

export const logoutActionFailed = createAction(
  `${ReducerSections.USERS} ${UserActions.Logout} ${ReducerStatuses.FAILED}`,
  props<{ error: IError }>()
);
