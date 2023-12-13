import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BarcodeScanner } from '@capacitor-mobi/barcode-scanner';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { Observable, from, take } from 'rxjs';
import { setPrevLocationData } from 'src/app/data/store/actions/location.actions';
import {
  getProductListFromAllShopByByLocalIdAction,
  getProductListFromAllShopByByLocalIdSuccess,
} from 'src/app/data/store/actions/shop.actions';
import { selectCurrentPlatform } from 'src/app/data/store/selectors/platform.selectors';
import { selectAllShopsProductsSearchList } from 'src/app/data/store/selectors/shop.selectors';
import { selectCurrentUserWithoutRights } from 'src/app/data/store/selectors/user.selectors';
import { urlValues } from 'src/app/shared/constants';
import { CurrentPlatform } from 'src/app/shared/enums';
import { IGlobalProduct } from 'src/app/shared/interfaces';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { StorageType } from 'src/app/shared/services/storage/storage.type';
import { UtilitiesService } from 'src/app/shared/services/utilities/utilities.service';

@UntilDestroy()
@Component({
  selector: 'app-product-all-shop-search',
  templateUrl: './product-all-shop-search.component.html',
  styleUrls: ['./product-all-shop-search.component.scss'],
})
export class ProductAllShopSearchComponent implements OnInit, OnDestroy {
  public productList$: Observable<IGlobalProduct | null> = this._store.select(
    selectAllShopsProductsSearchList
  );

  public isManuallLogic: boolean = true;
  public isPermision: boolean = false;
  public isNative: boolean = false;

  public shopId: string | null = null;

  private _currentPlatform$: Observable<CurrentPlatform | null> =
    this._store.select(selectCurrentPlatform);

  private _currentUserWithoutRights$ = this._store.select(
    selectCurrentUserWithoutRights
  );

  public previusValue: string | null = null;

  public currentUserWithoutRights: boolean = true;

  public searchFormGroup: FormGroup = this._fb.group({
    searchValue: [null],
  });

  constructor(
    private _fb: FormBuilder,
    private _utilities: UtilitiesService,
    private _store: Store,
    private _storage: StorageService,
    private _cdr: ChangeDetectorRef
  ) {}

  public ngOnInit() {
    this._store.dispatch(
      setPrevLocationData({
        prevLocaction: urlValues.dashboard,
      })
    );

    this._currentUserWithoutRights$.pipe(take(1)).subscribe((v) => {
      this.currentUserWithoutRights = Boolean(v);
    });

    this._currentPlatform$
      .pipe(take(1))
      .subscribe((platform: CurrentPlatform | null) => {
        this.isNative = platform !== CurrentPlatform.web;
        this._checkPermision();
      });
  }

  public submit(value: string | null) {
    this._store.dispatch(
      getProductListFromAllShopByByLocalIdSuccess({ productList: null })
    );

    if (value && value !== '') {
      this.previusValue = value;
      this._store.dispatch(
        getProductListFromAllShopByByLocalIdAction({
          shopId: this.shopId!,
          searchValue: value,
        })
      );
    }
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
      this._cdr.detectChanges();
      return;
    }

    from(BarcodeScanner.checkPermission({ force: true }))
      .pipe(untilDestroyed(this))
      .subscribe((status) => {
        if (status.granted) {
          this._startScan();
        } else {
          this.isManuallLogic = true;
          this._cdr.detectChanges();
        }
      });
  }

  public changeScanMethod() {
    this.isManuallLogic = !this.isManuallLogic;

    if (!this.isManuallLogic) {
      this._store.dispatch(
        getProductListFromAllShopByByLocalIdSuccess({ productList: null })
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
    this._cdr.detectChanges();
    from(BarcodeScanner.startScan({}))
      .pipe(untilDestroyed(this))
      .subscribe((v) => {
        if (v.hasContent) {
          this._stopScan();

          if (v.content) {
            this.submit(v.content);
          }

          this.isManuallLogic = true;
          this._cdr.detectChanges();
        }
      });
  }

  private _stopScan() {
    BarcodeScanner.stopScan();
    BarcodeScanner.showBackground();
    this._cdr.detectChanges();
  }

  public clear() {
    this._store.dispatch(
      getProductListFromAllShopByByLocalIdSuccess({ productList: null })
    );

    this.searchFormGroup.patchValue({
      searchValue: null,
    });
    this._cdr.detectChanges();
  }

  public ngOnDestroy() {
    if (this.isNative) {
      this._stopScan();
    }
    this._store.dispatch(
      getProductListFromAllShopByByLocalIdSuccess({ productList: null })
    );
  }
}
