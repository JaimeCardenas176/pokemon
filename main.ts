import { Pokemon } from './entities/pokemon';
import { Movement } from './entities/movement';
import { Battle } from './entities/battle';
import { TYPE } from './utils/types';
import { Reader } from './utils/reader';
import { COMMANDS } from './utils/commands';
import { Turn } from './entities/turn';
import { Command } from './entities/command';
import { MovementCategory as category } from "./utils/movCategory";


//base stats for bulbasaur & charmander  -> from bulbapedia
const statsBulbasaur = [ 45, 49, 49, 65, 65, 45];
const statsCharmander = [ 39, 52, 43, 80, 65, 65];

//example movements
const movsBulbasaur = [
    new Movement('tackle', 35, 12, category.PHYSICAL, 0.0125, 0.85, 10),
    new Movement('scratch', 35, 12, category.PHYSICAL, 0.0125, 0.85, 35),
];
const movsCharmander = [
    new Movement('tackle', 35, 12, category.PHYSICAL, 0.0125, 0.85, 10),
    new Movement('scratch', 35, 12, category.PHYSICAL, 0.0125, 0.85, 35),
];

//pokemons
const bulbasaur = new Pokemon('bulbasaur', 5, TYPE[9], statsBulbasaur, movsBulbasaur, 0, statsBulbasaur[0], 0, TYPE[15]);
const charmander = new Pokemon('charmander', 5, TYPE[6], statsCharmander, movsCharmander, 0, statsCharmander[0], 0);

const battle = new Battle(bulbasaur, charmander);

//console.log(bulbasaur); 

//we can begin the battle

async function askCommand(pokemon: Pokemon): Promise<Command>{
    let command: Command;
    const reader: Reader = new Reader();
    while (command === undefined){
        const answer: string = await reader.question(`What should ${pokemon.name} do?`);
        const ans: string[] = answer.split('');
        if(ans.length === 2){
            if (ans[0] === COMMANDS.DO_ATTACK && (Number(ans[1]) >= 0 && Number(ans[1]) < 4))
                command = new Command( {DO_ATTACK: Number(ans[0]) } );
        }
    }
    reader.close()
    return command;
}
while(!battle.isFinished()){
    //ask for command
    let cmd1: Command = new Command({DO_ATTACK: 0});
    //askCommand(bulbasaur).then(res => { cmd1 = res});
    let cmd2: Command = new Command({DO_ATTACK: 0});
    //askCommand(charmander).then(res => { cmd2 = res});

    let turn = new Turn(cmd1, cmd2);
   
    if (turn.canStart()){
        battle.executeTurn(turn);
        battle.showBattleStatus();        
    }
}