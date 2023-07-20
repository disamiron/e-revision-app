import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';
import { selectCurrentUser } from 'src/app/data/store/selectors/user.selectors';
import { urlValues } from '../../constants';
import { IUser } from '../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private _auth: UrlTree;

  private _dashboard: UrlTree;

  constructor(private _router: Router, private _store: Store) {
    this._auth = this._router.parseUrl(urlValues.auth);
    this._dashboard = this._router.parseUrl(urlValues.dashboard);
  }

  private _currentUser$ = this._store.select(selectCurrentUser);

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    return this._currentUser$.pipe(
      take(1),
      map((user: IUser | null) => {
        if (!user) {
          if (route.routeConfig?.path === urlValues.auth) {
            return true;
          }
          return this._auth;
        } else {
          if (route.routeConfig?.path === urlValues.auth) {
            return this._dashboard;
          }
          return true;
        }
      })
    );
  }
}
