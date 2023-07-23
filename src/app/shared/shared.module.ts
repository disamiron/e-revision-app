import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MaterialModule } from './material/material.module';
import { NgxMaskModule } from 'ngx-mask';
import { ShopCardComponent } from './components/shop-card/shop-card.component';
import { GridButtonComponent } from './components/grid-button/grid-button.component';
import { ConfirmComponent } from './modals/confirm/confirm.component';

@NgModule({
  declarations: [ShopCardComponent, GridButtonComponent, ConfirmComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    NgxMaskModule.forRoot(),
  ],
  exports: [
    ShopCardComponent,
    GridButtonComponent,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NgxMaskModule,
    ConfirmComponent,
  ],
})
export class SharedModule {}
