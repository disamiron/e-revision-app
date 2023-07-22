import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopInfoComponent } from './pages/shop-info/shop-info.component';
import { dashboardTitle } from 'src/app/shared/constants';

const routes: Routes = [
  {
    path: '',
    component: ShopInfoComponent,
    data: {
      title: dashboardTitle.shop,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopPageRoutingModule {}
