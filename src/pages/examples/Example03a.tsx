import { of } from "rxjs";
import { Route } from "../../common/Route";
import { PokemonDisplay } from "./pokemon/PokemonDisplay";
import { createPokemonService } from "./pokemon/PokemonService";
import { PokemonId, PokemonName } from "./pokemon/Pokemon";
import Select from "react-select";
import { loadableComponent } from "../../common/loadableComponent";
import { ExampleDescription } from "./ExampleDescription";
import { ExampleLink } from "./ExampleLink";
import { router } from "../../router/Router";
import { configureRootVertex, createGraph } from "verdux";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const route = router.examples["3"].a;

interface PokemonOption {
  label: PokemonName;
  value: PokemonId;
}

const pokemonOptions: PokemonOption[] = [
  {
    label: "bulbasaur",
    value: "1",
  },
  {
    label: "ivysaur",
    value: "2",
  },
  {
    label: "venusaur",
    value: "3",
  },
  {
    label: "charmander",
    value: "4",
  },
  {
    label: "charmeleon",
    value: "5",
  },
  {
    label: "charizard",
    value: "6",
  },
  {
    label: "squirtle",
    value: "7",
  },
  {
    label: "wartortle",
    value: "8",
  },
  {
    label: "blastoise",
    value: "9",
  },
  {
    label: "caterpie",
    value: "10",
  },
  {
    label: "metapod",
    value: "11",
  },
  {
    label: "kakuna",
    value: "12",
  },
  {
    label: "weedle",
    value: "13",
  },
  {
    label: "kakuna",
    value: "14",
  },
  {
    label: "beedrill",
    value: "15",
  },
  {
    label: "pidgey",
    value: "16",
  },
  {
    label: "pidgeotto",
    value: "17",
  },
  {
    label: "pidgeot",
    value: "18",
  },
  {
    label: "rattata",
    value: "19",
  },
  {
    label: "raticate",
    value: "20",
  },
] as any;

const initialState = { selectedOption: null } as {
  selectedOption: PokemonOption | null;
};

const rootSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    selectPokemon: (state, action: PayloadAction<PokemonOption | null>) => {
      state.selectedOption = action.payload;
    },
  },
});

const rootConfig = configureRootVertex({
  slice: rootSlice,
  dependencies: {
    pokemonService: createPokemonService,
  },
}).loadFromFields(["selectedOption"], ({ pokemonService }) => ({
  pokemon: ({ selectedOption }) =>
    !selectedOption
      ? of(null)
      : pokemonService.loadByName(selectedOption.label),
}));

const graph = createGraph({
  vertices: [rootConfig],
});

const rootVertex = graph.getVertexInstance(rootConfig);

const onPokemonSelected = (option: PokemonOption | null) =>
  graph.dispatch(rootSlice.actions.selectPokemon(option));

const PokemonSelect = loadableComponent(
  rootVertex.pick(["selectedOption"]),
  ({ selectedOption }) => (
    <div style={{ width: 300, color: "#333" }}>
      <Select
        placeholder="Select a pokemon"
        options={pokemonOptions}
        value={selectedOption}
        onChange={onPokemonSelected as any}
      />
    </div>
  )
);

const Pokemon = loadableComponent(rootVertex.pick(["pokemon"]), ({ pokemon }) =>
  !pokemon ? null : <PokemonDisplay pokemon={pokemon} />
);

export const Example03a = () => (
  <Route match={route}>
    <h2>Example 3a</h2>
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Description />
      <PokemonSelect />
      <Pokemon />
    </div>
  </Route>
);

const Description = () => (
  <ExampleDescription>
    <p>
      We start from a select with a static list of options. Once an option is
      selected, the data for the selected pokemon is loaded.
    </p>
    <ExampleLink filename="Example03a.tsx" />
  </ExampleDescription>
);
