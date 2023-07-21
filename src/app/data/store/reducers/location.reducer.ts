import { createReducer, on } from '@ngrx/store';
import { ILocationDataState } from '../models/location.model';
import { setPrevLocationData, setPrevLocationDataError } from '../actions/location.actions';

const initialState: ILocationDataState = {
  prevLocaction: null,
  error: null,
};

export const locationDataReducer = createReducer(
  initialState,
  on(
    setPrevLocationData,
    (state: any, action): ILocationDataState => ({
      ...state,
      prevLocaction: action.prevLocaction,
    })
  ),
  on(
    setPrevLocationDataError,
    (state: any, action): ILocationDataState => ({
      ...state,
      error: action.error,
    })
  )
);
