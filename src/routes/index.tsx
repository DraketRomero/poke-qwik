import { $, component$, useContext } from "@builder.io/qwik";
import { type DocumentHead, useNavigate } from "@builder.io/qwik-city";
import { PokemonImage } from "../components/pokemons/pokemon-image";
import { PokemonGameContext } from "~/context";

export default component$(() => {
  const nav = useNavigate();

  const pokemonGame = useContext(PokemonGameContext);

  const changePokemonId = $((value: number) => {
    if (pokemonGame.pokemonId + value <= 0) return;

    pokemonGame.pokemonId += value;
  });

  const changeViewPokemon = $(() => {
    pokemonGame.voltear = !pokemonGame.voltear;
  });

  const revelarPokemon = $(() => {
    pokemonGame.revelar = !pokemonGame.revelar;
  });

  const goToPokemon = $(async () => {
    await nav(`/pokemon/${pokemonGame.pokemonId}`);
  });

  return (
    <>
      <span class="text-2xl">Buscador simple</span>
      <span class="text-9xl">{pokemonGame.pokemonId}</span>

      <div onClick$={() => goToPokemon()} style={"cursor: pointer"}>
        <PokemonImage
          id={pokemonGame.pokemonId}
          backImage={pokemonGame.voltear}
          isVisible={pokemonGame.revelar}
        />
      </div>

      <div class="mt-2">
        <button
          class="btn btn-primary mr-2"
          onClick$={() => changePokemonId(-1)}
        >
          Anterior
        </button>
        <button
          class="btn btn-primary mr-2"
          onClick$={() => changePokemonId(+1)}
        >
          Siguiente
        </button>
        <button class="btn btn-primary mr-2" onClick$={changeViewPokemon}>
          Voltear
        </button>
        <button class="btn btn-primary" onClick$={revelarPokemon}>
          Revelar
        </button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "PokeQwik",
  meta: [
    {
      name: "description",
      content: "Esta es mi primera aplicacion en Qwik",
    },
  ],
};
