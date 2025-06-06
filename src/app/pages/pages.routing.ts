import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { BarraComponent } from './barra/barra.component';
import { ProgressbarComponent } from './progressBar/progressbar.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AuthGuard } from '../guards/auth.guard';


const routes: Routes = [
    { 
        path: '', 
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: DashboardComponent, data: { Title:' DashBoard'} },
            { path: 'progressbar', component: ProgressbarComponent , data: { Title:' ProgressBar'} },
            { path: 'barra', component: BarraComponent, data: { Title:' Grafico Barra'} },
            { path: 'perfil', component: PerfilComponent , data: { Title:'Perfiles'}} 
        ]     
    },
    
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}
