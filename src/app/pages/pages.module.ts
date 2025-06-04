import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { BarraComponent } from './barra/barra.component';
import { ProgressbarComponent } from './progressBar/progressbar.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PagesRoutingModule } from './pages.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'; 

@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    BarraComponent,
    ProgressbarComponent,
    PerfilComponent
  ],
  exports: [
    DashboardComponent,
    PagesComponent,
    BarraComponent,
    ProgressbarComponent,
    PerfilComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PagesModule { }
