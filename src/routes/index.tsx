import { $, component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from "../components/pokemons/pokemon-image";

export default component$(() => {
  const pokemonId = useSignal<number>(1); // useSignal - Se usa principalmente con tipos primitivos
  // const pokemonId2 = useStore(); // useStore - Se usa principalmente con estructuras de datos, arrays objetos, etc.

  const voltear = useSignal<boolean>(false);
  const revelar = useSignal<boolean>(true);

  const changePokemonId = $((value: number) => {
    if (pokemonId.value + value <= 0) return;

    pokemonId.value += value;
  });

  const changeViewPokemon = $(() => {
    voltear.value = !voltear.value;
  });

  const revelarPokemon = $(() => {
    revelar.value = !revelar.value;
  });

  return (
    <>
      <span class="text-2xl">Buscador simple</span>
      <span class="text-9xl">{pokemonId.value}</span>

      <PokemonImage id={pokemonId.value} backImage={voltear.value} isVisible={revelar.value}  />

      <div class="mt-2">
        <button
          class="btn btn-primary mr-2"
          onClick$={() => changePokemonId(-1)}
        >
          Anterior
        </button>
        <button class="btn btn-primary mr-2" onClick$={() => changePokemonId(+1)}>
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
