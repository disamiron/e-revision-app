import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopInfoComponent } from './pages/shop-info/shop-info.component';
import { dashboardTitle, urlValues } from 'src/app/shared/constants';
import { ShopRevisionComponent } from './pages/shop-revision/shop-revision.component';

const routes: Routes = [
  {
    path: '',
    component: ShopInfoComponent,
    data: {
      title: dashboardTitle.shop,
    },
  },
  {
    path: urlValues.revision,
    component: ShopRevisionComponent,
    data: {
      title: dashboardTitle.revision,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopPageRoutingModule {}
