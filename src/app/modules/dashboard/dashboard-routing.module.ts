import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopListComponent } from './pages/shop-list/shop-list.component';
import { dashboardTitle, urlValues } from 'src/app/shared/constants';
import { ShopPageComponent } from './pages/shop-page/shop-page.component';
import { ProductAllShopSearchComponent } from './pages/product-all-shop-search/product-all-shop-search.component';

const routes: Routes = [
  {
    path: '',
    component: ShopListComponent,
    data: {
      title: dashboardTitle.shopList,
    },
  },
  {
    path: `${urlValues.allShopSearch}`,
    component: ProductAllShopSearchComponent,
    data: {
      title: dashboardTitle.allShopSearch,
    },
  },
  {
    path: `${urlValues.shop}/:shopId`,
    component: ShopPageComponent,
    data: {
      title: dashboardTitle.shop,
    },
    children: [
      {
        path: '',
        loadChildren: () =>
          import(
            '../../modules/dashboard/pages/shop-page/shop-page.module'
          ).then((m) => m.ShopPageModule),
      },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
