import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { debounceTime, map, of, pipe, switchMap } from "rxjs";
import { configureRootVertex, createGraph } from "verdux";
import { Route } from "../../common/Route";
import { loadableComponent } from "../../common/loadableComponent";
import { router } from "../../router/Router";
import { ExampleDescription } from "./ExampleDescription";
import { ExampleLink } from "./ExampleLink";
import { PokemonDisplay } from "./pokemon/PokemonDisplay";
import { createPokemonService } from "./pokemon/PokemonService";

const route = router.examples["1"].b;

const slice = createSlice({
  initialState: { searchedPokemonName: "" },
  name: "root",
  reducers: {
    inputValueChanged: (state, action: PayloadAction<string>) => {
      state.searchedPokemonName = action.payload;
    },
  },
});

const rootConfig = configureRootVertex({
  slice,
  dependencies: {
    pokemonService: () => createPokemonService(),
  },
}).loadFromFields$(["searchedPokemonName"], ({ pokemonService }) => ({
  pokemon: pipe(
    map((_) => _.searchedPokemonName),
    map((_) => _.trim().toLowerCase()),
    debounceTime(500),
    switchMap((_) =>
      _.length === 0 ? of("empty input" as const) : pokemonService.findByName(_)
    )
  ),
}));

const graph = createGraph({ vertices: [rootConfig] });

const rootVertex = graph.getVertexInstance(rootConfig);

const onNameInputValueChange = (e: any) =>
  graph.dispatch(slice.actions.inputValueChanged(e.target.value));

const Pokemon = loadableComponent(rootVertex.pick(["pokemon"]), ({ pokemon }) =>
  pokemon === "empty input" ? null : pokemon === null ? (
    <h4>Pokemon not found</h4>
  ) : (
    <PokemonDisplay pokemon={pokemon} />
  )
);

export const Example01b = () => (
  <Route match={route}>
    <h2>Example 1b</h2>
    <Description />
    <input
      type="text"
      onChange={onNameInputValueChange}
      style={{
        width: "300px",
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        fontFamily: "Arial, sans-serif",
        fontSize: "16px",
      }}
      placeholder="Enter pokemon name"
    />
    <Pokemon />
  </Route>
);

const Description = () => (
  <ExampleDescription>
    <p>
      When input value changes, the value is stored in a field. We then treat
      changes of this field's value as a stream, debouncing and mapping to a
      stream of API results.
    </p>
    <ExampleLink filename="Example01b.tsx" />
  </ExampleDescription>
);
