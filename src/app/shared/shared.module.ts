import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MaterialModule } from './material/material.module';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [],
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    NgxMaskModule.forRoot(),
  ],
  exports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NgxMaskModule,
  ],
})
export class SharedModule {}
