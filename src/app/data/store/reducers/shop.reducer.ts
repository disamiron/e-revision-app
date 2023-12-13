import { createReducer, on } from '@ngrx/store';
import {
  getProductListFromAllShopByByLocalIdAction,
  getProductListFromAllShopByByLocalIdFailed,
  getProductListFromAllShopByByLocalIdSuccess,
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
  productsSearchList: null,
  currentShop: null,
  error: null,
  isLoading: false,
};

export const shopDataReducer = createReducer(
  initialState,
  on(
    getShopListAction,
    getShopByShopIdAction,
    getProductListFromAllShopByByLocalIdAction,
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
      isLoading: false,
      error: null,
    })
  ),
  on(
    getShopByShopIdSuccess,
    (state: IShopDataState, action): IShopDataState => ({
      ...state,
      isLoading: false,
      currentShop: action.shop,
    })
  ),
  on(
    getProductListFromAllShopByByLocalIdSuccess,
    (state: IShopDataState, action): IShopDataState => ({
      ...state,
      productsSearchList: action.productList,
      isLoading: false,
    })
  ),
  on(
    getShopListFailed,
    getShopByShopIdFailed,
    getProductListFromAllShopByByLocalIdFailed,
    (state: IShopDataState, action): IShopDataState => ({
      ...state,
      error: action.error,
      isLoading: false,
    })
  )
);
