import { Suspense } from "react";
import { Route } from "../../../../../common/Route";
import { Spinner } from "../../../../../common/Spinner";
import { useVertexState } from "../../../../../common/useVertexState";
import { router } from "../../../../../router/createRouter";
import { PokemonDisplay } from "../../../pokemon/PokemonDisplay";
import { pokemonEvolutionsVertexConfig } from "./vertexConfig";

export const PokemonEvolutionsPage = () => (
  <Route match={router.examples.realLife.pokemon.selected.evolutions}>
    <Suspense fallback={<Spinner />}>
      <PageContent />
    </Suspense>
  </Route>
);

const PageContent = () => {
  const { selectedPokemon, evolvesFrom, evolvesTo } = useVertexState({
    vertex: pokemonEvolutionsVertexConfig,
    fields: ["selectedPokemon", "evolvesFrom", "evolvesTo"],
  });
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {!evolvesFrom ? null : <PokemonDisplay pokemon={evolvesFrom} />}
      {!selectedPokemon ? null : <PokemonDisplay pokemon={selectedPokemon} />}
      {(evolvesTo || []).map((evo) => (
        <PokemonDisplay pokemon={evo} key={evo.id} />
      ))}
    </div>
  );
};
