import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BetComponent } from '../bet/bet.component';
import { FromNowPipe } from '../from-now.pipe';
import { LiveComponent } from '../live/live.component';
import { PonyComponent } from '../pony/pony.component';
import { RaceResolverService } from '../race-resolver.service';
import { RaceService } from '../race.service';
import { RaceComponent } from '../race/race.component';
import { RacesResolverService } from '../races-resolver.service';
import { FinishedRacesComponent } from './finished-races/finished-races.component';
import { PendingRacesComponent } from './pending-races/pending-races.component';
import { RacesComponent } from './races.component';
import { RACES_ROUTES } from './races.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(RACES_ROUTES)
  ],
  declarations: [
    RacesComponent,
    RaceComponent,
    PendingRacesComponent,
    FinishedRacesComponent,
    PonyComponent,
    BetComponent,
    LiveComponent,
    FromNowPipe,
  ],
  providers: [
    RaceService,
    RacesResolverService,
    RaceResolverService,
  ]
})
export class RacesModule { }
