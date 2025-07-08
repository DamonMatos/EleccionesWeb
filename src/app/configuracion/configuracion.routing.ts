import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { CandidatoComponent } from './candidato/candidato.component';
import { ElectorComponent } from './elector/elector.component';
import { ConfiguracionComponent } from './configuracion.component';
import { PlantillaComponent } from './plantilla/plantilla.component';
import { AuthGuard } from '../guards/auth.guard';
import { ProcesoComponent } from './proceso/proceso.component';
import { ColaboradorComponent } from './colaborador/colaborador.component';


const routes: Routes = [
    { 
        path: '', 
        component: ConfiguracionComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: ProcesoComponent },
            { path: 'proceso', component: ProcesoComponent },
            { path: 'elector', component: ElectorComponent },
            { path: 'colaborador', component: ColaboradorComponent },
            { path: 'plantilla', component: PlantillaComponent },
            { path: 'candidato', component: CandidatoComponent },          
        ]       
    },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConfiguracionRoutingModule {}
