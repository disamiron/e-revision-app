import { createAction, props } from '@ngrx/store';
import { ReducerSections, ReducerStatuses } from '../models/reducer';
import { LocationActions } from '../models/location.model';

export const setPrevLocationData = createAction(
  `${ReducerSections.LOCATION} ${LocationActions.SetPrevLocationData} ${ReducerStatuses.SUCCESS}`,
  props<{ prevLocaction: string }>()
);

export const setPrevLocationDataError = createAction(
  `${ReducerSections.LOCATION} ${LocationActions.SetPrevLocationData} ${ReducerStatuses.FAILED}`,
  props<{ error: string }>()
);

export const navigateToPrevLocation = createAction(
  `${ReducerSections.LOCATION} ${LocationActions.NavigateToPrevLocation}`,
  props<{ prevLocaction: string }>()
);
