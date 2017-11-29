import { RaceService } from './race.service';
import { Observable } from 'rxjs/Observable';
import { Error } from 'tslint/lib/error';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { RaceModel } from './models/race.model';

@Injectable()
export class RaceResolverService implements Resolve<RaceModel> {

  constructor(private raceService: RaceService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): RaceModel | Observable<RaceModel> | Promise<RaceModel> {
    return this.raceService.get(+route.paramMap.get('raceId'));
  }

}
