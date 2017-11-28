import { LiveComponent } from './live/live.component';
import { BetComponent } from './bet/bet.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { RacesComponent } from './races/races.component';

export const ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'races',
      children: [
          {path: '', component: RacesComponent},
          {path: ':raceId', component: BetComponent},
          {path: ':raceId/live', component: LiveComponent},
        ],
    },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
];
