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
import { Router } from '@angular/router';
import { urlValues } from 'src/app/shared/constants';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { RevisionService } from 'src/app/shared/services/revision/revision.service';
import { StorageType } from 'src/app/shared/services/storage/storage.type';
import { UtilitiesService } from 'src/app/shared/services/utilities/utilities.service';

@Injectable()
export class UserEffects {
  constructor(
    private _actions$: Actions,
    private _router: Router,
    private _storageService: StorageService,
    private _revisionService: RevisionService,
    private _utils: UtilitiesService
  ) {}

  login$ = createEffect(() => {
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

  loginSuccess$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(loginSuccess),
        tap((action) => {
          this._storageService.setItem(StorageType.User, action.user);
          this._router.navigateByUrl(urlValues.dashboard);
          this._utils.snackBarMessage('Добро пожаловать');
        })
      );
    },
    { dispatch: false }
  );

  loginFailed$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(loginFailed),
        tap(() => {
          this._utils.snackBarMessage('Неверный логин или пароль');
        })
      );
    },
    { dispatch: false }
  );

  logout$ = createEffect(() => {
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

  logoutSuccess$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(logoutActionSuccess),
        tap(() => {
          this._storageService.clearStorage();
          this._utils.snackBarMessage('Вы вышли из системы');
          this._router.navigateByUrl(urlValues.auth);
        })
      );
    },
    { dispatch: false }
  );
}