// This code is for v4 of the openai package: npmjs.com/package/openai
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.PUBLIC_OPENAI_KEY,
  dangerouslyAllowBrowser: true
});

export const getFunFactAboutPokemon = async (
  pokemonName: string
): Promise<string> => {

    /* Elimina la cabececera 'User-Agent' de los headers de consulta */
    // delete configuration.baseOptions.headers['User-Agent'];

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `Dame un dato interesante de ${pokemonName}.\n`,
      },
    ],
    temperature: 1,
    max_tokens: 60,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  
  return response.choices[0].message.content || `No tengo nada sobre ${ pokemonName }`;
};
