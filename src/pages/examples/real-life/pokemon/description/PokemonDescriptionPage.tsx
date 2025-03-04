import { Suspense } from "react";
import { Route } from "../../../../../common/Route";
import { Spinner } from "../../../../../common/Spinner";
import { useVertexState } from "../../../../../common/useVertexState";
import { router } from "../../../../../router/createRouter";
import { PokemonDisplay } from "../../../pokemon/PokemonDisplay";
import { pokemonDescriptionVertexConfig } from "./vertexConfig";

export const PokemonDescriptionPage = () => (
  <Route match={router.examples.realLife.pokemon.selected.description}>
    <Suspense fallback={<Spinner />}>
      <PageContent />
    </Suspense>
  </Route>
);

const PageContent = () => {
  const { selectedPokemon } = useVertexState({
    vertex: pokemonDescriptionVertexConfig,
    fields: ["selectedPokemon"],
  });
  if (selectedPokemon === null) return null;
  return <PokemonDisplay pokemon={selectedPokemon} />;
};
