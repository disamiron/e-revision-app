import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopPageRoutingModule } from './shop-page-routing.module';
import { ShopInfoComponent } from './pages/shop-info/shop-info.component';
import { ShopPageComponent } from './shop-page.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ShopPageComponent, ShopInfoComponent],
  imports: [CommonModule, ShopPageRoutingModule, SharedModule],
})
export class ShopPageModule {}
