import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { urlValues } from './shared/constants';
import { AuthComponent } from './modules/auth/auth.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: urlValues.auth,
    component: AuthComponent,
    data: {
      title: 'Добро пожаловать',
    },
  },
  {
    path: urlValues.dashboard,
    component: DashboardComponent,
    data: {
      title: 'Приложение',
    },
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  { path: '**', redirectTo: urlValues.auth, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
