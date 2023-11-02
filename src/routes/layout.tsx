import { component$, Slot, useContextProvider, useStore, useStyles$ } from "@builder.io/qwik";

import Navbar from "~/components/shared/navbar/navbar";

import styles from "./styles.css?inline";
import { PokemonGameContext, PokemonListContext } from "~/context";
import type { PokemonListState, PokemonGameState } from "~/context";

export default component$(() => {
	useStyles$(styles);

	const pokemonGame = useStore<PokemonGameState>({
		pokemonId: 4,
		revelar: true,
		voltear: false
	});

	useContextProvider( PokemonGameContext, pokemonGame );

	//? AQUI estado inicial de ese context
	const pokemonList = useStore<PokemonListState>({
		currentPage: 1,
		isLoading: false,
		pokemons: []
	});

	useContextProvider( PokemonListContext, pokemonList );
	return (
		<>
			<Navbar />
			<main class="flex flex-col items-center justify-center">
				<Slot />
			</main>
		</>
	);
});
