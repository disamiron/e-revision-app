import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IUserDataState, USER_DATA_KEY } from '../models/user.model';
import { Roles } from 'src/app/shared/enums';

export const selectFeature =
  createFeatureSelector<IUserDataState>(USER_DATA_KEY);

export const selectCurrentUser = createSelector(
  selectFeature,
  (state: IUserDataState) => state.user
);

export const selectUserAuthError = createSelector(
  selectFeature,
  (state: IUserDataState) => state.error
);

export const selectUserIsLoading = createSelector(
  selectFeature,
  (state: IUserDataState) => state.isLoading
);

export const selectCurrentUserWithoutRights = createSelector(
  selectFeature,
  (state: IUserDataState) => state.user?.roles.includes(Roles.user)
);
