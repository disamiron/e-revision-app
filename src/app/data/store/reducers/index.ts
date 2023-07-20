import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../../environments/environment';
import { IUserDataState, USER_DATA_KEY } from '../models/user.model';
import { userDataReducer } from './user.reducer';

export interface State {
  [USER_DATA_KEY]: IUserDataState;
}

export const reducers: ActionReducerMap<State> = {
  [USER_DATA_KEY]: userDataReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
