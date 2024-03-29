import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormComponent } from './pages/form/form.component';
import { FormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage-angular';
import { ListEmergenciasComponent } from './pages/list-emergencias/list-emergencias.component';
@NgModule({
  declarations: 
  [AppComponent,
    FormComponent,
    ListEmergenciasComponent
  ],
  imports: 
  [
    BrowserModule,
    IonicModule.forRoot(),
    FormsModule,
    IonicStorageModule.forRoot(),
    AppRoutingModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
