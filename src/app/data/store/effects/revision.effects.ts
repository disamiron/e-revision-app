import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { RevisionService } from 'src/app/shared/services/revision/revision.service';
import { UtilitiesService } from 'src/app/shared/services/utilities/utilities.service';
import {
  getProductByBarcodeAction,
  getProductByBarcodeFailed,
  getProductByBarcodeSuccess,
  getProductListByByLocalIdAction,
  getProductListByByLocalIdFailed,
  getProductListByByLocalIdSuccess,
  goToEditingProduct,
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
import { urlValues } from 'src/app/shared/constants';

@Injectable()
export class RevisionEffects {
  constructor(
    private _actions$: Actions,
    private _revisionService: RevisionService,
    private _utilities: UtilitiesService
  ) {}

  public startRevision$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(startRevisionAction),
      switchMap((action) => {
        return this._revisionService.startRevisionByShopId(action.shopId).pipe(
          map(() => {
            this._utilities.snackBarMessage('Ревизия успешно запущена');
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
            this._utilities.snackBarMessage('Ревизия остановлена');
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

              this._utilities.snackBarMessage('Файл успешно загружен');
              return startUploadRevisionFileSuccess();
            }),
            catchError((error) => {
              return of(startUploadRevisionFileFailed({ error }));
            })
          );
      })
    );
  });

  public getProductByBarcode$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(getProductByBarcodeAction),
      switchMap((action) => {
        return this._revisionService
          .getProductByBarcode(action.shopId, action.barcode)
          .pipe(
            map((product) => {
              return getProductByBarcodeSuccess({
                shopId: action.shopId,
                product,
                isShopSearch: action.isShopSearch,
              });
            }),
            catchError((error) => {
              return of(getProductByBarcodeFailed({ error }));
            })
          );
      })
    );
  });

  public getProductByBarcodeSuccess$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(getProductByBarcodeSuccess),
        tap((action) => {
          this._utilities.playAudio();
          this._utilities.navigateByUrl(
            !action.isShopSearch
              ? urlValues.dashboard +
                  '/' +
                  urlValues.shop +
                  '/' +
                  action.shopId +
                  '/' +
                  urlValues.revision +
                  '/' +
                  urlValues.product +
                  '/' +
                  action.product.barcode
              : urlValues.dashboard +
                  '/' +
                  urlValues.shop +
                  '/' +
                  action.shopId +
                  '/' +
                  urlValues.revision +
                  '/' +
                  urlValues.product +
                  '/' +
                  action.product.barcode +
                  '/' +
                  urlValues.view
          );
        })
      );
    },
    { dispatch: false }
  );

  public getProductByBarcodeFailed$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(getProductByBarcodeFailed),
        tap(() => {
          this._utilities.playAudio(true);
        })
      );
    },
    { dispatch: false }
  );

  public getProductListByByLocalId$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(getProductListByByLocalIdAction),
      switchMap((action) => {
        return this._revisionService
          .searchByLocalId(action.shopId, action.searchValue)
          .pipe(
            map((productList) => {
              return getProductListByByLocalIdSuccess({
                productList: productList.content,
              });
            }),
            catchError((error) => {
              return of(getProductListByByLocalIdFailed({ error }));
            })
          );
      })
    );
  });

  public goToEditingProduct$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(goToEditingProduct),
        tap((action) => {
          this._utilities.navigateByUrl(
            urlValues.dashboard +
              '/' +
              urlValues.shop +
              '/' +
              action.shopId +
              '/' +
              urlValues.revision +
              '/' +
              urlValues.product +
              '/' +
              action.product.barcode +
              '/' +
              urlValues.edit
          );
        })
      );
    },
    { dispatch: false }
  );
}
