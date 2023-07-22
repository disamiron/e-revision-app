import { createAction, props } from '@ngrx/store';
import { ReducerSections, ReducerStatuses } from '../models/reducer';
import { IError, IShop } from 'src/app/shared/interfaces';
import { ShopActions } from '../models/shop.model';

export const getShopListAction = createAction(
  `${ReducerSections.REVISION} ${ShopActions.GetShopList}`
);

export const getShopListSuccess = createAction(
  `${ReducerSections.REVISION} ${ShopActions.GetShopList} ${ReducerStatuses.SUCCESS}`,
  props<{ shopList: IShop[] }>()
);

export const getShopListFailed = createAction(
  `${ReducerSections.REVISION} ${ShopActions.GetShopList} ${ReducerStatuses.FAILED}`,
  props<{ error: IError }>()
);

export const getShopByShopIdAction = createAction(
  `${ReducerSections.REVISION} ${ShopActions.GetShopByShopId}`,
  props<{ shopId: string }>()
);

export const getShopByShopIdSuccess = createAction(
  `${ReducerSections.REVISION} ${ShopActions.GetShopByShopId} ${ReducerStatuses.SUCCESS}`,
  props<{ shop: IShop }>()
);

export const getShopByShopIdFailed = createAction(
  `${ReducerSections.REVISION} ${ShopActions.GetShopByShopId} ${ReducerStatuses.FAILED}`,
  props<{ error: IError }>()
);

export const updateCurrentShopAction = createAction(
  `${ReducerSections.REVISION} ${ShopActions.UpdateCurrentShop}`,
  props<{ shopId: string }>()
);

export const updateCurrentShopSuccess = createAction(
  `${ReducerSections.REVISION} ${ShopActions.UpdateCurrentShop} ${ReducerStatuses.SUCCESS}`,
  props<{ shop: IShop }>()
);

export const updateCurrentShopFailed = createAction(
  `${ReducerSections.REVISION} ${ShopActions.UpdateCurrentShop} ${ReducerStatuses.FAILED}`,
  props<{ error: IError }>()
);
