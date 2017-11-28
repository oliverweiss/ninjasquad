import { PonyModel } from '../models/pony.model';
import { RaceModel } from '../models/race.model';
import { RaceService } from '../race.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pr-bet',
  templateUrl: './bet.component.html',
  styleUrls: ['./bet.component.css']
})
export class BetComponent implements OnInit {
  raceModel: RaceModel;
  betFailed: Boolean = false;

  constructor(private route: ActivatedRoute, private raceService: RaceService) { }

  ngOnInit() {
    const raceId = +this.route.snapshot.paramMap.get('raceId');
    this.raceService.get(raceId)
      .subscribe(race => this.raceModel = race);
  }

  betOnPony(pony: PonyModel) {
    this.raceService.bet(this.raceModel.id, pony.id)
      .subscribe(
        race => this.raceModel = race,
        err => { this.betFailed = true; });
  }

  isPonySelected(pony: PonyModel): Boolean {
    return this.raceModel.betPonyId && this.raceModel.betPonyId === pony.id;
  }
}
