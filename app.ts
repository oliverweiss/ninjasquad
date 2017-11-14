import { Pony } from './pony';
import { Race } from './race';

const tornado = new Pony("red");
const petit_tonerre = new Pony("blue");

const race = new Race("Lyon");
race.addPony(tornado);
race.addPony(petit_tonerre);

console.log(race.toString());