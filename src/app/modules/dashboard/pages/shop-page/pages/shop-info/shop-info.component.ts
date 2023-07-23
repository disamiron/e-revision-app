import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { setPrevLocationData } from 'src/app/data/store/actions/location.actions';
import { getShopByShopIdAction } from 'src/app/data/store/actions/shop.actions';
import {
  selectCurrentShop,
  selectCurrentShopId,
} from 'src/app/data/store/selectors/shop.selectors';
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

  constructor(private _store: Store, private _utilities: UtilitiesService) {}

  public ngOnInit(): void {
    this._store.dispatch(
      setPrevLocationData({ prevLocaction: urlValues.dashboard })
    );
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
}
