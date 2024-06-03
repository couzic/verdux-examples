import { Route } from "../../../../../common/Route";
import { loadableComponent } from "../../../../../common/loadableComponent";
import { router } from "../../../../../router/createRouter";
import { pokemonDescriptionVertexConfig } from "./vertexConfig";

export const PokemonDescriptionPage = loadableComponent({
  vertexConfig: pokemonDescriptionVertexConfig,
  fields: ["selectedPokemon"],
  component: ({ selectedPokemon }) =>
    selectedPokemon === null ? null : (
      <Route match={router.examples.realLife.pokemon.selected.description}>
        <h2>{selectedPokemon.name}</h2>
        <h2>{selectedPokemon.id}</h2>
      </Route>
    ),
});
