import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../../environments/environment';
import { IUserDataState, USER_DATA_KEY } from '../models/user.model';
import { userDataReducer } from './user.reducer';
import {
  ILocationDataState,
  LOCATION_DATA_KEY,
} from '../models/location.model';
import { locationDataReducer } from './location.reducer';

export interface State {
  [USER_DATA_KEY]: IUserDataState;
  [LOCATION_DATA_KEY]: ILocationDataState;
}

export const reducers: ActionReducerMap<State> = {
  [USER_DATA_KEY]: userDataReducer,
  [LOCATION_DATA_KEY]: locationDataReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
