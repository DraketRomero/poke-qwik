import { component$, useComputed$, useSignal, useTask$ } from "@builder.io/qwik";

interface Props {
  id: number | string;
  size?: number;
  backImage?: boolean;
  isVisible?: boolean;
}

export const PokemonImage = component$(
  ({ id, size = 200, backImage = false, isVisible = true }: Props) => {

    const imageLoaded = useSignal(false);

    // useTask - Es una funcion que se usa para disparar efectos secundarios
    useTask$(({ track }) => {
      track(() => id);

      imageLoaded.value = false;
    });

    const imageUrl = useComputed$(() => {
      if ( id === '') return '';
      
      return ( backImage ) 
      ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`
      : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    });

    return (
      <div
        class="flex items-center justify-center"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        {!imageLoaded.value && <span>Cargando... </span>}

        <img
          src={imageUrl.value}
          alt="Imagen de pokemon"
          style={{ width: `${size}px` }}
          onLoad$={() => {
            // setTimeout(() => {
              imageLoaded.value = true;
            // }, 2000);
          }}
          height={""}
          width={""}
          class={[{ hidden: !imageLoaded.value, "brightness-0": !isVisible }, 'transition-all']}
        />
      </div>
    );
  }
);
