import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ElencoComponent } from './elenco.component';
import { HttpClientModule } from '@angular/common/http';
//import { NgxSpinnerModule } from 'ngx-spinner';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent, 
    ElencoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    //NgxSpinnerModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
