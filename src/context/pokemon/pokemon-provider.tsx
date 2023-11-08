import { Slot, component$, useContextProvider, useStore, useVisibleTask$ } from '@builder.io/qwik';
import { type PokemonGameState, PokemonGameContext } from './pokemon-game.context';
import { type PokemonListState, PokemonListContext } from './pokemon-list.context';

export const PokemonProvider = component$(() => {
    const pokemonGame = useStore<PokemonGameState>({
		pokemonId: 4,
		revelar: true,
		voltear: false
	});

	//? AQUI estado inicial de ese context
	const pokemonList = useStore<PokemonListState>({
		currentPage: 0,
		isLoading: false,
		pokemons: []
	});

    useContextProvider( PokemonGameContext, pokemonGame );
	useContextProvider( PokemonListContext, pokemonList );

	useVisibleTask$(() => {
		// TODO: Leer del local storage
		if( localStorage.getItem('pokemon-game') ) {
			const { pokemonId = 10, revelar = true, voltear = false } = JSON.parse(localStorage.getItem('pokemon-game')!) as PokemonGameState;
			pokemonGame.pokemonId = pokemonId;
			pokemonGame.revelar = revelar;
			pokemonGame.voltear = voltear;
		}
	});

	useVisibleTask$(({ track }) => {
		/* Cuando se quiere controlr el cambio de más de una variable, es posible colocarlas todas en un array dentro de la funcion track */
		track(() => [ pokemonGame.revelar, pokemonGame.pokemonId, pokemonGame.voltear ]);

		localStorage.setItem('pokemon-game', JSON.stringify(pokemonGame));
	});

  return <Slot />
});