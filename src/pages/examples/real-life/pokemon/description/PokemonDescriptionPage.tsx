import { Route } from "../../../../../common/Route";
import { loadableComponent } from "../../../../../common/loadableComponent";
import { router } from "../../../../../router/createRouter";
import { PokemonDisplay } from "../../../pokemon/PokemonDisplay";
import { pokemonDescriptionVertexConfig } from "./vertexConfig";

const PageContent = loadableComponent({
  vertexConfig: pokemonDescriptionVertexConfig,
  fields: ["selectedPokemon"],
  component: ({ selectedPokemon }) =>
    selectedPokemon === null ? null : (
      <PokemonDisplay pokemon={selectedPokemon} />
    ),
});

export const PokemonDescriptionPage = () => (
  <Route match={router.examples.realLife.pokemon.selected.description}>
    <PageContent />
  </Route>
);
