import { component$, useSignal, useTask$ } from "@builder.io/qwik";

interface Props {
  id: number;
  size?: number;
  backImage: boolean;
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

    const front = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    const back = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`;
    const uri = backImage ? front : back;

    return (
      <div
        class="flex items-center justify-center"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        {!imageLoaded.value && <span>Cargando... </span>}

        <img
          src={uri}
          alt="Imagen de pokemon"
          width={`${size}px`}
          height=""
          onLoad$={() => {
            // setTimeout(() => {
              imageLoaded.value = true;
            // }, 2000);
          }}
          class={[{ hidden: !imageLoaded.value, "brightness-0": isVisible }, 'transition-all']}
        />
      </div>
    );
  }
);
