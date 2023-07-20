import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  constructor(private _snackBar: MatSnackBar) {}

  public snackBarMessage(message: string, duration: number = 3000) {
    this._snackBar.open(message, 'Закрыть', { duration: duration });
  }
}
