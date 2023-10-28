import { component$ } from "@builder.io/qwik";
// import { routeLoader$, useLocation } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";

export const useCheckPokemonId = routeLoader$<number>(
  ({ params, redirect }) => {
    const id = Number(params.id);

    /* redirect - Funcion que nos permite mandar un codigo de error y redireccionar a la ruta especificada. */
    if (isNaN(id)) redirect(301, "/");
    if (id <= 0) redirect(301, "/");
    if (id > 1000) redirect(301, "/");

    return id;
  }
);
export default component$(() => {
  /* Permite obtener un objeto con distintas variables, dentro de las cuales podra obtener el valor del nombre de la carpeta */
  // const loc = useLocation();

  const pokemonId = useCheckPokemonId();

  /* loc.params.id - Permite obtener el valor de la variable pasada entre corchetes como nombre de la carpeta, en este caso es "id" */
  return (
    <>
      {/* <span class="text-5xl">Pokemon {loc.params.id}</span> */}
      <span class="text-5xl">Pokemon {pokemonId}</span>

      <PokemonImage id={pokemonId.value} backImage isVisible />
    </>
  );
});
