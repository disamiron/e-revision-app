import { Component, Input } from '@angular/core';
import { IProduct } from '../../interfaces';
import { Store } from '@ngrx/store';
import { goToEditingProduct } from 'src/app/data/store/actions/revision.actions';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product: IProduct | undefined;

  @Input() shopId: string | undefined;

  @Input() currentUserWithoutRights: boolean = true;

  public userId: string | undefined;

  constructor(private _store: Store) {}

  public editProduct() {
    this._store.dispatch(
      goToEditingProduct({ product: this.product!, shopId: this.shopId! })
    );
  }
}
