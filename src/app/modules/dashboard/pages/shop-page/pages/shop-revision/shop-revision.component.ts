import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { setPrevLocationData } from 'src/app/data/store/actions/location.actions';
import {
  startRevisionAction,
  startUploadRevisionFileAction,
  stopRevisionAction,
} from 'src/app/data/store/actions/revision.actions';
import {
  selectCurrentShop,
  selectCurrentShopId,
} from 'src/app/data/store/selectors/shop.selectors';
import { selectCurrentUserWithoutRights } from 'src/app/data/store/selectors/user.selectors';
import {
  dateFormat,
  shopRevisonButtonsText,
  urlValues,
} from 'src/app/shared/constants';
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

  private _shopId$: Observable<string | undefined> =
    this._store.select(selectCurrentShopId);

  public revisionStatus = RevisionStatus;
  public colorMap = ColorMap;
  public buttonColorMap = ButtonColorMap;

  public shopRevisionButtonsText = shopRevisonButtonsText;

  public dateFormat: string = dateFormat;

  public currentUserWithoutRights: boolean = true;

  constructor(private _store: Store) {}

  public ngOnInit(): void {
    this._shopId$.pipe(take(1)).subscribe((shopId: string | undefined) => {
      this._store.dispatch(
        setPrevLocationData({
          prevLocaction:
            urlValues.dashboard + '/' + urlValues.shop + '/' + shopId,
        })
      );
    });

    this._store
      .select(selectCurrentUserWithoutRights)
      .pipe(take(1))
      .subscribe((currentUserWithoutRights: boolean | undefined) => {
        this.currentUserWithoutRights = Boolean(currentUserWithoutRights);
      });
  }

  public startRevision(): void {
    this._shopId$.pipe(take(1)).subscribe((shopId: string | undefined) => {
      this._store.dispatch(startRevisionAction({ shopId: shopId! }));
    });
  }

  public stopRevision(): void {
    this._shopId$.pipe(take(1)).subscribe((shopId: string | undefined) => {
      this._store.dispatch(stopRevisionAction({ shopId: shopId! }));
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
