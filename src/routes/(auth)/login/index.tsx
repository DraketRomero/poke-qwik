import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { Form, routeAction$, zod$, z } from "@builder.io/qwik-city";

import styles from "./login.css?inline";

/* routeAction - Permite crear un hook que controla la informacion de un formulario. En su callback, devuelve 2 variables: data y event. 
    En data podemos obtener las variables de los inputs que hayamos creado.
    En event, temdremos 2 variables más, cookie y redirect.
    En cookie encontramos todas las cookies que se guardan de la petición.
*/
export const useLoginUserAction = routeAction$( ( data, { cookie, redirect} ) => {
  const { email, password } = data;

  if( email === 'draketromero@gmail.com' && password === '123456') {
    cookie.set('jwt', 'es_un_jwt', { secure: true, path: '/' } );

    redirect(302, '/');
    return {
      success: true,
      jwt: 'es_un_jwt'
    }
  }

  return {
    success: false
  }
}, zod$({
  email: z.string().email("Fomato no valido"),
  password: z.string().min(6, "Minimo 6  letras")
}));

export default component$(() => {
  useStylesScoped$(styles);

  const action = useLoginUserAction();

  return (
    <Form action={action} class="login-form mt-10">
      <div class="relative">
        <input
          name="email"
          type="text"
          placeholder="Email address"
        />
        <label for="email">Email Address</label>
      </div>
      <div class="relative">
        <input
          name="password"
          type="password"
          placeholder="Password"
        />
        <label for="password">Password</label>
      </div>
      <div class="relative">
        <button type="submit">Ingresar</button>
      </div>

      <p>
        {
          action.value?.success && (
            <code>Autenticado: Token: { action.value.jwt }</code>
          )
        }
      </p>

      <code>{JSON.stringify( action.value, undefined, 2)}</code>
    </Form>
  );
});
