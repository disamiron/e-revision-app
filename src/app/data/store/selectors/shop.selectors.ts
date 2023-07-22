import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IShopDataState, SHOP_DATA_KEY } from '../models/shop.model';

export const selectFeature =
  createFeatureSelector<IShopDataState>(SHOP_DATA_KEY);

export const selectShopList = createSelector(
  selectFeature,
  (state: IShopDataState) => state.shopList
);

export const selectShopError = createSelector(
  selectFeature,
  (state: IShopDataState) => state.error
);

export const selectShopIsLoading = createSelector(
  selectFeature,
  (state: IShopDataState) => state.isLoading
);

export const selectShopFileProgress = createSelector(
  selectFeature,
  (state: IShopDataState) => state.progressBar
);

export const selectCurrentShop = createSelector(
  selectFeature,
  (state: IShopDataState) => state.currentShop
);

export const selectCurrentShopId = createSelector(
  selectFeature,
  (state: IShopDataState) => state.currentShop?.shopId
);
