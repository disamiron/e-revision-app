import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { RevisionService } from 'src/app/shared/services/revision/revision.service';
import {
  getShopListAction,
  getShopListFailed,
  getShopListSuccess,
} from '../actions/revision.actions';
import { IShopArray } from 'src/app/shared/interfaces';

@Injectable()
export class RevisionEffects {
  constructor(
    private _actions$: Actions,
    private _revisionService: RevisionService
  ) {}

  public getShopList$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(getShopListAction),
      switchMap(() => {
        return this._revisionService.getAllShop().pipe(
          map((shopArray: IShopArray) => {
            return getShopListSuccess({ shopList: shopArray.content });
          }),
          catchError((error) => {
            return of(getShopListFailed({ error }));
          })
        );
      })
    );
  });
}
