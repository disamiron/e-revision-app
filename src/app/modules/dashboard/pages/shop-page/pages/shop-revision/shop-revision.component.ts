import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Directory, Filesystem, Encoding } from '@capacitor/filesystem';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import moment from 'moment';
import { Observable, filter, take } from 'rxjs';
import { setPrevLocationData } from 'src/app/data/store/actions/location.actions';
import {
  startRevisionAction,
  stopRevisionAction,
} from 'src/app/data/store/actions/revision.actions';
import { getShopByShopIdAction } from 'src/app/data/store/actions/shop.actions';
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
import { ConfirmComponent } from 'src/app/shared/modals/confirm/confirm.component';
import { RevisionService } from 'src/app/shared/services/revision/revision.service';
import { UtilitiesService } from 'src/app/shared/services/utilities/utilities.service';

@UntilDestroy()
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

  constructor(
    private _store: Store,
    private _utilities: UtilitiesService,
    private _revision: RevisionService,
    private _dialog: MatDialog
  ) {}

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

  public goToScanner(): void {
    this._shopId$.pipe(take(1)).subscribe((shopId: string | undefined) => {
      if (shopId) {
        const revisionUrl =
          urlValues.dashboard +
          '/' +
          urlValues.shop +
          '/' +
          shopId +
          '/' +
          urlValues.revision +
          '/' +
          urlValues.scan;

        this._utilities.navigateByUrl(revisionUrl);
      }
    });
  }

  public goToSearch(): void {
    this._shopId$.pipe(take(1)).subscribe((shopId: string | undefined) => {
      if (shopId) {
        const revisionUrl =
          urlValues.dashboard +
          '/' +
          urlValues.shop +
          '/' +
          shopId +
          '/' +
          urlValues.revision +
          '/' +
          urlValues.search;

        this._utilities.navigateByUrl(revisionUrl);
      }
    });
  }

  public startRevision(): void {
    this._shopId$.pipe(take(1)).subscribe((shopId: string | undefined) => {
      this._store.dispatch(startRevisionAction({ shopId: shopId! }));
    });
  }

  public stopRevision(): void {
    this._dialog
      .open(ConfirmComponent, {
        data: {
          title: 'Вы уверены, что хотите остановить ревизию?',
        },
      })
      .afterClosed()
      .pipe(filter((v) => v === 'confirm'))
      .subscribe(() => {
        this._shopId$.pipe(take(1)).subscribe((shopId: string | undefined) => {
          this._store.dispatch(stopRevisionAction({ shopId: shopId! }));
        });
      });
  }

  public sendResultToEmail() {
    this._shopId$.pipe(take(1)).subscribe((shopId: string | undefined) => {
      this._revision
        .sendResultToEmail(shopId!)
        .pipe(untilDestroyed(this))
        .subscribe(() => {
          this._utilities.snackBarMessage('Успешно отправлено');
        });
    });
  }

  public downloadResult() {
    this._shopId$.pipe(take(1)).subscribe((shopId: string | undefined) => {
      this._revision
        .downloadFileRevision(shopId!)
        .pipe(untilDestroyed(this))
        .subscribe((v) => {
          const blob = new Blob([v]);
          const fileReader = new FileReader();
          fileReader.onloadend = () => {
            const content = fileReader?.result?.toString();

            const date = moment();

            const day_month_year = date.format('DD.MM.YYYY');
            const hour_minute = date.format('HH.mm');

            const fileName = `ZOUT-${day_month_year}-${hour_minute}.dat`;
            const directory = Directory.Documents;

            Filesystem.writeFile({
              path: `${directory}/${fileName}`,
              data: content!,
              directory: directory,
              recursive: true,
              encoding: Encoding.UTF8,
            })
              .then(() => {
                this._utilities.snackBarMessage(
                  `Файл успешно сохранен по маршруту ${directory}/${fileName}`,
                  5000
                );
              })
              .catch((error) => {
                this._utilities.snackBarMessage(`Ошибка: ${error}`);
              });
          };

          fileReader.readAsText(blob);
        });
    });
  }
}
