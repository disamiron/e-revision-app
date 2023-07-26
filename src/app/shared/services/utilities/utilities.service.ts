import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StorageService } from '../storage/storage.service';
import { StorageType } from '../storage/storage.type';
import { Haptics } from '@capacitor/haptics';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { Clipboard } from '@capacitor/clipboard';
import { from, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  constructor(
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _storage: StorageService
  ) {}

  public snackBarMessage(message: string, duration: number = 3000) {
    this._snackBar.open(message, 'Закрыть', { duration: duration });
  }

  public navigateByUrl(url: string) {
    this._router.navigateByUrl(url);
  }

  public playAudio(error?: boolean) {
    let volume: { noSound: boolean; noVibration: boolean } =
      this._storage.getItem(StorageType.Volume);

    if (!volume?.noVibration) {
      Haptics.vibrate();
    }

    if (!volume?.noSound) {
      let audio = new Audio();
      audio.src = error
        ? 'assets/sounds/error.mp3'
        : 'assets/sounds/success.mp3';
      audio.load();

      audio.play();
    }
  }

  public announceTheNumber(num: string): void {
    let volume: { noSound: boolean; noTextToSpeech: boolean } =
      this._storage.getItem(StorageType.Volume);

    if (volume.noSound || volume.noTextToSpeech) {
      return;
    }

    const speak = async () => {
      await TextToSpeech.speak({
        text: num,
        lang: 'ru-RU',
        rate: 1.0,
        pitch: 1.0,
        volume: 1.0,
        category: 'ambient',
      });
    };

    speak();
  }

  public writeValueToClipboard(value: string) {
    from(
      Clipboard.write({
        string: value,
      }).then(() => this.snackBarMessage(`Скопировано значение: ${value}`))
    )
      .pipe(take(1))
      .subscribe();
  }
}
