import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { usePokemonGame } from "~/hooks/usePokemonGame";

export const useCheckPokemonId = routeLoader$<number>(
  ({ params, redirect }) => {
    const id = Number(params.id);

    if (isNaN(id)) redirect(301, "/");
    if (id <= 0) redirect(301, "/");
    if (id > 1000) redirect(301, "/");

    return id;
  }
);
export default component$(() => {
  const pokemonId = useCheckPokemonId();

  const { toogleFromBack, toogleVisible, isPokemonVisible, showBackImage } = usePokemonGame();

  return (
    <>
      <span class="text-5xl">Pokemon: {pokemonId}</span>

      <PokemonImage
        id={pokemonId.value}
        backImage={showBackImage.value}
        isVisible={isPokemonVisible.value}
      />

      <div class="mt-2">
        <button onClick$={toogleFromBack} class="btn btn-primary mr-2">Volter</button>
        <button onClick$={toogleVisible} class="btn btn-primary">Revelar</button>
      </div>

    </>
  );
});
