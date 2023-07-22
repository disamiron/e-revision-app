import { createReducer, on } from '@ngrx/store';
import {
  getProductByBarcodeAction,
  getProductByBarcodeFailed,
  getProductByBarcodeSuccess,
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
  error: null,
  isLoading: false,
  progressBar: null,
};

export const revisionDataReducer = createReducer(
  initialState,
  on(
    getProductByBarcodeAction,
    (state: IRevisionDataState): IRevisionDataState => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getProductByBarcodeSuccess,
    (state: IRevisionDataState, action): IRevisionDataState => ({
      ...state,
      currentProduct: action.product,
      error: null,
      isLoading: false,
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
