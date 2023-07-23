import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { getShopByShopIdAction } from 'src/app/data/store/actions/shop.actions';
import { urlValues } from 'src/app/shared/constants';
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
    private _utilities: UtilitiesService
  ) {}

  public ngOnInit(): void {
    this.shopId = this._activatedRoute.snapshot?.params?.shopId;

    if (this.shopId) {
      this._store.dispatch(getShopByShopIdAction({ shopId: this.shopId }));
    } else {
      this._utilities.navigateByUrl(urlValues.dashboard);
    }
  }
}
