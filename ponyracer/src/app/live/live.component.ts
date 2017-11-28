import { Subscription } from 'rxjs/Subscription';
import { PonyWithPositionModel } from '../models/pony.model';
import { RaceModel } from '../models/race.model';
import { RaceService } from '../race.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'pr-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent implements OnInit, OnDestroy {
  raceModel: RaceModel;
  poniesWithPosition: Array<PonyWithPositionModel> = [];
  positionSubscription: Subscription;
  error = false;
  winners: Array<PonyWithPositionModel>;
  betWon: Boolean;

  constructor(private raceService: RaceService, private route: ActivatedRoute) { }

  ngOnInit() {
    const raceId = +this.route.snapshot.paramMap.get('raceId');
    this.positionSubscription =
      this.raceService.get(raceId)
        .do(race => { this.raceModel = race; })
        .filter(race => race.status !== 'FINISHED')
        .switchMap(race => this.raceService.live(race.id))
        .subscribe(
          ponies => {
            this.poniesWithPosition = ponies;
            this.raceModel.status = 'RUNNING';
          },
          error => { this.error = true; },
          () => {
            this.raceModel.status = 'FINISHED';
            this.winners = this.poniesWithPosition.filter(pony => pony.position >= 100);
            this.betWon = this.winners.some(winner => winner.id === this.raceModel.betPonyId);
          });
  }

  ngOnDestroy() {
    if (this.positionSubscription) {
      this.positionSubscription.unsubscribe();
    }
  }

}
