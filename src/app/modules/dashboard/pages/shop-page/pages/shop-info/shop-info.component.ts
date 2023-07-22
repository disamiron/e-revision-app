import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
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
export class ShopInfoComponent {
  public shop$: Observable<IShop | null> =
    this._store.select(selectCurrentShop);

  private _shopId$: Observable<string | undefined> =
    this._store.select(selectCurrentShopId);

  public revisionStatus = RevisionStatus;
  public colorMap = ColorMap;
  public buttonColorMap = ButtonColorMap;

  public shopInfoButtonsText = shopInfoButtonsText;

  constructor(private _store: Store, private _utilites: UtilitiesService) {}

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

        this._utilites.navigateByUrl(revisionUrl);
      }
    });
  }
}
