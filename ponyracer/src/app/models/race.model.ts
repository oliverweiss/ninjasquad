import { PonyModel } from './pony.model';

export interface RaceModel {
    name: string;
    ponies: Array<PonyModel>;
    id: number;
    startInstant: string;
    status?: 'PENDING' | 'RUNNING' | 'FINISHED';
    betPonyId?: number;
}
