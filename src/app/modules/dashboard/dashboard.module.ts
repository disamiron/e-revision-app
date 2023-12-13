import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ShopListComponent } from './pages/shop-list/shop-list.component';
import { ProductAllShopSearchComponent } from './pages/product-all-shop-search/product-all-shop-search.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ShopListComponent,
    ProductAllShopSearchComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule, SharedModule],
})
export class DashboardModule {}
