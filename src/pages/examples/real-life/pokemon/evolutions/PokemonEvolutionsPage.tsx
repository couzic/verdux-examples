import { Route } from "../../../../../common/Route";
import { loadableComponent } from "../../../../../common/loadableComponent";
import { router } from "../../../../../router/createRouter";
import { PokemonDisplay } from "../../../pokemon/PokemonDisplay";
import { pokemonEvolutionsVertexConfig } from "./vertexConfig";

const PageContent = loadableComponent({
  vertexConfig: pokemonEvolutionsVertexConfig,
  fields: ["selectedPokemon", "evolvesFrom", "evolvesTo"],
  component: ({ selectedPokemon, evolvesFrom, evolvesTo }) => (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {!evolvesFrom ? null : <PokemonDisplay pokemon={evolvesFrom} />}
      {!selectedPokemon ? null : <PokemonDisplay pokemon={selectedPokemon} />}
      {(evolvesTo || []).map((evo) => (
        <PokemonDisplay pokemon={evo} key={evo.id} />
      ))}
    </div>
  ),
});

export const PokemonEvolutionsPage = () => (
  <Route match={router.examples.realLife.pokemon.selected.evolutions}>
    <PageContent />
  </Route>
);
