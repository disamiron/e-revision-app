import { Component, Input } from '@angular/core';
import { ColorMap } from '../../enums';

@Component({
  selector: 'app-grid-button',
  templateUrl: './grid-button.component.html',
  styleUrls: ['./grid-button.component.scss'],
})
export class GridButtonComponent {
  @Input() public buttonColor: string | null = null;

  @Input() public buttonText: string | null = null;

  @Input() public buttonIcon: string | null = null;

  @Input() public buttonTextColor: string = ColorMap.black;
}
