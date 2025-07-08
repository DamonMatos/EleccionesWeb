import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { ConfiguracionComponent } from './configuracion.component';
import { CandidatoComponent } from './candidato/candidato.component';
import { ElectorComponent } from './elector/elector.component';
import { PlantillaComponent } from './plantilla/plantilla.component';
import { ConfiguracionRoutingModule } from './configuracion.routing';
import { ProcesoComponent } from './proceso/proceso.component';
import { FormsModule } from '@angular/forms'; 
import { ColaboradorComponent } from './colaborador/colaborador.component';


@NgModule({
  declarations: [
    CandidatoComponent,
    ElectorComponent,
    ConfiguracionComponent,
    ColaboradorComponent,
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
    FormsModule,
    NgbNavModule
  ]
})
export class ConfiguracionModule { }



