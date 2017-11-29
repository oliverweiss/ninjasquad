import { WsService } from './ws.service';
import { PonyModel, PonyWithPositionModel } from './models/pony.model';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeWhile';

import { RaceModel, RaceStatus } from './models/race.model';
import { Injectable } from '@angular/core';


@Injectable()
export class RaceService {
  constructor(private httpClient: HttpClient, private wsService: WsService) { }

  list(status: RaceStatus): Observable<Array<RaceModel>> {
    return this.httpClient
      .get<Array<RaceModel>>(`${environment.baseUrl}/api/races`, { params: { status } });
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
    return this.wsService.connect(`/race/${raceId}`)
      .takeWhile(race => race.status !== 'FINISHED')
      .map(race => race.ponies);
  }

  boost(raceId: number, ponyId: number ): Observable<void> {
    return this.httpClient
      .post<void>(`${environment.baseUrl}/api/races/${raceId}/boosts`, { ponyId });

  }
}
