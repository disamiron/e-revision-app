import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  ILocationDataState,
  LOCATION_DATA_KEY,
} from '../models/location.model';

export const selectFeature =
  createFeatureSelector<ILocationDataState>(LOCATION_DATA_KEY);

export const selectPrevLocaction = createSelector(
  selectFeature,
  (state: ILocationDataState) => state.prevLocaction
);
