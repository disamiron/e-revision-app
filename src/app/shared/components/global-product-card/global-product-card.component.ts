import { Component, Input } from '@angular/core';
import { IGlobalProduct } from '../../interfaces';
import { UtilitiesService } from '../../services/utilities/utilities.service';

@Component({
  selector: 'app-global-product-card',
  templateUrl: './global-product-card.component.html',
  styleUrls: ['./global-product-card.component.scss'],
})
export class GlobalProductCardComponent {
  @Input() product: IGlobalProduct | undefined;

  @Input() shopId: string | undefined;

  @Input() currentUserWithoutRights: boolean = true;

  public userId: string | undefined;

  constructor(private _utilities: UtilitiesService) {}

  public copyValue(value: string) {
    this._utilities.writeValueToClipboard(value);
  }
}
