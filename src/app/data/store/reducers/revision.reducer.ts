import { createReducer, on } from '@ngrx/store';
import {
  getProductByBarcodeAction,
  getProductByBarcodeFailed,
  getProductByBarcodeSuccess,
  getProductListByByLocalIdAction,
  getProductListByByLocalIdFailed,
  getProductListByByLocalIdSuccess,
  goToEditingProduct,
  startRevisionFailed,
  startUploadRevisionFileAction,
  startUploadRevisionFileFailed,
  startUploadRevisionFileProgress,
  startUploadRevisionFileSuccess,
  stopRevisionFailed,
} from '../actions/revision.actions';
import { IRevisionDataState } from '../models/revision.model';

const initialState: IRevisionDataState = {
  currentProduct: null,
  productsSearchList: null,
  error: null,
  isLoading: false,
  progressBar: null,
};

export const revisionDataReducer = createReducer(
  initialState,
  on(
    getProductByBarcodeAction,
    getProductListByByLocalIdAction,
    (state: IRevisionDataState): IRevisionDataState => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    startUploadRevisionFileAction,
    (state: IRevisionDataState): IRevisionDataState => ({
      ...state,
      progressBar: 0,
      isLoading: true,
      error: null,
    })
  ),
  on(
    goToEditingProduct,
    getProductByBarcodeSuccess,
    (state: IRevisionDataState, action): IRevisionDataState => ({
      ...state,
      currentProduct: action.product,
      error: null,
      isLoading: false,
    })
  ),
  on(
    getProductListByByLocalIdSuccess,
    (state: IRevisionDataState, action): IRevisionDataState => ({
      ...state,
      productsSearchList: action.productList,
      error: null,
      isLoading: false,
    })
  ),
  on(
    startUploadRevisionFileProgress,
    (state: IRevisionDataState, action): IRevisionDataState => ({
      ...state,
      isLoading: true,
      progressBar: action.progress,
      error: null,
    })
  ),
  on(
    startUploadRevisionFileSuccess,
    (state: IRevisionDataState): IRevisionDataState => ({
      ...state,
      isLoading: false,
      progressBar: null,
      error: null,
    })
  ),
  on(
    getProductByBarcodeFailed,
    getProductListByByLocalIdFailed,
    startUploadRevisionFileFailed,
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
