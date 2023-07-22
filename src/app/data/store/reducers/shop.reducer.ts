import { createReducer, on } from '@ngrx/store';
import {
  getShopByShopIdAction,
  getShopByShopIdFailed,
  getShopByShopIdSuccess,
  getShopListAction,
  getShopListFailed,
  getShopListSuccess,
} from '../actions/shop.actions';
import { IShopDataState } from '../models/shop.model';

const initialState: IShopDataState = {
  shopList: null,
  currentShop: null,
  error: null,
  isLoading: false,
};

export const shopDataReducer = createReducer(
  initialState,
  on(
    getShopListAction,
    getShopByShopIdAction,
    (state: IShopDataState): IShopDataState => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getShopListSuccess,
    (state: IShopDataState, action): IShopDataState => ({
      ...state,
      shopList: action.shopList,
      error: null,
    })
  ),
  on(
    getShopByShopIdSuccess,
    (state: IShopDataState, action): IShopDataState => ({
      ...state,
      currentShop: action.shop,
    })
  ),
  on(
    getShopListFailed,
    getShopByShopIdFailed,
    (state: IShopDataState, action): IShopDataState => ({
      ...state,
      error: action.error,
      isLoading: false,
    })
  )
);
