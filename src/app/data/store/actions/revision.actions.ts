import { createAction, props } from '@ngrx/store';
import { ReducerSections, ReducerStatuses } from '../models/reducer';
import { IError, IProduct, IShop } from 'src/app/shared/interfaces';
import { RevisionActions } from '../models/revision.model';

//SHOP SECTION

export const getShopListAction = createAction(
  `${ReducerSections.REVISION} ${RevisionActions.GetShopList}`
);

export const getShopListSuccess = createAction(
  `${ReducerSections.REVISION} ${RevisionActions.GetShopList} ${ReducerStatuses.SUCCESS}`,
  props<{ shopList: IShop[] }>()
);

export const getShopListFailed = createAction(
  `${ReducerSections.REVISION} ${RevisionActions.GetShopList} ${ReducerStatuses.FAILED}`,
  props<{ error: IError }>()
);

export const initCurrentShop = createAction(
  `${ReducerSections.REVISION} ${RevisionActions.InitCurrentShop}`,
  props<{ shop: IShop | null }>()
);

export const initCurrentShopSuccess = createAction(
  `${ReducerSections.REVISION} ${RevisionActions.InitCurrentShop} ${ReducerStatuses.SUCCESS}`
);

export const initCurrentShopFailed = createAction(
  `${ReducerSections.REVISION} ${RevisionActions.InitCurrentShop} ${ReducerStatuses.FAILED}`,
  props<{ error: IError }>()
);

export const updateCurrentShopAction = createAction(
  `${ReducerSections.REVISION} ${RevisionActions.UpdateCurrentShop}`,
  props<{ shopId: string }>()
);

export const updateCurrentShopSuccess = createAction(
  `${ReducerSections.REVISION} ${RevisionActions.UpdateCurrentShop} ${ReducerStatuses.SUCCESS}`,
  props<{ shop: IShop }>()
);

export const updateCurrentShopFailed = createAction(
  `${ReducerSections.REVISION} ${RevisionActions.UpdateCurrentShop} ${ReducerStatuses.FAILED}`,
  props<{ error: IError }>()
);

//PRODUCT SECTION

export const getProductByBarcodeAction = createAction(
  `${ReducerSections.REVISION} ${RevisionActions.GetProductByBarcode}`,
  props<{ shopId: string; barcode: string; isShopSearch: boolean }>()
);

export const getProductByBarcodeSuccess = createAction(
  `${ReducerSections.REVISION} ${RevisionActions.GetProductByBarcode} ${ReducerStatuses.SUCCESS}`,
  props<{ shopId: string; product: IProduct; isShopSearch: boolean }>()
);

export const getProductByBarcodeFailed = createAction(
  `${ReducerSections.REVISION} ${RevisionActions.GetProductByBarcode} ${ReducerStatuses.FAILED}`,
  props<{ error: IError }>()
);

export const moveToEditProduct = createAction(
  `${ReducerSections.REVISION} ${RevisionActions.MoveToEditProduct}`,
  props<{ product: IProduct; shopId: string }>()
);

//REVISION SECTION

export const startRevisionAction = createAction(
  `${ReducerSections.REVISION} ${RevisionActions.StartRevision}`,
  props<{ shopId: string }>()
);

export const startRevisionSuccess = createAction(
  `${ReducerSections.REVISION} ${RevisionActions.StartRevision} ${ReducerStatuses.SUCCESS}`
);

export const startRevisionFailed = createAction(
  `${ReducerSections.REVISION} ${RevisionActions.StartRevision} ${ReducerStatuses.FAILED}`,
  props<{ error: IError }>()
);

export const stopRevisionAction = createAction(
  `${ReducerSections.REVISION} ${RevisionActions.StopRevision}`,
  props<{ shopId: string }>()
);

export const stopRevisionSuccess = createAction(
  `${ReducerSections.REVISION} ${RevisionActions.StopRevision} ${ReducerStatuses.SUCCESS}`
);

export const stopRevisionFailed = createAction(
  `${ReducerSections.REVISION} ${RevisionActions.StopRevision} ${ReducerStatuses.FAILED}`,
  props<{ error: IError }>()
);

export const startUploadRevisionFileAction = createAction(
  `${ReducerSections.REVISION} ${RevisionActions.UploadRevisionFile}`,
  props<{ shopId: string; file: File; isShipping: boolean }>()
);

export const startUploadRevisionFileProgress = createAction(
  `${ReducerSections.REVISION} ${RevisionActions.UploadRevisionFile} ${ReducerStatuses.LOADING}`,
  props<{ progress: number }>()
);

export const startUploadRevisionFileSuccess = createAction(
  `${ReducerSections.REVISION} ${RevisionActions.UploadRevisionFile} ${ReducerStatuses.SUCCESS}`
);

export const startUploadRevisionFileFailed = createAction(
  `${ReducerSections.REVISION} ${RevisionActions.UploadRevisionFile} ${ReducerStatuses.FAILED}`,
  props<{ error: IError }>()
);
