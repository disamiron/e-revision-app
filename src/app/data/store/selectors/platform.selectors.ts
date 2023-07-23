import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  IPlatformDataState,
  PLATFORM_DATA_KEY,
} from '../models/platform.model';

export const selectFeature =
  createFeatureSelector<IPlatformDataState>(PLATFORM_DATA_KEY);

export const selectCurrentPlatform = createSelector(
  selectFeature,
  (state: IPlatformDataState) => state.platform
);
