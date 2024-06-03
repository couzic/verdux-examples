import { Route } from "../../../../../common/Route";
import { loadableComponent } from "../../../../../common/loadableComponent";
import { router } from "../../../../../router/createRouter";
import { pokemonEvolutionsVertexConfig } from "./vertexConfig";

export const PokemonEvolutionsPage = loadableComponent({
  vertexConfig: pokemonEvolutionsVertexConfig,
  fields: [],
  component: () => (
    <Route match={router.examples.realLife.pokemon.selected.evolutions}>
      <h2>PokemonEvolutionsPage</h2>
    </Route>
  ),
});
