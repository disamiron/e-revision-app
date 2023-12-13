import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { loginAction } from 'src/app/data/store/actions/user.actions';
import {
  selectUserAuthError,
  selectUserIsLoading,
} from 'src/app/data/store/selectors/user.selectors';
import { authErrorMsg, phoneMask, requiredMsg } from 'src/app/shared/regex';
import { selectCurrentPlatform } from 'src/app/data/store/selectors/platform.selectors';
import { CurrentPlatform } from 'src/app/shared/enums';
import { Observable, from, of, switchMap, take } from 'rxjs';
import { IPhoneId } from 'src/app/shared/interfaces';
import { Device } from '@capacitor/device';
import { DeviceId } from '@capacitor/device/dist/esm/definitions';

const DEFAULT_PHONE_ID: IPhoneId = {
  type: CurrentPlatform.web,
  id: null,
};

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  readonly requiredMsg = requiredMsg;

  readonly authErrorMsg = authErrorMsg;

  public readonly phoneMask = phoneMask;

  public isPasswordHide: boolean = true;

  public userAuthError$ = this._store.select(selectUserAuthError);

  public userIsLoading$ = this._store.select(selectUserIsLoading);

  private _currentPlatform$: Observable<CurrentPlatform | null> =
    this._store.select(selectCurrentPlatform);

  constructor(private _fb: FormBuilder, private _store: Store) {}

  public loginFormGroup: FormGroup = this._fb.group({
    login: [null, [Validators.required]],
    password: [null, [Validators.required]],
  });

  public submit() {
    this._currentPlatform$
      .pipe(
        take(1),
        switchMap((currentPlatform: CurrentPlatform | null) => {
          if (currentPlatform && currentPlatform !== CurrentPlatform.web) {
            return from(Device.getId());
          } else {
            return of(null);
          }
        })
      )
      .subscribe((deviceId: DeviceId | null) => {
        const phoneNumber: string = '7' + this.loginFormGroup.value.login;
        const password: string = this.loginFormGroup.value.password;

        let dataPhoneId: IPhoneId = DEFAULT_PHONE_ID;

        if (deviceId && deviceId?.identifier) {
          dataPhoneId.type = 'uuid';
          dataPhoneId.id = deviceId.identifier;
        }

        this._store.dispatch(
          loginAction({
            data: {
              phoneNumber: phoneNumber,
              password: password,
              phoneId: dataPhoneId,
            },
          })
        );
      });
  }
}
