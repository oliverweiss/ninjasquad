import { BetComponent } from '../bet/bet.component';
import { LiveComponent } from '../live/live.component';
import { RaceResolverService } from '../race-resolver.service';
import { RacesResolverService } from '../races-resolver.service';
import { FinishedRacesComponent } from './finished-races/finished-races.component';
import { PendingRacesComponent } from './pending-races/pending-races.component';
import { RacesComponent } from './races.component';

export const RACES_ROUTES = [{
    path: '',
    component: RacesComponent,
    children: [
        {path: '', pathMatch: 'full', redirectTo: 'pending'},
        {path: 'pending', component: PendingRacesComponent, resolve: {races: RacesResolverService}},
        {path: 'finished', component: FinishedRacesComponent, resolve: {races: RacesResolverService}},
        {path: ':raceId', component: BetComponent, resolve: {race: RaceResolverService}},
        {path: ':raceId/live', component: LiveComponent, resolve: {race: RaceResolverService}},
    ]
}];

