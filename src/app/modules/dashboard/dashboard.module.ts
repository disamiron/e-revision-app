import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ShopListComponent } from './pages/shop-list/shop-list.component';
import { ShopPageComponent } from './pages/shop-page/shop-page.component';

@NgModule({
  declarations: [DashboardComponent, ShopListComponent, ShopPageComponent],
  imports: [CommonModule, DashboardRoutingModule, SharedModule],
})
export class DashboardModule {}
