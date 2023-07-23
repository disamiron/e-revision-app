import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopPageRoutingModule } from './shop-page-routing.module';
import { ShopInfoComponent } from './pages/shop-info/shop-info.component';
import { ShopPageComponent } from './shop-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ShopRevisionComponent } from './pages/shop-revision/shop-revision.component';
import { BarcodeScannerComponent } from './pages/barcode-scanner/barcode-scanner.component';
import { ProductFormComponent } from './pages/product-form/product-form.component';
import { ProductSearchComponent } from './pages/product-search/product-search.component';

@NgModule({
  declarations: [ShopPageComponent, ShopInfoComponent, ShopRevisionComponent, BarcodeScannerComponent, ProductFormComponent, ProductSearchComponent],
  imports: [CommonModule, ShopPageRoutingModule, SharedModule],
})
export class ShopPageModule {}
