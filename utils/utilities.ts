import { Pokemon } from '../entities/pokemon';
import { TYPE } from './types';

export const getPokemonTypes = (pokemon: Pokemon): string[] => {
    if(pokemon.type2){
        return [ pokemon.type1, pokemon.type2];
    } 
    return [pokemon.type1];
};


