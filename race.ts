import { Pony } from './pony';

export class Race {
    ponies: Array<Pony>;

    constructor(public name: string) {
        this.ponies = [];
    }

    addPony(pony: Pony){
        this.ponies.push(pony);
    }

    toString() {
        return `${this.name}: ${this.ponies.map(p => p.toString()).join(", ")}`;
    }
}