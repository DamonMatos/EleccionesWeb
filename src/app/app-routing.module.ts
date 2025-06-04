import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

import { NopagefoundComponent } from './nopagefound/nopagefound/nopagefound.component';
import { ConfiguracionRoutingModule } from './configuracion/configuracion.routing';

const routes : Routes = [

  // {
  //   path: 'configuracion',
  //   loadChildren: () => import('./configuracion/configuracion.module').then(m => m.ConfiguracionModule)
  // },

  // {
  //   path: 'dashboard',
  //   loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  // },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: NopagefoundComponent },

]

@NgModule({
  imports: [
    RouterModule.forRoot( routes ),
    PagesRoutingModule,
    ConfiguracionRoutingModule,
    AuthRoutingModule
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
