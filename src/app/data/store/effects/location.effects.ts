import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { navigateToPrevLocation } from '../actions/location.actions';

@Injectable()
export class LocationEffects {
  constructor(private _actions$: Actions, private _router: Router) {}

  navigateToPrevLocation$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(navigateToPrevLocation),
        tap((action) => {
          this._router.navigateByUrl(action.prevLocaction);
        })
      );
    },
    { dispatch: false }
  );
}
