import { Component, Input } from '@angular/core';
import { urlValues } from '../../constants';
import { RevisionStatus } from '../../enums';
import { IShop } from '../../interfaces';
import { UtilitiesService } from '../../services/utilities/utilities.service';

@Component({
  selector: 'app-shop-card',
  templateUrl: './shop-card.component.html',
  styleUrls: ['./shop-card.component.scss'],
})
export class ShopCardComponent {
  @Input() public shop: IShop | null = null;

  public readonly RevisionStatus = RevisionStatus;

  public isModerator: boolean = true;

  constructor(private _utilities: UtilitiesService) {}

  public navigateToShop() {
    const shopUrl =
      urlValues.dashboard + '/' + urlValues.shop + '/' + this.shop?.shopId;

    this._utilities.navigateByUrl(shopUrl);
  }
}
