import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { RevisionService } from 'src/app/shared/services/revision/revision.service';
import {
  getShopByShopIdAction,
  getShopByShopIdFailed,
  getShopByShopIdSuccess,
  getShopListAction,
  getShopListFailed,
  getShopListSuccess,
} from '../actions/shop.actions';
import { IShop, IShopArray } from 'src/app/shared/interfaces';
import {
  startRevisionSuccess,
  startUploadRevisionFileSuccess,
  stopRevisionSuccess,
} from '../actions/revision.actions';
import { Store } from '@ngrx/store';
import { selectCurrentShopId } from '../selectors/shop.selectors';

@Injectable()
export class ShopEffects {
  constructor(
    private _actions$: Actions,
    private _revisionService: RevisionService,
    private _store: Store
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

  public getShopByShopId$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(getShopByShopIdAction),
      switchMap(({ shopId }) => {
        return this._revisionService.getShopById(shopId).pipe(
          map((shop: IShop) => {
            return getShopByShopIdSuccess({ shop: shop });
          }),
          catchError((error) => {
            return of(getShopByShopIdFailed({ error }));
          })
        );
      })
    );
  });

  updateCurrentShopAction$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(
        startRevisionSuccess,
        stopRevisionSuccess,
        startUploadRevisionFileSuccess
      ),
      switchMap(() => this._store.select(selectCurrentShopId)),
      switchMap((shopId) => {
        return this._revisionService.getShopById(shopId!).pipe(
          map((shop) => {
            return getShopByShopIdSuccess({ shop: shop });
          }),
          catchError((error) => {
            return of(getShopByShopIdFailed({ error }));
          })
        );
      })
    );
  });
}
