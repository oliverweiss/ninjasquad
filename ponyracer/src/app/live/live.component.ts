import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { PonyModel, PonyWithPositionModel } from '../models/pony.model';
import { RaceModel } from '../models/race.model';
import { RaceService } from '../race.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/groupBy';
import 'rxjs/add/operator/bufferToggle';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/catch';

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
  clickSubject: Subject<PonyWithPositionModel> = new Subject<PonyWithPositionModel>();

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

    this.clickSubject
      .groupBy(pony => pony.id, pony => pony.id)  // Split the clicks by ponyId
      .mergeMap(ponyStream => ponyStream
        // Create a stream of buffers containing all clicks for a pony that occured in the last second
        .bufferToggle(ponyStream, () => Observable.interval(1000))
        .filter(ponyIds => ponyIds.length >= 5) // Exclude the buffers of less than 5 clicks
        .throttleTime(1000)) // Stop listening for 1 sec after an event has occured to avoid multi boost
      .map(ponyIds => ponyIds[0]) // Retrieve ponyId
      .switchMap(ponyId => this.raceService
        .boost(this.raceModel.id, ponyId) // Boost the pony
        .catch(err => Observable.empty())) // Handle network error on boost
      .subscribe(() => {}); // Trigger the network call
  }

  ngOnDestroy() {
    if (this.positionSubscription) {
      this.positionSubscription.unsubscribe();
    }
  }

  onClick(pony: PonyWithPositionModel) {
    this.clickSubject.next(pony);
  }

  ponyById(index: number, pony: PonyWithPositionModel): number {
    return pony && pony.id;
  }

}
