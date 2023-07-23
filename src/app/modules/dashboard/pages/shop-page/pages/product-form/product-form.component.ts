import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { Observable, filter, forkJoin, take } from 'rxjs';
import { setPrevLocationData } from 'src/app/data/store/actions/location.actions';
import { selectRevisionCurrentProduct } from 'src/app/data/store/selectors/revision.selectors';
import { selectCurrentShopId } from 'src/app/data/store/selectors/shop.selectors';
import { selectCurrentUserWithoutRights } from 'src/app/data/store/selectors/user.selectors';
import { urlValues } from 'src/app/shared/constants';
import { IProduct } from 'src/app/shared/interfaces';
import { ConfirmComponent } from 'src/app/shared/modals/confirm/confirm.component';
import { RevisionService } from 'src/app/shared/services/revision/revision.service';
import { UtilitiesService } from 'src/app/shared/services/utilities/utilities.service';

@UntilDestroy()
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit, AfterViewInit {
  private _currentProduct$: Observable<IProduct | null> = this._store.select(
    selectRevisionCurrentProduct
  );
  private _shopId$: Observable<string | undefined> =
    this._store.select(selectCurrentShopId);

  private _shopId: string | null = null;

  private _currentUserWithoutRights$: Observable<boolean | undefined> =
    this._store.select(selectCurrentUserWithoutRights);
  public currentUserWithoutRights: boolean = true;

  public isEditMode: boolean = this._activatedRoute.snapshot.data?.isEditMode;
  public isViewMode: boolean = this._activatedRoute.snapshot.data?.isViewMode;

  @ViewChild('quantityInput', { static: false }) quantityInput:
    | ElementRef
    | undefined;

  public productForm: FormGroup = this._fb.group({
    productId: [null],
    localCode: [null],
    quantity: [null],
    productName: [null],
    price: [null],
    scannedQuantity: [null, Validators.required],
    createdQuantity: [null, Validators.required],
    shippedQuantity: [null],
    unitsPerPack: [null],
  });

  constructor(
    private _fb: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _utilities: UtilitiesService,
    private _store: Store,
    private _cdr: ChangeDetectorRef,
    private _dialog: MatDialog,
    private _revistion: RevisionService
  ) {}

  public ngOnInit(): void {
    this._currentUserWithoutRights$.pipe(take(1)).subscribe((v) => {
      this.currentUserWithoutRights = Boolean(v);
    });

    forkJoin([this._shopId$.pipe(take(1)), this._currentProduct$.pipe(take(1))])
      .pipe(untilDestroyed(this))
      .subscribe(
        ([shopId, currentProduct]: [string | undefined, IProduct | null]) => {
          if (shopId) {
            this._shopId = shopId;
            if (currentProduct) {
              this.productForm.patchValue({
                localCode: currentProduct?.localCode,
                price: currentProduct?.price,
                productName: currentProduct?.description,
                quantity: currentProduct?.quantity,
                scannedQuantity: currentProduct?.scannedQuantity,
                unitsPerPack: currentProduct?.unitsPerPack,
                shippedQuantity: currentProduct?.shippedQuantity,
              });

              this.productForm.controls.localCode.disable();
              this.productForm.controls.price.disable();
              this.productForm.controls.productName.disable();
              this.productForm.controls.quantity.disable();
              this.productForm.controls.unitsPerPack.disable();
              this.productForm.controls.shippedQuantity.disable();

              if (!this.isEditMode) {
                this.productForm.controls.scannedQuantity.disable();
                this._store.dispatch(
                  setPrevLocationData({
                    prevLocaction: this.isViewMode
                      ? urlValues.dashboard +
                        '/' +
                        urlValues.shop +
                        '/' +
                        shopId +
                        '/' +
                        urlValues.revision +
                        '/' +
                        urlValues.scan
                      : urlValues.dashboard +
                        '/' +
                        urlValues.shop +
                        '/' +
                        shopId +
                        '/' +
                        urlValues.revision +
                        '/' +
                        urlValues.scan,
                  })
                );
              } else {
                this._store.dispatch(
                  setPrevLocationData({
                    prevLocaction:
                      urlValues.dashboard +
                      '/' +
                      urlValues.shop +
                      '/' +
                      shopId +
                      '/' +
                      urlValues.revision +
                      '/' +
                      urlValues.scan,
                  })
                );

                this.productForm.patchValue({
                  localCode: currentProduct?.localCode,
                  productName: currentProduct?.description,
                  quantity: currentProduct?.quantity,
                  createdQuantity: currentProduct?.scannedQuantity,
                });
              }
            } else {
              this._utilities.navigateByUrl(
                urlValues.dashboard + '/' + urlValues.revision + '/' + shopId
              );
            }
          } else {
            this._utilities.navigateByUrl(urlValues.dashboard);
          }
        }
      );
  }

  public ngAfterViewInit(): void {
    this.quantityInput?.nativeElement.focus();
    this._cdr.detectChanges();
  }

  public sumbit() {
    this._currentProduct$.pipe(take(1)).subscribe((product) => {
      let warning =
        +product?.quantity! - +product?.scannedQuantity! <
        +this.productForm.value.createdQuantity;
      if (warning) {
        this._warning();

        return;
      }
      this._confirmSubmit();
    });
  }

  private _warning() {
    this._dialog
      .open(ConfirmComponent, {
        data: {
          title: 'Введенное кол-во превышает кол-во на складе, вы уверены?',
        },
      })
      .afterClosed()
      .pipe(filter((v) => v === 'confirm'))
      .subscribe(() => {
        this._confirmSubmit();
      });
  }

  private _confirmSubmit() {
    this._currentProduct$.pipe(take(1)).subscribe((product) => {
      let modProduct = this.isEditMode
        ? {
            scannedProductId: product?.scannedProductId,
            quantity: this.productForm.value.createdQuantity,
          }
        : {
            revisionId: product?.revisionId,
            barcode: product?.barcode,
            localCode: product?.localCode,
            price: product?.price,
            quantity: product?.quantity,
            description: product?.description,
            scannedQuantity: this.productForm.value.createdQuantity,
            unitsPerPack: product?.unitsPerPack,
            shippedQuantity: product?.shippedQuantity,
          };

      if (!this.isEditMode) {
        this._revistion
          .saveProduct(this._shopId!, modProduct)
          .pipe(untilDestroyed(this))
          .subscribe(() => {
            this._utilities.snackBarMessage(
              'Товар добавлен. Изменения сохранены.',
              600
            );

            this._utilities.announceTheNumber(
              this.productForm.value.createdQuantity
            );

            this._utilities.navigateByUrl(
              urlValues.dashboard +
                '/' +
                urlValues.shop +
                '/' +
                this._shopId +
                '/' +
                urlValues.revision +
                '/' +
                urlValues.scan
            );
          });
      } else {
        this._revistion
          .editProduct(this._shopId!, modProduct)
          .pipe(untilDestroyed(this))
          .subscribe(() => {
            this._utilities.snackBarMessage(
              'Значения изменены и сохранены.',
              600
            );

            this._utilities.navigateByUrl(
              urlValues.dashboard +
                '/' +
                urlValues.shop +
                '/' +
                this._shopId +
                '/' +
                urlValues.revision +
                '/' +
                urlValues.scan
            );
          });
      }
    });
  }
}
