import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import {register} from 'swiper/element/bundle'
import { IonicStorageModule } from '@ionic/storage-angular';

//Importamos SocketIoModule para tenerlo disponible en toda la app
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { FormsModule } from '@angular/forms';
/* import { LoginComponent } from './components/login/login.component'; */
import { NavbarComponent } from './components/navbar/navbar.component';
import { ChatBoxComponent } from './components/chat-box/chat-box.component';
import { ChatUserListComponent } from './components/chat-user-list/chat-user-list.component';

//Configuracion de SocketIo, cambiar el puerto segun necesidad.
const config: SocketIoConfig = {url: 'http://localhost:4000', options:{}};


register();

@NgModule({
  declarations: [AppComponent],
  imports: [
  BrowserModule, 
  IonicModule.forRoot(), 
  AppRoutingModule,
  HttpClientModule,
  FormsModule,
  IonicStorageModule.forRoot(),
  SocketIoModule.forRoot(config),
  ],
  providers: [{ 
    provide: RouteReuseStrategy, 
    useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
