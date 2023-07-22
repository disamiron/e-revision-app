import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../../environments/environment';
import { IUserDataState, USER_DATA_KEY } from '../models/user.model';
import { userDataReducer } from './user.reducer';
import {
  ILocationDataState,
  LOCATION_DATA_KEY,
} from '../models/location.model';
import { locationDataReducer } from './location.reducer';
import { IShopDataState, SHOP_DATA_KEY } from '../models/shop.model';
import { shopDataReducer } from './shop.reducer';

export interface State {
  [USER_DATA_KEY]: IUserDataState;
  [LOCATION_DATA_KEY]: ILocationDataState;
  [SHOP_DATA_KEY]: IShopDataState;
}

export const reducers: ActionReducerMap<State> = {
  [USER_DATA_KEY]: userDataReducer,
  [LOCATION_DATA_KEY]: locationDataReducer,
  [SHOP_DATA_KEY]: shopDataReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
