import { TYPE } from "../utils/types";
import { Movement } from "./movement";

export class Pokemon {
    name: string;
    level: number;
    type1: string;
    type2?: string;
    stats: number[];//hp at sta df sdf spd
    movements: Movement[];
    status: number;
    currentHp: number;
    nature: number;

    constructor(name: string, level: number, type1: string, stats: number[], movements: Movement[], status: number, currentHp: number, nature: number, type2?: string ){
        this.name=name;
        this.level=level;
        this.type1=type1;
        this.stats=stats;
        this.movements=movements;
        this.status=status;
        this.currentHp=currentHp;
        this.nature=nature;
        this.type2=type2;
    }

}