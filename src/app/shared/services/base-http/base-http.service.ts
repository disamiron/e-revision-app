import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { StorageService } from '../storage/storage.service';
import { StorageType } from '../storage/storage.type';
import { IUser } from '../../interfaces';
import { Store } from '@ngrx/store';
import { logoutActionSuccess } from 'src/app/data/store/actions/user.actions';
import { UtilitiesService } from '../utilities/utilities.service';

const DEFAULT_HEADERS = {
  Accept: 'application/json, text/plain, */*',
  'X-Requested-With': 'XMLHttpRequest',
  'Cache-Control': 'no-cache',
  Pragma: 'no-cache',
};

const DOWNLOAD_HEADERS = {
  'Content-Type': 'application/octet-stream',
  'Content-Disposition': 'attachment; filename="ZOUT.dat"',
};

@Injectable({
  providedIn: 'root',
})
export class BaseHttpService {
  private readonly _api = '/api';

  private readonly _baseHref = `http://e-revision.ru${this._api}`;

  private _createDefaultHeaders(getBlob?: boolean): HttpHeaders {
    const headers = new HttpHeaders(
      getBlob ? DOWNLOAD_HEADERS : DEFAULT_HEADERS
    );
    const token = this._storageService.getItem<IUser>(StorageType.User);

    if (token?.accessToken) {
      return headers.append('Authorization', `Bearer ${token.accessToken}`);
    }

    return headers;
  }

  constructor(
    private _http: HttpClient,
    private _storageService: StorageService,
    private _utils: UtilitiesService,
    private _store: Store
  ) {}

  public get<T>(url: string, params?: any): Observable<T> {
    let queryParams = new HttpParams();
    for (let key in params) {
      queryParams = queryParams.append(key, params[key]);
    }
    return this._http
      .get<T>(this._baseHref + url, {
        params: queryParams,
        headers: this._createDefaultHeaders(),
      })
      .pipe(
        catchError<any, any>((err: HttpErrorResponse) => this._handleError(err))
      );
  }

  public post<T>(url: string, params?: any): Observable<T> {
    return this._http
      .post<T>(this._baseHref + url, params, {
        headers: this._createDefaultHeaders(),
      })
      .pipe(
        catchError<any, any>((err: HttpErrorResponse) => this._handleError(err))
      );
  }

  public put<T>(url: string, params?: any): Observable<T> {
    return this._http
      .put<T>(this._baseHref + url, params, {
        headers: this._createDefaultHeaders(),
      })
      .pipe(
        catchError<any, any>((err: HttpErrorResponse) => this._handleError(err))
      );
  }

  public postBlob<T>(url: string, file: File): Observable<T> {
    const data = new FormData();

    data.append('file', file, file.name);

    return this._http
      .post<T>(`${this._baseHref}${url}`, data, {
        headers: this._createDefaultHeaders(),
      })
      .pipe(
        catchError<any, any>((err: HttpErrorResponse) => this._handleError(err))
      );
  }

  public postBlobWithProgress<T>(url: string, file: File): Observable<T> {
    const data = new FormData();

    data.append('file', file, file.name);

    return this._http
      .post<T>(`${this._baseHref}${url}`, data, {
        headers: this._createDefaultHeaders(),
        reportProgress: true,
        observe: 'events',
      })
      .pipe(
        catchError<any, any>((err: HttpErrorResponse) => this._handleError(err))
      );
  }

  private _handleError(e: HttpErrorResponse): Observable<Error> {
    const code = e.status;

    switch (code) {
      case 500:
        this._utils.snackBarMessage('Непредвиденная ошибка');
        break;

      case 401:
        //TODO: temporary
        this._store.dispatch(logoutActionSuccess());
        break;

      case 403:
        e.error.applicationErrorCode === 'notEnoughRightsToCompleteRevision'
          ? this._utils.snackBarMessage(
              e.error?.message ? e.error.message : 'Непредвиденная ошибка'
            )
          : this._store.dispatch(logoutActionSuccess());
        break;

      default:
        this._utils.snackBarMessage(
          e.error?.message ? e.error.message : 'Непредвиденная ошибка'
        );
        break;
    }

    return throwError(e.error);
  }
}
