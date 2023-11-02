import { createContextId } from "@builder.io/qwik";

export interface PokemonGameState {
    pokemonId: number;
    voltear  : boolean; 
    revelar  : boolean;
}

export const PokemonGameContext = createContextId<PokemonGameState>('pokemon.game-context');