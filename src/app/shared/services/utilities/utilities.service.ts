import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  constructor(private _snackBar: MatSnackBar, private _router: Router) {}

  public snackBarMessage(message: string, duration: number = 3000) {
    this._snackBar.open(message, 'Закрыть', { duration: duration });
  }

  public navigateByUrl(url: string) {
    this._router.navigateByUrl(url);
  }
}
