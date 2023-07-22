import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MaterialModule } from './material/material.module';
import { NgxMaskModule } from 'ngx-mask';
import { ShopCardComponent } from './components/shop-card/shop-card.component';

@NgModule({
  declarations: [ShopCardComponent],
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
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NgxMaskModule,
  ],
})
export class SharedModule {}
