import { RaceService } from '../race.service';
import { RaceModel } from '../models/race.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pr-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.css']
})
export class RacesComponent implements OnInit {
  races: Array<RaceModel>;

  constructor(private raceService: RaceService) { }

  ngOnInit() {
    this.races = this.raceService.list();
  }

}
