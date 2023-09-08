import { createSlice } from "@reduxjs/toolkit";
import { filter, first, mergeMap } from "rxjs";
import { configureRootVertex, createGraph } from "verdux";
import { Route } from "../../common/Route";
import { loadableComponent } from "../../common/loadableComponent";
import { router } from "../../router/Router";
import { ExampleDescription } from "./ExampleDescription";
import { ExampleLink } from "./ExampleLink";
import { PokemonDisplay } from "./pokemon/PokemonDisplay";
import { createPokemonService } from "./pokemon/PokemonService";

const route = router.examples["1"].a;

const rootConfig = configureRootVertex({
  slice: createSlice({
    initialState: {},
    name: "root",
    reducers: {},
  }),
  dependencies: {
    pokemonService: () => createPokemonService(),
  },
}).load(({ pokemonService }) => ({
  pokemon: route.match$.pipe(
    filter(Boolean), // Positive matches only => route is entered
    first(),
    mergeMap(() => pokemonService.findByName("pikachu"))
  ),
}));

const graph = createGraph({ vertices: [rootConfig] });

const rootVertex = graph.getVertexInstance(rootConfig);

const Pokemon = loadableComponent(
  rootVertex.pick(["pokemon"]),
  ({ pokemon }) => <PokemonDisplay pokemon={pokemon!} />
);

export const Example01a = () => (
  <Route match={route}>
    <h2>Example 1a</h2>
    <Description />
    <Pokemon />
  </Route>
);

const Description = () => (
  <ExampleDescription>
    <p>
      When route is first entered, we fetch the data for the pokemon named
      "pikachu" and store that data in the "pokemon" field.
    </p>
    <p>While pokemon data is being loaded, a spinner is displayed.</p>
    <ExampleLink filename="Example01a.tsx" />
  </ExampleDescription>
);
