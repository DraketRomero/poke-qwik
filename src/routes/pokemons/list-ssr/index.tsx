import { component$, useComputed$ } from "@builder.io/qwik";
import { Link, type DocumentHead, routeLoader$, useLocation } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { getSmallPokemons } from "~/helpers/get-small-pokemons";
import type { SmallPokemon } from "~/interfaces";

export const usePokemonList = routeLoader$<SmallPokemon[]>(async ({ query, redirect, pathname }) => {
  const offset = Number(query.get('offset') || 0);

  if(isNaN(offset)) redirect(301, pathname);
  if(offset < 0 ) redirect(301, pathname);

  return getSmallPokemons(offset);

  // const resp = await fetch(
  //   `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`
  // );
  // const data = (await resp.json()) as PokemonListResponse;

  // return data.results;
});

export default component$(() => {
  const pokemons = usePokemonList();
  const location = useLocation();

  // console.log(location.url.searchParams.get('offset'));

  const currentOffset = useComputed$<number>(() => {
    // const offset = location.url.searchParams.get('offset');

    const offsetString = new URLSearchParams(location.url.search);
    return Number(offsetString.get('offset') || 0);
  });

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Offset: {currentOffset}</span>
        <span>Está cargando página: { location.isNavigating ? 'Si' : 'No'}</span>
      </div>

      <div class="mt-10">
        <Link href={`/pokemons/list-ssr/?offset=${currentOffset.value - 10}`}
          class="btn btn-primary mr-2">Anteriores</Link>

        <Link href={`/pokemons/list-ssr/?offset=${currentOffset.value + 10}`}
          class="btn btn-primary mr-2">Siguientes</Link>
      </div>

      <div class="grid grid-cols-6 mt-5">
        {pokemons.value.map(({ id, name }) => (
          <div key={name} class="m-5 flex flex-col justify-center items-center">
            <PokemonImage id={id} />
            <span class="capitalize">{name}</span>
          </div>
        ))}
      </div>
    </>
  );
});

/* Title - Permite mostrar el nombre del titulo en la parte de la pestaña del navegador */
export const head: DocumentHead = {
  title: "List-SSR",
};
