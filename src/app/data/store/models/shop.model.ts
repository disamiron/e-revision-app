import { IError, IShop } from 'src/app/shared/interfaces';

export const SHOP_DATA_KEY = 'shopData';

export interface IShopDataState {
  shopList: IShop[] | null;
  currentShop: IShop | null;
  error: IError | null;
  isLoading: boolean;
}

export enum ShopActions {
  GetShopList = 'GetShopList',
  GetShopByShopId = 'GetShopByShopId',
  InitCurrentShop = 'InitCurrentShop',
  UpdateCurrentShop = 'UpdateCurrentShop',
}
