import { createAction, props } from '@ngrx/store';
import { ReducerSections, ReducerStatuses } from '../models/reducer';
import { PlatformActions } from '../models/platform.model';

export const setCurrentPlatformData = createAction(
  `${ReducerSections.PLATFORM} ${PlatformActions.SetCurrentPlatformData} ${ReducerStatuses.SUCCESS}`,
  props<{ platform: string }>()
);

export const setCurrentPlatformDataError = createAction(
  `${ReducerSections.PLATFORM} ${PlatformActions.SetCurrentPlatformData} ${ReducerStatuses.FAILED}`,
  props<{ error: string }>()
);
