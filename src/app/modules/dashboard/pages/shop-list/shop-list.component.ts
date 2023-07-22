import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getShopListAction } from 'src/app/data/store/actions/shop.actions';
import { selectShopList } from 'src/app/data/store/selectors/shop.selectors';
import { IShop } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss'],
})
export class ShopListComponent {
  public shopList: IShop[] = [];

  public shopList$ = this._store.select(selectShopList);

  constructor(private _store: Store) {}

  public ngOnInit(): void {
    this.getAllShop();
    // this._store.dispatch(initCurrentShop({ shop: null }));
  }

  handleRefresh(event: any) {
    this.getAllShop();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  public getAllShop() {
    this._store.dispatch(getShopListAction());
  }
}
