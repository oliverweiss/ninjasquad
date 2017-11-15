import { RaceModel } from './models/race.model';
import { Injectable } from '@angular/core';

@Injectable()
export class RaceService {

  constructor() { }

  list(): Array<RaceModel> {
    return [{ name: 'Lyon' }, { name: 'London' }];
  }
}
