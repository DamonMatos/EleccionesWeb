import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { PagesModule } from './pages/pages.module';
import { AppComponent } from './app.component';
import { NopagefoundComponent } from './nopagefound/nopagefound/nopagefound.component';
import { ConfiguracionModule } from './configuracion/configuracion.module';
import { HttpClientModule } from '@angular/common/http'; 
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    ConfiguracionModule,
    HttpClientModule,
    AuthModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

