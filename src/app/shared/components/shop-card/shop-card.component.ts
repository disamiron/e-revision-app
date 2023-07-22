import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { urlValues } from '../../constants';
import { RevisionStatus } from '../../enums';
import { IShop } from '../../interfaces';
import { Store } from '@ngrx/store';
import { initCurrentShop } from 'src/app/data/store/actions/revision.actions';

@Component({
  selector: 'app-shop-card',
  templateUrl: './shop-card.component.html',
  styleUrls: ['./shop-card.component.scss'],
})
export class ShopCardComponent {
  @Input() public shop: IShop | null = null;

  public readonly RevisionStatus = RevisionStatus;

  public isModerator: boolean = true;

  constructor(private _store: Store, private _router: Router) {}

  public navigateToShop() {
    this._store.dispatch(initCurrentShop({ shop: this.shop }));

    const shopUrl =
      urlValues.dashboard + '/' + urlValues.shop + '/' + this.shop?.shopId;

    this._router.navigateByUrl(shopUrl);
  }
}
