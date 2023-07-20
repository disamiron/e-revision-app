import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILoginData, IUser } from '../../interfaces';
import { BaseHttpService } from '../base-http/base-http.service';

@Injectable({
  providedIn: 'root',
})
export class RevisionService {
  private readonly _authUrl = '/auth';

  private readonly _loginUrl = `${this._authUrl}/login`;

  private readonly _logoutUrl = `${this._authUrl}/logout`;

  constructor(private _http: BaseHttpService) {}

  public login(data: ILoginData): Observable<IUser> {
    return this._http.post<IUser>(this._loginUrl, { ...data });
  }

  public logout() {
    return this._http.post(this._logoutUrl);
  }
}
