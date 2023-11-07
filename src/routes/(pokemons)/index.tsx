import { $, component$ } from "@builder.io/qwik";
import { type DocumentHead, useNavigate } from "@builder.io/qwik-city";
import { PokemonImage } from "../../components/pokemons/pokemon-image";
import { usePokemonGame } from "~/hooks/usePokemonGame";

export default component$(() => {
  const nav = useNavigate();

  const {
    pokemonId,
    isPokemonVisible,
    showBackImage,
    nextPokemon,
    previousPokemon,
    toogleFromBack,
    toogleVisible
  } = usePokemonGame();

  const goToPokemon = $(( id: number ) => {
    nav(`/pokemon/${ id }/`);
  });

  return (
    <>
      <span class="text-2xl">Buscador simple</span>
      <span class="text-9xl">{ pokemonId }</span>

      <div onClick$={() => goToPokemon( pokemonId.value )} style={"cursor: pointer"}>
        <PokemonImage
          id={ pokemonId.value }
          backImage={ showBackImage.value }
          isVisible={ isPokemonVisible.value }
        />
      </div>

      <div class="mt-2">
        <button
          class="btn btn-primary mr-2"
          onClick$={ previousPokemon }
        >
          Anterior
        </button>
        <button
          class="btn btn-primary mr-2"
          onClick$={ nextPokemon }
        >
          Siguiente
        </button>
        <button class="btn btn-primary mr-2" onClick$={ toogleFromBack }>
          Voltear
        </button>
        <button class="btn btn-primary" onClick$={ toogleVisible }>
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

