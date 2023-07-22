import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCurrentShop } from 'src/app/data/store/selectors/shop.selectors';
import { dateFormat, shopRevisonButtonsText } from 'src/app/shared/constants';
import { ButtonColorMap, ColorMap, RevisionStatus } from 'src/app/shared/enums';
import { IShop } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-shop-revision',
  templateUrl: './shop-revision.component.html',
  styleUrls: ['./shop-revision.component.scss'],
})
export class ShopRevisionComponent implements OnInit {
  public shop$: Observable<IShop | null> =
    this._store.select(selectCurrentShop);

  public revisionStatus = RevisionStatus;
  public colorMap = ColorMap;
  public buttonColorMap = ButtonColorMap;

  public shopRevisionButtonsText = shopRevisonButtonsText;

  public dateFormat: string = dateFormat;

  constructor(private _store: Store) {}

  public ngOnInit(): void {}
}
