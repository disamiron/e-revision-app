import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BarcodeScanner } from '@capacitor-mobi/barcode-scanner';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { Observable, debounceTime, filter, from, map, take } from 'rxjs';
import { setPrevLocationData } from 'src/app/data/store/actions/location.actions';
import {
  getProductListByByLocalIdAction,
  getProductListByByLocalIdSuccess,
} from 'src/app/data/store/actions/revision.actions';
import { selectCurrentPlatform } from 'src/app/data/store/selectors/platform.selectors';
import { selectRevisionProductsSearchList } from 'src/app/data/store/selectors/revision.selectors';
import { selectCurrentShopId } from 'src/app/data/store/selectors/shop.selectors';
import { selectCurrentUserWithoutRights } from 'src/app/data/store/selectors/user.selectors';
import { urlValues } from 'src/app/shared/constants';
import { CurrentPlatform } from 'src/app/shared/enums';
import { IProduct } from 'src/app/shared/interfaces';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { StorageType } from 'src/app/shared/services/storage/storage.type';
import { UtilitiesService } from 'src/app/shared/services/utilities/utilities.service';

@UntilDestroy()
@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss'],
})
export class ProductSearchComponent implements OnInit, OnDestroy {
  public productList$: Observable<IProduct[] | null> = this._store.select(
    selectRevisionProductsSearchList
  );

  public isManuallLogic: boolean = true;

  public isPermision: boolean = false;

  public isNative: boolean = false;

  private _shopId$: Observable<string | undefined> =
    this._store.select(selectCurrentShopId);

  public shopId: string | null = null;

  private _currentPlatform$: Observable<CurrentPlatform | null> =
    this._store.select(selectCurrentPlatform);

  private _currentUserWithoutRights$ = this._store.select(
    selectCurrentUserWithoutRights
  );

  public currentUserWithoutRights: boolean = true;

  public searchFormGroup: FormGroup = this._fb.group({
    searchValue: [null],
  });

  constructor(
    private _fb: FormBuilder,
    private _utilities: UtilitiesService,
    private _store: Store,
    private _storage: StorageService
  ) {}

  public ngOnInit() {
    this._shopId$.pipe(take(1)).subscribe((shopId: string | undefined) => {
      if (shopId) {
        this.shopId = shopId;

        this._store.dispatch(
          setPrevLocationData({
            prevLocaction:
              urlValues.dashboard +
              '/' +
              urlValues.shop +
              '/' +
              shopId +
              '/' +
              urlValues.revision,
          })
        );
      } else {
        this._utilities.navigateByUrl(urlValues.dashboard);
      }
    });

    this._currentUserWithoutRights$.pipe(take(1)).subscribe((v) => {
      this.currentUserWithoutRights = Boolean(v);
    });

    this._currentPlatform$
      .pipe(take(1))
      .subscribe((platform: CurrentPlatform | null) => {
        this.isNative = platform !== CurrentPlatform.web;
        this._checkPermision();
        this._searchValueChanges();
      });
  }

  private _searchValueChanges() {
    this.searchFormGroup.controls.searchValue.valueChanges
      .pipe(
        untilDestroyed(this),
        debounceTime(800),
        filter((value) => value?.length > 6 || !value),
        map((value) => (value ? value : null))
      )
      .subscribe((value) => {
        this._store.dispatch(
          getProductListByByLocalIdSuccess({ productList: null })
        );

        if (value && value !== '') {
          this._store.dispatch(
            getProductListByByLocalIdAction({
              shopId: this.shopId!,
              searchValue: value,
            })
          );
        }
      });
  }

  private _checkPermision() {
    if (!this.isNative) {
      this.isManuallLogic = true;

      let notification: { manualEntryOnly: boolean } = this._storage.getItem(
        StorageType.Notification
      );

      if (notification.manualEntryOnly) {
        this._utilities.snackBarMessage(
          'Только ручной ввод. Cканер доступен в мобильной версии.',
          5000
        );
      }

      this._storage.setItem(StorageType.Notification, {
        manualEntryOnly: false,
      });

      return;
    }

    from(BarcodeScanner.checkPermission({ force: true }))
      .pipe(untilDestroyed(this))
      .subscribe((status) => {
        if (status.granted) {
          this._startScan();
        } else {
          this.isManuallLogic = true;
        }
      });
  }

  public changeScanMethod() {
    this.isManuallLogic = !this.isManuallLogic;

    if (!this.isManuallLogic) {
      this._store.dispatch(
        getProductListByByLocalIdSuccess({ productList: null })
      );

      this.searchFormGroup.patchValue({
        searchValue: null,
      });

      this._startScan();
    } else {
      this._stopScan();
    }
  }

  private _startScan() {
    this.isManuallLogic = false;

    BarcodeScanner.hideBackground();
    from(BarcodeScanner.startScan({}))
      .pipe(untilDestroyed(this))
      .subscribe((v) => {
        if (v.hasContent) {
          this._stopScan();

          this.searchFormGroup.patchValue({
            searchValue: v.content,
          });
          this.isManuallLogic = true;
        }
      });
  }

  private _stopScan() {
    BarcodeScanner.stopScan();
    BarcodeScanner.showBackground();
  }

  public clear() {
    this._store.dispatch(
      getProductListByByLocalIdSuccess({ productList: null })
    );

    this.searchFormGroup.patchValue({
      searchValue: null,
    });
  }

  public ngOnDestroy() {
    if (this.isNative) {
      this._stopScan();
    }
    this._store.dispatch(
      getProductListByByLocalIdSuccess({ productList: null })
    );
  }
}
