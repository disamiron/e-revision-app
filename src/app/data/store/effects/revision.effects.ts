import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { RevisionService } from 'src/app/shared/services/revision/revision.service';
import { UtilitiesService } from 'src/app/shared/services/utilities/utilities.service';
import {
  startRevisionAction,
  startRevisionFailed,
  startRevisionSuccess,
  startUploadRevisionFileAction,
  startUploadRevisionFileFailed,
  startUploadRevisionFileProgress,
  startUploadRevisionFileSuccess,
  stopRevisionAction,
  stopRevisionFailed,
  stopRevisionSuccess,
} from '../actions/revision.actions';

@Injectable()
export class RevisionEffects {
  constructor(
    private _actions$: Actions,
    private _revisionService: RevisionService,
    private _urils: UtilitiesService
  ) {}

  public startRevision$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(startRevisionAction),
      switchMap((action) => {
        return this._revisionService.startRevisionByShopId(action.shopId).pipe(
          map(() => {
            this._urils.snackBarMessage('Ревизия успешно запущена');
            return startRevisionSuccess();
          }),
          catchError((error) => {
            return of(startRevisionFailed({ error }));
          })
        );
      })
    );
  });

  public stopRevision$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(stopRevisionAction),
      switchMap((action) => {
        return this._revisionService.stopRevisionByShopId(action.shopId).pipe(
          map(() => {
            this._urils.snackBarMessage('Ревизия остановлена');
            return stopRevisionSuccess();
          }),
          catchError((error) => {
            return of(stopRevisionFailed({ error }));
          })
        );
      })
    );
  });

  public startUploadRevisionFile$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(startUploadRevisionFileAction),
      switchMap((action) => {
        return this._revisionService
          .uploadFileRevision(action.shopId!, action.file, action.isShipping)
          .pipe(
            map((res: any) => {
              if (res.type < 4) {
                let progress = Math.round(
                  (100 * res.loaded) / (res.total as number)
                );

                return startUploadRevisionFileProgress({ progress: progress });
              }

              this._urils.snackBarMessage('Файл успешно загружен');
              return startUploadRevisionFileSuccess();
            }),
            catchError((error) => {
              return of(startUploadRevisionFileFailed({ error }));
            })
          );
      })
    );
  });
}
