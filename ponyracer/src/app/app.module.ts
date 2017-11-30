import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PreloadAllModules, RouterModule } from '@angular/router';
import * as Webstomp from 'webstomp-client';

import { AppComponent } from './app.component';
import { ROUTES } from './app.routes';
import { WEBSOCKET, WEBSTOMP } from './app.tokens';
import { HomeComponent } from './home/home.component';
import { JwtInterceptorService } from './jwt-interceptor.service';
import { LoggedInGuard } from './logged-in.guard';
import { MenuComponent } from './menu/menu.component';
import { UserService } from './user.service';
import { WsService } from './ws.service';


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES, {preloadingStrategy: PreloadAllModules })
  ],
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
  ],
  providers: [
    UserService,
    JwtInterceptorService,
    {provide: HTTP_INTERCEPTORS, useExisting: JwtInterceptorService, multi: true},
    WsService,
    { provide: WEBSOCKET, useFactory: () => WebSocket },
    { provide: WEBSTOMP, useFactory: () => Webstomp },
    LoggedInGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
