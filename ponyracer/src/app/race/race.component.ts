import { selector } from 'rxjs/operator/publish';
import { RaceModel } from '../models/race.model';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'pr-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.css']
})
export class RaceComponent implements OnInit {
  @Input() raceModel: RaceModel;
  @Input() canBet = true;

  constructor() { }

  ngOnInit() {
  }
}
