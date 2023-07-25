import { Injectable } from '@angular/core';
import {
  loginAction,
  loginSuccess,
  loginFailed,
  logoutAction,
  logoutActionSuccess,
  logoutActionFailed,
} from '../actions/user.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { urlValues } from 'src/app/shared/constants';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { RevisionService } from 'src/app/shared/services/revision/revision.service';
import { StorageType } from 'src/app/shared/services/storage/storage.type';
import { UtilitiesService } from 'src/app/shared/services/utilities/utilities.service';

@Injectable()
export class UserEffects {
  constructor(
    private _actions$: Actions,
    private _storageService: StorageService,
    private _revisionService: RevisionService,
    private _utilities: UtilitiesService
  ) {}

  public login$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(loginAction),
      switchMap((action) => {
        return this._revisionService.login({ ...action.data }).pipe(
          map((user) => {
            return loginSuccess({ user });
          }),
          catchError((error) => {
            return of(loginFailed({ error }));
          })
        );
      })
    );
  });

  public loginSuccess$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(loginSuccess),
        tap((action) => {
          this._storageService.setItem(StorageType.User, action.user);
          this._storageService.setItem(StorageType.Notification, {
            manualEntryOnly: true,
          });

          if (!action.isAppInit) {
            this._utilities.navigateByUrl(urlValues.dashboard);
            this._utilities.snackBarMessage('Добро пожаловать');
          }

          let favoriteShopId: { shopId?: string } =
            this._storageService.getItem(StorageType.FavoriteShopId);

          if (action.isAppInit && favoriteShopId?.shopId) {
            this._utilities.navigateByUrl(
              urlValues.dashboard +
                '/' +
                urlValues.shop +
                '/' +
                favoriteShopId?.shopId
            );
          }
        })
      );
    },
    { dispatch: false }
  );

  public loginFailed$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(loginFailed),
        tap(() => {
          this._utilities.snackBarMessage('Неверный логин или пароль');
        })
      );
    },
    { dispatch: false }
  );

  public logout$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(logoutAction),
      switchMap(() => {
        return this._revisionService.logout().pipe(
          map(() => {
            return logoutActionSuccess();
          }),
          catchError((error) => {
            return of(logoutActionFailed({ error }));
          })
        );
      })
    );
  });

  public logoutSuccess$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(logoutActionSuccess),
        tap(() => {
          this._storageService.clearStorage();
          this._utilities.navigateByUrl(urlValues.auth);
          this._utilities.snackBarMessage('Вы вышли из системы');
        })
      );
    },
    { dispatch: false }
  );
}
