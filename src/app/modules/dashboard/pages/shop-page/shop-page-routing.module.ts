import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopInfoComponent } from './pages/shop-info/shop-info.component';
import { dashboardTitle, urlValues } from 'src/app/shared/constants';
import { ShopRevisionComponent } from './pages/shop-revision/shop-revision.component';
import { BarcodeScannerComponent } from './pages/barcode-scanner/barcode-scanner.component';
import { ProductFormComponent } from './pages/product-form/product-form.component';
import { ProductSearchComponent } from './pages/product-search/product-search.component';

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
  {
    path: `${urlValues.revision}/${urlValues.scan}`,
    component: BarcodeScannerComponent,
    data: {
      title: dashboardTitle.scan,
      isShopSearch: false,
    },
  },
  {
    path: `${urlValues.revision}/${urlValues.product}/:productId`,
    component: ProductFormComponent,
    data: {
      title: dashboardTitle.product,
      isEditMode: false,
      isViewMode: false,
    },
  },
  {
    path: `${urlValues.revision}/${urlValues.product}/:productId/${urlValues.edit}`,
    component: ProductFormComponent,
    data: {
      title: dashboardTitle.editProduct,
      isEditMode: true,
      isViewMode: false,
    },
  },
  {
    path: `${urlValues.revision}/${urlValues.search}`,
    component: ProductSearchComponent,
    data: {
      title: dashboardTitle.search,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopPageRoutingModule {}
