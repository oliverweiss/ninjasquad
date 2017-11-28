import { environment } from '../environments/environment';
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
      .get<Array<RaceModel>>(`${environment.baseUrl}/api/races`, {params: {status: 'PENDING'}});
  }

  get(raceId: number): Observable<RaceModel> {
    return this.httpClient.get<RaceModel>(`${environment.baseUrl}/api/races/${raceId}`);
  }

  bet(raceId: number, ponyId: number): Observable<RaceModel> {
    return this.httpClient
      .post<RaceModel>(`${environment.baseUrl}/api/races/${raceId}/bets`, { ponyId });
  }

  cancelBet(raceId): Observable<void> {
    return this.httpClient
      .delete<void>(`${environment.baseUrl}/api/races/${raceId}/bets`);
  }
}
