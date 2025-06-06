import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { ConfiguracionComponent } from './configuracion.component';
import { CandidatoComponent } from './candidato/candidato.component';
import { ElectorComponent } from './elector/elector.component';
import { AjustesComponent } from './ajustes/ajustes.component';
import { PlantillaComponent } from './plantilla/plantilla.component';
import { ConfiguracionRoutingModule } from './configuracion.routing';
import { ProcesoComponent } from './proceso/proceso.component';
import { FormsModule } from '@angular/forms'; 

@NgModule({
  declarations: [
    CandidatoComponent,
    ElectorComponent,
    ConfiguracionComponent,
    AjustesComponent,
    PlantillaComponent,
    ProcesoComponent
  ],
  exports: [
    CandidatoComponent,
    ElectorComponent,
    ConfiguracionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ConfiguracionRoutingModule,
    FormsModule
  ]
})
export class ConfiguracionModule { }



