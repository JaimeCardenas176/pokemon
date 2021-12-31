import { Command } from "./command";

export class Turn {
    pokemon1command: Command;
    pokemon2command: Command;

    constructor(pokemon1command: Command, pokemon2command: Command){
        this.pokemon1command=pokemon1command;
        this.pokemon2command=pokemon2command;
    }

    canStart(): boolean{
        return this.pokemon1command !== undefined
                && this.pokemon2command !== undefined;
    }
}