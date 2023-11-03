import { $, useComputed$, useContext } from "@builder.io/qwik";
import { PokemonGameContext } from "~/context";

export const usePokemonGame = () => {

    const pokemonGame = useContext(PokemonGameContext);

    const changePokemonId = $((value: number) => {
        if (pokemonGame.pokemonId + value <= 0) return;
    
        pokemonGame.pokemonId += value;
      });

    const toogleFromBack = $(() => {
        pokemonGame.voltear = !pokemonGame.voltear;
    });

    const toogleVisible = $(() => {
        pokemonGame.revelar = !pokemonGame.revelar;
    });

    return {
        pokemonId: useComputed$(() => pokemonGame.pokemonId ),
        showBackImage: useComputed$(() => pokemonGame.voltear ),
        isPokemonVisible: useComputed$(() => pokemonGame.revelar ),
        
        nextPokemon: $(() => changePokemonId(+1)),
        previousPokemon: $(() => changePokemonId(-1)),
        
        toogleFromBack,
        toogleVisible
    }
}