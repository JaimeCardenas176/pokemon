import { MovementCategory as category } from "../utils/movCategory";

export class Movement {
    name: string;
    
    //power points
    pp: number;
    
    //percentage
    accuracy: number;
    
    type: string;

    power: number;

    //percentage
    critical: number;

    //0 IF NO, OTHER number, map
    sideEffect?: number;

    //special or fisic
    category: category;

    constructor(name: string, pp: number, type: string, category: category, critical?: number, accuracy?: number, power?: number, sideEffect?: number) {
        this.name=name;
        this.pp=pp;
        this.type=type;
        this.category=category;
        this.accuracy=accuracy ?? 100;
        this.power=power ?? 0;
        this.critical=critical ?? 0;
        this.sideEffect=sideEffect ?? 0;
    }

}

