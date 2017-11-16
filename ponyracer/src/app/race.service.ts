import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { RaceModel } from './models/race.model';
import { Injectable } from '@angular/core';

const BASE_URL = 'http://ponyracer.ninja-squad.com/api';

@Injectable()
export class RaceService {
  constructor(private httpClient: HttpClient) { }

  list(): Observable<Array<RaceModel>> {
    return this.httpClient
    .get<Array<RaceModel>>(`${BASE_URL}/races`, {params: {status: 'PENDING'}});
  }
}
