import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, filter, map, take } from 'rxjs';
import { getShopListAction } from 'src/app/data/store/actions/shop.actions';
import { selectShopList } from 'src/app/data/store/selectors/shop.selectors';
import { RevisionStatus } from 'src/app/shared/enums';
import { IShop } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss'],
})
export class ShopListComponent {
  public shopList: IShop[] = [];

  public shopList$: Observable<IShop[] | undefined> = this._store
    .select(selectShopList)
    .pipe(
      map((shopList) => {
        var modShopList = shopList?.slice(0)?.sort(this._sortShopFunction);
        return modShopList;
      })
    );

  constructor(private _store: Store) {}

  public ngOnInit(): void {
    this.getAllShop();
  }

  public handleRefresh(event: any) {
    this.getAllShop();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  public getAllShop() {
    this._store.dispatch(getShopListAction());
  }

  private _sortShopFunction(a: IShop, b: IShop) {
    if (
      a.status === RevisionStatus.started &&
      b.status === RevisionStatus.started
    ) {
      return 0;
    }

    if (a.status === RevisionStatus.started) {
      return -1;
    }

    return 1;
  }
}
