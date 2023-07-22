import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { navigateToPrevLocation } from '../actions/location.actions';
import { UtilitiesService } from 'src/app/shared/services/utilities/utilities.service';

@Injectable()
export class LocationEffects {
  constructor(
    private _actions$: Actions,
    private _utilites: UtilitiesService
  ) {}

  public navigateToPrevLocation$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(navigateToPrevLocation),
        tap((action) => {
          this._utilites.navigateByUrl(action.prevLocaction);
        })
      );
    },
    { dispatch: false }
  );
}
