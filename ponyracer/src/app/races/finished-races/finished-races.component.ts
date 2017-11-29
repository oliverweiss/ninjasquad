import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

import { RaceModel } from '../../models/race.model';

@Component({
  selector: 'pr-finished-races',
  templateUrl: './finished-races.component.html',
  styleUrls: ['./finished-races.component.css']
})
export class FinishedRacesComponent implements OnInit {
  races: Array<RaceModel>;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.races = this.route.snapshot.data['races'];
  }

}
