import { IError, IProduct, IShop } from 'src/app/shared/interfaces';

export const REVISION_DATA_KEY = 'revisionData';

export interface IRevisionDataState {
  shopList: IShop[] | null;
  currentShop: IShop | null;
  currentProduct: IProduct | null;
  error: IError | null;
  isLoading: boolean;
  progressBar: number | null;
}

export enum RevisionActions {
  GetShopList = 'GetShopList',
  GetProductByBarcode = 'GetProductByBarcode',
  StopRevision = 'StopRevision',
  MoveToEditProduct = 'MoveToEditProduct',
  UploadRevisionFile = 'UploadRevisionFile',
  InitCurrentShop = 'InitCurrentShop',
  StartRevision = 'StartRevision',
  UpdateCurrentShop = 'UpdateCurrentShop',
}
