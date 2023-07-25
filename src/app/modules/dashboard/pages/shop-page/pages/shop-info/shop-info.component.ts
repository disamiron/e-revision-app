import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { setPrevLocationData } from 'src/app/data/store/actions/location.actions';
import { startUploadRevisionFileAction } from 'src/app/data/store/actions/revision.actions';
import { getShopByShopIdAction } from 'src/app/data/store/actions/shop.actions';
import {
  selectCurrentShop,
  selectCurrentShopId,
} from 'src/app/data/store/selectors/shop.selectors';
import { selectCurrentUserWithoutRights } from 'src/app/data/store/selectors/user.selectors';
import { shopInfoButtonsText, urlValues } from 'src/app/shared/constants';
import { ButtonColorMap, ColorMap, RevisionStatus } from 'src/app/shared/enums';
import { IShop } from 'src/app/shared/interfaces';
import { UtilitiesService } from 'src/app/shared/services/utilities/utilities.service';

@Component({
  selector: 'app-shop-info',
  templateUrl: './shop-info.component.html',
  styleUrls: ['./shop-info.component.scss'],
})
export class ShopInfoComponent implements OnInit {
  public shop$: Observable<IShop | null> =
    this._store.select(selectCurrentShop);

  private _shopId$: Observable<string | undefined> =
    this._store.select(selectCurrentShopId);

  public revisionStatus = RevisionStatus;
  public colorMap = ColorMap;
  public buttonColorMap = ButtonColorMap;

  public shopInfoButtonsText = shopInfoButtonsText;

  public currentUserWithoutRights: boolean = true;

  constructor(private _store: Store, private _utilities: UtilitiesService) {}

  public ngOnInit(): void {
    this._store.dispatch(
      setPrevLocationData({ prevLocaction: urlValues.dashboard })
    );

    this._store
      .select(selectCurrentUserWithoutRights)
      .pipe(take(1))
      .subscribe((currentUserWithoutRights: boolean | undefined) => {
        this.currentUserWithoutRights = Boolean(currentUserWithoutRights);
      });
  }

  public handleRefresh(event: any) {
    this._getCurrentShop();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  private _getCurrentShop() {
    this._shopId$.pipe(take(1)).subscribe((shopId: string | undefined) => {
      if (shopId) {
        this._store.dispatch(getShopByShopIdAction({ shopId: shopId! }));
      } else {
        this._utilities.navigateByUrl(urlValues.dashboard);
      }
    });
  }

  public goToRevision() {
    this._shopId$.pipe(take(1)).subscribe((shopId: string | undefined) => {
      if (shopId) {
        const revisionUrl =
          urlValues.dashboard +
          '/' +
          urlValues.shop +
          '/' +
          shopId +
          '/' +
          urlValues.revision;

        this._utilities.navigateByUrl(revisionUrl);
      }
    });
  }

  public goToStoreSearch() {
    this._shopId$.pipe(take(1)).subscribe((shopId: string | undefined) => {
      if (shopId) {
        const revisionUrl =
          urlValues.dashboard +
          '/' +
          urlValues.shop +
          '/' +
          shopId +
          '/' +
          urlValues.storeSearch;

        this._utilities.navigateByUrl(revisionUrl);
      }
    });
  }

  public handleFileInput(file: any, isShipping: boolean = false) {
    if (!file) {
      return;
    }

    this._shopId$.pipe(take(1)).subscribe((shopId: string | undefined) => {
      this._store.dispatch(
        startUploadRevisionFileAction({
          shopId: shopId!,
          file: file.target.files[0],
          isShipping,
        })
      );
    });
  }
}
