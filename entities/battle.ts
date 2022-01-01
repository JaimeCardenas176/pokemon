import { MovementCategory as category } from "../utils/movCategory";
import { Command } from "./command";
import { Movement } from "./movement";
import { Pokemon } from "./pokemon";
import { Turn } from "./turn";
import { getPokemonTypes } from "../utils/utilities";
import { TYPE } from "../utils/types"
import { TYPES_TABLE } from "../utils/typesTable";

const MIN_VARIATION = 85;
const MAX_VARIATION = 100;
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


        this.pokemon2.currentHp -= calculateDamage(this.pokemon1, attack1, this.pokemon2);
        this.pokemon1.currentHp -= calculateDamage(this.pokemon2, attack1, this.pokemon1);


        if(this.pokemon1.currentHp<0) this.pokemon1.currentHp=0;
        if(this.pokemon2.currentHp<0) this.pokemon2.currentHp=0;

        this.turns++;
    }

}

function calculateDamage(pokemon1: Pokemon, pokemon1Attack: Movement, pokemon2: Pokemon): number{
    const LEVEL: number = pokemon1.level;
    const ATTACK: number = (pokemon1Attack.category === category.SEPECIAL) ? pokemon1.stats[3] : pokemon1.stats[1];
    const POWER: number = pokemon1Attack.power;
    const DEFENSE: number = (pokemon1Attack.category === category.SEPECIAL) ? pokemon2.stats[4] : pokemon2.stats[2];
    const BONUS: number = calculateSTAB(pokemon1, pokemon1Attack);
    const EFECTIVITY: number = calculcateEfectivity(pokemon1Attack, pokemon2);
    const VARIATION: number = Random(MIN_VARIATION, MAX_VARIATION);

    let damage: number = Math.floor((0.01 * BONUS * EFECTIVITY * VARIATION)*((((0.02 * LEVEL +1) * ATTACK * POWER)/25*DEFENSE)+2));
    console.log(damage);
    
    return damage;
}

function calculateSTAB(pokemon: Pokemon, attack: Movement): number{
    let types: string[] = getPokemonTypes(pokemon);
    
    if (types.length === 2) return (types[1] === attack.type) ? 1.5 : 1;
    
    return (types[1] === attack.type) ? 1.5 : 1;
}

function calculcateEfectivity(attack: Movement, pokemon2: Pokemon): number{
    let atkType:string = attack.type;
    let attackIndex: number = TYPE[atkType]-1;
    let pokemonType: string[] = getPokemonTypes(pokemon2);
    let pokemonTypeIndex: number;
    let bonus: number;
    if(pokemonType.length === 2){
        let type1 = TYPE[pokemonType[0]]-1;
        let type2 = TYPE[pokemonType[1]]-1;

        bonus = TYPES_TABLE[type1][attackIndex] * TYPES_TABLE[type2][attackIndex]
    }else{
        pokemonTypeIndex = TYPE[pokemonType[0]];
        bonus =  TYPES_TABLE[pokemonTypeIndex][attackIndex];
    }
    return bonus;
    
}
function Random(min, max){
    return (Math.floor(Math.random() * (max - min+1)) + min);
 }
