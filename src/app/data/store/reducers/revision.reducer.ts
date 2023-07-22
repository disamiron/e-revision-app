import { createReducer, on } from '@ngrx/store';
import {
  getProductByBarcodeAction,
  getProductByBarcodeFailed,
  getProductByBarcodeSuccess,
  getShopListAction,
  getShopListFailed,
  getShopListSuccess,
  initCurrentShop,
  initCurrentShopFailed,
  moveToEditProduct,
  startRevisionFailed,
  startUploadRevisionFileAction,
  startUploadRevisionFileFailed,
  startUploadRevisionFileProgress,
  startUploadRevisionFileSuccess,
  stopRevisionFailed,
  updateCurrentShopSuccess,
} from '../actions/revision.actions';
import { IRevisionDataState } from '../models/revision.model';

const initialState: IRevisionDataState = {
  shopList: null,
  currentShop: null,
  currentProduct: null,
  error: null,
  isLoading: false,
  progressBar: null,
};

export const revisionDataReducer = createReducer(
  initialState,
  on(
    getShopListAction,
    getProductByBarcodeAction,
    (state: IRevisionDataState): IRevisionDataState => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    moveToEditProduct,
    getProductByBarcodeSuccess,
    (state: IRevisionDataState, action): IRevisionDataState => ({
      ...state,
      currentProduct: action.product,
      error: null,
      isLoading: false,
    })
  ),
  on(
    getShopListSuccess,
    (state: IRevisionDataState, action): IRevisionDataState => ({
      ...state,
      shopList: action.shopList,
      error: null,
    })
  ),
  on(
    startUploadRevisionFileAction,
    (state: IRevisionDataState): IRevisionDataState => ({
      ...state,
      progressBar: 0,
      error: null,
    })
  ),
  on(
    startUploadRevisionFileProgress,
    (state: IRevisionDataState, action): IRevisionDataState => ({
      ...state,
      progressBar: action.progress,
      error: null,
    })
  ),
  on(
    startUploadRevisionFileSuccess,
    (state: IRevisionDataState): IRevisionDataState => ({
      ...state,
      progressBar: null,
      error: null,
    })
  ),
  on(
    updateCurrentShopSuccess,
    initCurrentShop,
    (state: IRevisionDataState, action): IRevisionDataState => ({
      ...state,
      currentShop: action.shop,
    })
  ),
  on(
    getShopListFailed,
    getProductByBarcodeFailed,
    startUploadRevisionFileFailed,
    initCurrentShopFailed,
    startRevisionFailed,
    stopRevisionFailed,
    (state: IRevisionDataState, action): IRevisionDataState => ({
      ...state,
      error: action.error,
      progressBar: null,
      isLoading: false,
    })
  )
);
