import { Component, Input } from '@angular/core';
import { ColorMap } from '../../enums';
import { Store } from '@ngrx/store';
import { selectRevisionIsLoading } from 'src/app/data/store/selectors/revision.selectors';
import { selectUserIsLoading } from 'src/app/data/store/selectors/user.selectors';
import { selectShopIsLoading } from 'src/app/data/store/selectors/shop.selectors';

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

  @Input() public inputFor: string | null = null;

  public selectRevisionIsLoading$ = this._store.select(selectRevisionIsLoading);
  public selectUserIsLoading$ = this._store.select(selectUserIsLoading);
  public selectShopIsLoading$ = this._store.select(selectShopIsLoading);

  constructor(private _store: Store) {}
}
