import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { RaceModel } from './models/race.model';
import { Injectable } from '@angular/core';

@Injectable()
export class RaceService {
  constructor(private httpClient: HttpClient) { }

  list(): Observable<Array<RaceModel>> {
    return this.httpClient
    .get<Array<RaceModel>>('http://ponyracer.ninja-squad.com/api/races', {params: {status: 'PENDING'}});
  }
}
