import { Suspense } from "react";
import { Route } from "../../../common/Route";
import { useVertexState } from "../../../common/useVertexState";
import { router } from "../../../router/createRouter";
import { ExampleDescription } from "../ExampleDescription";
import { ExampleLink } from "../ExampleLink";
import { PokemonDisplay } from "../pokemon/PokemonDisplay";
import { example01a_VertexConfig } from "./vertexConfig";
import { Spinner } from "../../../common/Spinner";

export const Example01a = () => (
  <Route match={router.examples[1].a}>
    <h2>Example 1a</h2>
    <Description />
    <Suspense fallback={<Spinner />}>
      <Pokemon />
    </Suspense>
  </Route>
);

const Description = () => (
  <ExampleDescription>
    <p>
      When route is first entered, we fetch the data for the pokemon named
      "pikachu" and store that data in the "pokemon" field.
    </p>
    <p>While pokemon data is being loaded, a spinner is displayed.</p>
    <ExampleLink filename="example01a/vertexConfig.ts" />
  </ExampleDescription>
);

const Pokemon = () => {
  const { pokemon } = useVertexState({
    vertex: example01a_VertexConfig,
    fields: ["pokemon"],
  });
  return <PokemonDisplay pokemon={pokemon!} />;
};
