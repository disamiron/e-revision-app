import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { getShopByShopIdAction } from 'src/app/data/store/actions/shop.actions';
import { urlValues } from 'src/app/shared/constants';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { StorageType } from 'src/app/shared/services/storage/storage.type';
import { UtilitiesService } from 'src/app/shared/services/utilities/utilities.service';

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.scss'],
})
export class ShopPageComponent implements OnInit {
  public shopId: string | null = null;

  constructor(
    private _store: Store,
    private _activatedRoute: ActivatedRoute,
    private _utilities: UtilitiesService,
    private _storage: StorageService
  ) {}

  public ngOnInit(): void {
    this.shopId = this._activatedRoute.snapshot?.params?.shopId;

    if (this.shopId) {
      this._store.dispatch(getShopByShopIdAction({ shopId: this.shopId }));

      this._storage.setItem(StorageType.FavoriteShopId, {
        shopId: this.shopId,
      });
    } else {
      this._utilities.navigateByUrl(urlValues.dashboard);
    }
  }
}
