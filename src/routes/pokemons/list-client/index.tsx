// import { component$, useStore, useTask$, useVisibleTask$ } from '@builder.io/qwik';
import { $, component$, event$, useOnDocument, useStore, useTask$ } from '@builder.io/qwik';
import type { DocumentHead } from "@builder.io/qwik-city";

import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { getSmallPokemons } from '~/helpers/get-small-pokemons';
import type { SmallPokemon } from '~/interfaces';
// import styles from './../../styles.css?inline';

interface PokemonPageState {
  currentPage: number;
  isLoading  : boolean;
  pokemons: SmallPokemon[];
}

export default component$(() => {

  // useStylesScoped$ - Aplica los estilos del archivo exportado, pasado como argumento, unicamente al componente donde se encuentre declarado.
  // useStylesScoped$(styles);

  const pokemonState = useStore<PokemonPageState>({
    currentPage: 0,
    isLoading: false,
    pokemons: []
  });

  /* useVisibleTask$ -  Se ejecuta inmediatamente en cuanto se monta el componente y solo es visible del lado del cliente. Este tiene 2 variables en su callback, cleanup y track.
    Cleanup - Se usa normalmente cuando tenemos codigo que se va a volver a ejecutar, por ejempplo un debounce o algun intervalo.
    Track - Se ejecuta bajo una condicion qie nosotros mismos podemos determinar.
  */

  // useVisibleTask$( async ({ track }) => {
    // console.log("Hola mundo");

  //   track( () => pokemonState.currentPage );
  //   const pokemons = await getSmallPokemons( pokemonState.currentPage * 10 );
  //   pokemonState.pokemons = pokemons;
  // });

  /* useTask - Se ejecuta antes de que el componente sea renderizado por primera vez y se ejecutará al menos una vez y depsués de que el estado camobie, además de que se ejecuta tanto en el cliente como en el servidor. */

  useTask$( async ({ track }) => {
    // console.log("Hola mundo");

    track( () => pokemonState.currentPage );

    // const pokemons = await getSmallPokemons( pokemonState.currentPage * 10 );
    const pokemons = await getSmallPokemons( pokemonState.currentPage * 10, 30 ); // devuelve 30 pokemones
    // pokemonState.pokemons = pokemons;

    // Al ejecutarse por primera vez, la peticioón HTTP viene por parte del servidor y la reanuda o continua el cliente.
    pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];

    pokemonState.isLoading = false;
  });

  // Permite ejecutar una acción cuando escuche el evento dado, en este caso el evento scroll. Se ejecuta SOLO en el archivo donde esta declarado.
  useOnDocument('scroll', $(() => {
    const maxScroll = document.body.scrollHeight; // Calcula la altura maxima para hacer un scroll
    const currentScroll = window.scrollY + window.innerHeight; // Se realiza una sumatoria para calcular la posición real del scroll al llegar al final de la pagina.

    if (( currentScroll + 200) >= maxScroll && !pokemonState.isLoading) {
      pokemonState.isLoading = true;
      pokemonState.currentPage++;
    }
    // console.log({ maxScroll, currentScroll });
  }));

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Página actual: { pokemonState.currentPage }</span>
        <span>Está cargando: </span>
      </div>

      <div class="mt-10">
        {/* <button onClick$={() => pokemonState.currentPage--} class="btn btn-primary mr-2">Anteriores</button> */}

        <button onClick$={() => pokemonState.currentPage++} class="btn btn-primary mr-2">Siguientes</button>
      </div>

      <div class="grid sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-7 mt-5">
        {
          pokemonState.pokemons.map(({ id, name }) => (
            <div key={name} class="m-5 flex flex-col justify-center items-center">
              <PokemonImage id={id} />
              <span class="capitalize">{name}</span>
            </div>
          ))
        }
      </div>
    </>
  )
});

/* Title - Permite mostrar el nombre del titulo en la parte de la pestaña del navegador */
export const head: DocumentHead = {
  title: "List-Client"
};