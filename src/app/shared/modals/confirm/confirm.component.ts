import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ButtonColorMap, ColorMap } from '../../enums';

interface DialogData {
  title: string;
}

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent {
  public colorMap = ColorMap;

  public buttonColorMap = ButtonColorMap;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
