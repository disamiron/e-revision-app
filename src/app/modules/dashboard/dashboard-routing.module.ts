import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopListComponent } from './pages/shop-list/shop-list.component';
import { dashboardTitle, urlValues } from 'src/app/shared/constants';
import { ShopPageComponent } from './pages/shop-page/shop-page.component';

const routes: Routes = [
  {
    path: '',
    component: ShopListComponent,
    data: {
      title: dashboardTitle.shopList,
    },
  },
  {
    path: 'shop/:shopId',
    component: ShopPageComponent,
    data: {
      title: dashboardTitle.shop,
    },
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
