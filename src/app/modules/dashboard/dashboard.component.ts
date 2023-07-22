import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  NavigationEnd,
  Router,
} from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, map, Observable, take } from 'rxjs';
import {
  appName,
  appSections,
  menuButtonsText,
  urlValues,
} from 'src/app/shared/constants';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { StorageType } from 'src/app/shared/services/storage/storage.type';
import packageJson from '../../../../package.json';
import { IUser } from 'src/app/shared/interfaces';
import { Store } from '@ngrx/store';
import {
  selectCurrentUser,
  selectUserIsLoading,
} from 'src/app/data/store/selectors/user.selectors';
import { IonMenu } from '@ionic/angular';
import { MenuButtonsType } from 'src/app/shared/enums';
import { logoutAction } from 'src/app/data/store/actions/user.actions';
import { selectPrevLocaction } from 'src/app/data/store/selectors/location.selectors';
import { selectRevisionIsLoading } from 'src/app/data/store/selectors/revision.selectors';
import { selectShopIsLoading } from 'src/app/data/store/selectors/shop.selectors';

@UntilDestroy()
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  @ViewChild(IonMenu) menu: IonMenu | undefined;

  public readonly appName = appName;

  public readonly version = packageJson.version;

  public readonly appSections = appSections;

  public readonly menuButtonsText = menuButtonsText;

  public readonly menuButtonsType = MenuButtonsType;

  public readonly urlValues = urlValues;

  public title: string = appName;

  public noSound: boolean = false;
  public noVibration: boolean = false;
  public noTextToSpeech: boolean = false;

  public currentUser$: Observable<IUser | null> =
    this._store.select(selectCurrentUser);

  private _prevLocation$ = this._store.select(selectPrevLocaction);

  public selectRevisionIsLoading$ = this._store.select(selectRevisionIsLoading);
  public selectUserIsLoading$ = this._store.select(selectUserIsLoading);
  public selectShopIsLoading$ = this._store.select(selectShopIsLoading);

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _storage: StorageService,
    private _store: Store,
    public location: Location
  ) {}

  public ngOnInit(): void {
    let deepest: ActivatedRouteSnapshot = this._activatedRoute.snapshot;

    while (deepest.firstChild) {
      deepest = deepest.firstChild;
    }

    this.title = deepest.data.title;

    this._setTitle();

    this._initVolumeSettings();
  }

  private _setTitle(): void {
    this._router.events
      .pipe(
        untilDestroyed(this),
        filter((event) => event instanceof NavigationEnd),
        map(() => this._activatedRoute.snapshot),
        map((route) => {
          let deepest: ActivatedRouteSnapshot = route;

          while (deepest.firstChild) {
            deepest = deepest.firstChild;
          }
          return deepest.data.title;
        })
      )
      .subscribe((title: string) => {
        this.title = title;
      });
  }

  private _initVolumeSettings() {
    let volume: {
      noSound: boolean;
      noVibration: boolean;
      noTextToSpeech: boolean;
    } = this._storage.getItem(StorageType.Volume);

    this.noSound = volume?.noSound;
    this.noVibration = volume?.noVibration;
    this.noTextToSpeech = volume?.noTextToSpeech;
  }

  public closeMenu(): void {
    this.menu?.close();
  }

  public toggleModeOption(type: MenuButtonsType) {
    switch (type) {
      case MenuButtonsType.Volume:
        this.noSound = !this.noSound;
        break;
      case MenuButtonsType.Vibration:
        this.noVibration = !this.noVibration;
        break;
      case MenuButtonsType.TextToSpeech:
        this.noTextToSpeech = !this.noTextToSpeech;
        break;
    }

    this._storage.setItem(StorageType.Volume, {
      noSound: this.noSound,
      noTextToSpeech: this.noTextToSpeech,
      noVibration: this.noVibration,
    });
  }

  public back() {
    this._prevLocation$.pipe(take(1)).subscribe((v) => {
      if (v) {
        this._router.navigateByUrl(v);
      } else {
        this.location.back();
      }
    });
  }

  public logout(): void {
    this._store.dispatch(logoutAction());

    this.closeMenu();
  }
}
