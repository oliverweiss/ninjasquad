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
    this.raceModel = this.route.snapshot.data['race'];
  }

  betOnPony(pony: PonyModel) {
    if (this.isPonySelected(pony)) {
      this.raceService.cancelBet(this.raceModel.id)
      .subscribe(
        _ => { this.raceModel.betPonyId = null; },
        err => { this.betFailed = true; }
      );
    } else {
      this.raceService.bet(this.raceModel.id, pony.id)
        .subscribe(
          race => this.raceModel = race,
          err => { this.betFailed = true; });
      }
  }

  isPonySelected(pony: PonyModel): Boolean {
    return this.raceModel.betPonyId && this.raceModel.betPonyId === pony.id;
  }
}
