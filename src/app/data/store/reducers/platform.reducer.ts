import { createReducer, on } from '@ngrx/store';
import {
  setCurrentPlatformData,
  setCurrentPlatformDataError,
} from '../actions/platform.actions';
import { IPlatformDataState } from '../models/platform.model';

const initialState: IPlatformDataState = {
  error: null,
  platform: null,
};

export const platformDataReducer = createReducer(
  initialState,
  on(
    setCurrentPlatformData,
    (state: any, action): IPlatformDataState => ({
      ...state,
      platform: action.platform,
    })
  ),
  on(
    setCurrentPlatformDataError,
    (state: any, action): IPlatformDataState => ({
      ...state,
      error: action.error,
    })
  )
);
