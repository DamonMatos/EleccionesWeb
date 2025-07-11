import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { PagesModule } from './pages/pages.module';
import { AppComponent } from './app.component';
import { NopagefoundComponent } from './nopagefound/nopagefound/nopagefound.component';
import { ConfiguracionModule } from './configuracion/configuracion.module';
import { HttpClientModule } from '@angular/common/http'; 
import { AuthModule } from './auth/auth.module';
import { VotosComponent } from './votantes/votos/votos.component';

@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent,
    VotosComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    ConfiguracionModule,
    HttpClientModule,
    AuthModule,
    NgbNavModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

