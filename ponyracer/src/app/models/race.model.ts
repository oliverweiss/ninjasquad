import { RaceModel } from './race.model';
import { PonyModel } from './pony.model';

export interface RaceModel {
    name: string;
    ponies: Array<PonyModel>;
    id: number;
    startInstant: string;
    status?: RaceStatus;
    betPonyId?: number;
}

export type RaceStatus = 'PENDING' | 'RUNNING' | 'FINISHED';
