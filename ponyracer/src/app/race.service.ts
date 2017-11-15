import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { RaceModel } from './models/race.model';
import { Injectable } from '@angular/core';

@Injectable()
export class RaceService {

  constructor() { }

  list(): Observable<Array<RaceModel>> {
    return Observable.of([
      {name: 'Lyon'},
      {name: 'Los Angeles'},
      {name: 'Sydney'},
      {name: 'Tokyo'},
      {name: 'Casablanca'}
    ]);
  }
}
