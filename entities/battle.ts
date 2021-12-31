import { Command } from "./command";
import { Movement } from "./movement";
import { Pokemon } from "./pokemon";
import { Turn } from "./turn";

export class Battle {
    pokemon1: Pokemon;
    pokemon2:  Pokemon;
    turns: number;

    constructor(pokemon1: Pokemon, pokemon2: Pokemon){
        this.pokemon1=pokemon1;
        this.pokemon2=pokemon2;
        this.turns=0;
    }

    isFinished(){
        let finished = (this.pokemon1.currentHp <= 0 || this.pokemon2.currentHp <=0)
        if (finished)
            this.showWinner()

        return finished;
    }
    
    showWinner(){
        let winner: Pokemon = (this.pokemon1.currentHp>0) ? this.pokemon1 : this.pokemon2;
        this.pokemon2.currentHp = 0;
        console.log(`${winner.name} won the battle in ${this.turns}`);       
    }

    showBattleStatus(){
        const pk1name = this.pokemon1.name;
        const pk2name = this.pokemon2.name;
        console.log(`${pk1name}'s remaining hp -> (${this.pokemon1.currentHp}/${this.pokemon1.stats[0]})`);
        console.log(`${pk2name}'s remaining hp -> (${this.pokemon2.currentHp}/${this.pokemon2.stats[0]})`);
        console.log('turn', this.turns);
    }

    executeTurn(turn: Turn){
        let cmd1: Command = turn.pokemon1command;
        let cmd2: Command = turn.pokemon2command
        let attack1: Movement; 
        let attack2: Movement;
        
        if('DO_ATTACK' in cmd1.action){
            attack1 = this.pokemon1.movements[cmd1.action['DO_ATTACK']];
        }
        if('DO_ATTACK' in cmd2.action){
            attack2 = this.pokemon2.movements[cmd2.action['DO_ATTACK']];
        }
        console.log(`${this.pokemon1.name}'s use  ${attack1.name}`);
        console.log(`${this.pokemon2.name}'s use  ${attack2.name}`);


        this.pokemon2.currentHp -= attack1.power;
        this.pokemon1.currentHp -= attack2.power;

        if(this.pokemon1.currentHp<0) this.pokemon1.currentHp=0;
        if(this.pokemon2.currentHp<0) this.pokemon2.currentHp=0;

        this.turns++;
    }

}