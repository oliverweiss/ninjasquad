import { PonyModel, PonyWithPositionModel } from './models/pony.model';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { RaceModel } from './models/race.model';
import { Injectable } from '@angular/core';


const staticRace: Array<PonyModel> = [
 {id: 1, name: 'Superb Runner', color: 'BLUE' },
 { id: 2, name: 'Awesome Fridge', color: 'GREEN' },
 { id: 3, name: 'Great Bottle', color: 'ORANGE' },
 { id: 4, name: 'Little Flower', color: 'YELLOW' },
 { id: 5, name: 'Nice Rock', color: 'PURPLE'},
];

@Injectable()
export class RaceService {
  constructor(private httpClient: HttpClient) { }

  list(): Observable<Array<RaceModel>> {
    return this.httpClient
      .get<Array<RaceModel>>(`${environment.baseUrl}/api/races`, {params: {status: 'PENDING'}});
  }

  get(raceId: number): Observable<RaceModel> {
    return this.httpClient.get<RaceModel>(`${environment.baseUrl}/api/races/${raceId}`);
  }

  bet(raceId: number, ponyId: number): Observable<RaceModel> {
    return this.httpClient
      .post<RaceModel>(`${environment.baseUrl}/api/races/${raceId}/bets`, { ponyId });
  }

  cancelBet(raceId: number): Observable<void> {
    return this.httpClient
      .delete<void>(`${environment.baseUrl}/api/races/${raceId}/bets`);
  }

  live(raceId: number): Observable<Array<PonyWithPositionModel>> {
    return Observable.interval(1000)
      .take(101)
      .map(position => staticRace
        .map(pony => ({...pony, position: position % 101})));
  }
}
