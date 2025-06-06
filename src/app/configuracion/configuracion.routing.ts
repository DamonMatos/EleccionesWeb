import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { CandidatoComponent } from './candidato/candidato.component';
import { ElectorComponent } from './elector/elector.component';
import { ConfiguracionComponent } from './configuracion.component';
import { PlantillaComponent } from './plantilla/plantilla.component';
import { AuthGuard } from '../guards/auth.guard';
import { ProcesoComponent } from './proceso/proceso.component';


const routes: Routes = [
    { 
        path: '', 
        component: ConfiguracionComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: CandidatoComponent },
            { path: 'elector', component: ElectorComponent },
            { path: 'ajuste', component: ElectorComponent },
            { path: 'plantilla', component: PlantillaComponent },
            { path: 'candidato', component: CandidatoComponent },
            { path: 'proceso', component: ProcesoComponent },
        ]       
    },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConfiguracionRoutingModule {}
