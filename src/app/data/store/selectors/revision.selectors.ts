import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  IRevisionDataState,
  REVISION_DATA_KEY,
} from '../models/revision.model';

export const selectFeature =
  createFeatureSelector<IRevisionDataState>(REVISION_DATA_KEY);

export const selectRevisionCurrentProduct = createSelector(
  selectFeature,
  (state: IRevisionDataState) => state.currentProduct
);

export const selectRevisionProductsSearchList = createSelector(
  selectFeature,
  (state: IRevisionDataState) => state.productsSearchList
);

export const selectRevisionError = createSelector(
  selectFeature,
  (state: IRevisionDataState) => state.error
);

export const selectRevisionIsLoading = createSelector(
  selectFeature,
  (state: IRevisionDataState) => state.isLoading
);

export const selectRevisionFileProgress = createSelector(
  selectFeature,
  (state: IRevisionDataState) => state.progressBar
);
