import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopListComponent } from './pages/shop-list/shop-list.component';
import { dashboardTitle } from 'src/app/shared/constants';

const routes: Routes = [
  {
    path: '',
    component: ShopListComponent,
    data: {
      title: dashboardTitle.shopList,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
