import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCurrentShop } from 'src/app/data/store/selectors/shop.selectors';
import { shopInfoButtonsText } from 'src/app/shared/constants';
import { ButtonColorMap, ColorMap, RevisionStatus } from 'src/app/shared/enums';
import { IShop } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-shop-info',
  templateUrl: './shop-info.component.html',
  styleUrls: ['./shop-info.component.scss'],
})
export class ShopInfoComponent {
  public shop$: Observable<IShop | null> =
    this._store.select(selectCurrentShop);

  public revisionStatus = RevisionStatus;
  public colorMap = ColorMap;
  public buttonColorMap = ButtonColorMap;

  public shopInfoButtonsText = shopInfoButtonsText;

  constructor(private _store: Store) {}
}
