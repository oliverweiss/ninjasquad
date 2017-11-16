import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { RacesComponent } from './races/races.component';

export const ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'races', component: RacesComponent },
    { path: 'register', component: RegisterComponent },
];
