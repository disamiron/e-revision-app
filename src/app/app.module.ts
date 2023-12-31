import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './modules/auth/auth.component';

import { SharedModule } from './shared/shared.module';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers } from './data/store/reducers';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { UserEffects } from './data/store/effects/user.effects';
import { StorageService } from './shared/services/storage/storage.service';
import { StorageType } from './shared/services/storage/storage.type';
import { loginSuccess } from './data/store/actions/user.actions';
import { IUser } from './shared/interfaces';
import { LocationEffects } from './data/store/effects/location.effects';
import { ShopEffects } from './data/store/effects/shop.effects';
import { RevisionEffects } from './data/store/effects/revision.effects';
import { setCurrentPlatformData } from './data/store/actions/platform.actions';
import { Capacitor } from '@capacitor/core';

@NgModule({
  declarations: [AppComponent, AuthComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    EffectsModule.forRoot([
      UserEffects,
      LocationEffects,
      ShopEffects,
      RevisionEffects,
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (store: Store, storage: StorageService) => {
        return () => {
          store.dispatch(
            setCurrentPlatformData({ platform: Capacitor.getPlatform() })
          );

          let user = storage.getItem(StorageType.User);

          if (user) {
            store.dispatch(
              loginSuccess({ user: user as IUser, isAppInit: true })
            );
          }

          storage.setItem(StorageType.Notification, {
            manualEntryOnly: true,
          });

          let volume = storage.getItem(StorageType.Volume);
          if (volume === null) {
            storage.setItem(StorageType.Volume, {
              noSound: false,
              noVibration: false,
              noTextToSpeech: false,
            });
          }
          let shippedSwitch = storage.getItem(StorageType.ShippedSwitch);
          if (shippedSwitch === null) {
            storage.setItem(StorageType.ShippedSwitch, false);
          }
        };
      },
      multi: true,
      deps: [Store, StorageService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
