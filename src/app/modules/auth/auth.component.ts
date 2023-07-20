import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { loginAction } from 'src/app/data/store/actions/user.actions';
import {
  selectUserAuthError,
  selectUserIsLoading,
} from 'src/app/data/store/selectors/user.selectors';
import { authErrorMsg, phoneMask, requiredMsg } from 'src/app/shared/regex';

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

  constructor(private _fb: FormBuilder, private _store: Store) {}

  public loginFormGroup: FormGroup = this._fb.group({
    login: [null, [Validators.required]],
    password: [null, [Validators.required]],
  });

  public submit() {
    const phoneNumber: string = '7' + this.loginFormGroup.value.login;
    const password: string = this.loginFormGroup.value.password;

    this._store.dispatch(
      loginAction({
        data: {
          phoneNumber: phoneNumber,
          password: password,
        },
      })
    );
  }
}
