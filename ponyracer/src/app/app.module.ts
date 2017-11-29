import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import * as Webstomp from 'webstomp-client';

import { AppComponent } from './app.component';
import { ROUTES } from './app.routes';
import { WEBSOCKET, WEBSTOMP } from './app.tokens';
import { BetComponent } from './bet/bet.component';
import { FromNowPipe } from './from-now.pipe';
import { HomeComponent } from './home/home.component';
import { JwtInterceptorService } from './jwt-interceptor.service';
import { LiveComponent } from './live/live.component';
import { LoggedInGuard } from './logged-in.guard';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { PonyComponent } from './pony/pony.component';
import { RaceResolverService } from './race-resolver.service';
import { RaceService } from './race.service';
import { RaceComponent } from './race/race.component';
import { RacesResolverService } from './races-resolver.service';
import { FinishedRacesComponent } from './races/finished-races/finished-races.component';
import { PendingRacesComponent } from './races/pending-races/pending-races.component';
import { RacesComponent } from './races/races.component';
import { RegisterComponent } from './register/register.component';
import { UserService } from './user.service';
import { WsService } from './ws.service';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    RacesComponent,
    RaceComponent,
    PonyComponent,
    FromNowPipe,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    BetComponent,
    LiveComponent,
    PendingRacesComponent,
    FinishedRacesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    RouterModule.forRoot(ROUTES),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    RaceService,
    UserService,
    JwtInterceptorService,
    {provide: HTTP_INTERCEPTORS, useExisting: JwtInterceptorService, multi: true},
    WsService,
    { provide: WEBSOCKET, useFactory: () => WebSocket },
    { provide: WEBSTOMP, useFactory: () => Webstomp },
    LoggedInGuard,
    RacesResolverService,
    RaceResolverService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
