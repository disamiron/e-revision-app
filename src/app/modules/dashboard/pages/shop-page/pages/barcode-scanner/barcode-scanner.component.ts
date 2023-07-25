import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BarcodeScanner } from '@capacitor-mobi/barcode-scanner';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { Observable, from, take } from 'rxjs';
import { setPrevLocationData } from 'src/app/data/store/actions/location.actions';
import { getProductByBarcodeAction } from 'src/app/data/store/actions/revision.actions';
import { selectCurrentPlatform } from 'src/app/data/store/selectors/platform.selectors';
import { selectCurrentShopId } from 'src/app/data/store/selectors/shop.selectors';
import { urlValues } from 'src/app/shared/constants';
import { CurrentPlatform } from 'src/app/shared/enums';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { StorageType } from 'src/app/shared/services/storage/storage.type';
import { UtilitiesService } from 'src/app/shared/services/utilities/utilities.service';

@UntilDestroy()
@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.component.html',
  styleUrls: ['./barcode-scanner.component.scss'],
})
export class BarcodeScannerComponent implements OnInit, OnDestroy {
  public isManuallLogic: boolean = true;

  public isPermision: boolean = false;

  public isNative: boolean = false;

  public isShopSearch: boolean =
    this._activatedRoute.snapshot.data?.isShopSearch;

  private _shopId$: Observable<string | undefined> =
    this._store.select(selectCurrentShopId);

  private _shopId: string | null = null;

  private _currentPlatform$: Observable<CurrentPlatform | null> =
    this._store.select(selectCurrentPlatform);

  public manuallForm: FormGroup = this._fb.group({
    barcode: [null, Validators.required],
  });

  constructor(
    private _fb: FormBuilder,
    private _utilities: UtilitiesService,
    private _store: Store,
    private _activatedRoute: ActivatedRoute,
    private _storage: StorageService,
    private _cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this._shopId$.pipe(take(1)).subscribe((shopId: string | undefined) => {
      if (shopId) {
        this._shopId = shopId;

        const prevLocaction = this.isShopSearch
          ? urlValues.dashboard + '/' + urlValues.shop + '/' + shopId
          : urlValues.dashboard +
            '/' +
            urlValues.shop +
            '/' +
            shopId +
            '/' +
            urlValues.revision;

        this._store.dispatch(
          setPrevLocationData({
            prevLocaction: prevLocaction,
          })
        );
      } else {
        this._utilities.navigateByUrl(urlValues.dashboard);
      }
    });

    this._currentPlatform$
      .pipe(take(1))
      .subscribe((platform: CurrentPlatform | null) => {
        this.isNative = platform !== CurrentPlatform.web;
        this._checkPermision();
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

  private _startScan() {
    this.isManuallLogic = false;

    BarcodeScanner.hideBackground();
    this._cdr.detectChanges();
    from(BarcodeScanner.startScan({}))
      .pipe(untilDestroyed(this))
      .subscribe((v) => {
        if (v.hasContent) {
          this._stopScan();

          this.manuallForm.patchValue({
            barcode: v.content,
          });

          this.getProductByBarcode(v.content!);
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

  public changeScanMethod() {
    this.isManuallLogic = !this.isManuallLogic;

    if (!this.isManuallLogic) {
      this.manuallForm.patchValue({
        barcode: null,
      });
      this._startScan();
    } else {
      this._stopScan();
    }
  }

  public submit() {
    if (this.manuallForm.invalid) {
      return;
    }

    this.getProductByBarcode(this.manuallForm.value.barcode);
  }

  public getProductByBarcode(barcode: string) {
    this._store.dispatch(
      getProductByBarcodeAction({
        shopId: this._shopId!,
        barcode: barcode,
        isShopSearch: this.isShopSearch,
      })
    );
  }

  public ngOnDestroy() {
    if (this.isNative) {
      this._stopScan();
    }
  }
}
