import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private _fb: FormBuilder) {}

  public loginFormGroup: FormGroup = this._fb.group({
    login: [null, [Validators.required]],
    password: [null, [Validators.required]],
  });
}
