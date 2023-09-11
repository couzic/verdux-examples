import Select from "react-select";
import { Route } from "../../../common/Route";
import { loadableComponent } from "../../../common/loadableComponent";
import { router } from "../../../router/createRouter";
import { ExampleDescription } from "../ExampleDescription";
import { ExampleLink } from "../ExampleLink";
import { PokemonDisplay } from "../pokemon/PokemonDisplay";
import { PokemonOption } from "./PokemonOption";
import { example03a_Actions, example03a_VertexConfig } from "./vertexConfig";

const route = router.examples["3"].a;

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

const PokemonSelect = loadableComponent({
  vertexConfig: example03a_VertexConfig,
  fields: ["selectedOption"],
  component: ({ selectedOption, dispatch }) => {
    const onPokemonSelected = (option: PokemonOption | null) =>
      dispatch(example03a_Actions.selectPokemon(option));
    return (
      <div style={{ width: 300, color: "#333" }}>
        <Select
          placeholder="Select a pokemon"
          options={pokemonOptions}
          value={selectedOption}
          onChange={onPokemonSelected}
        />
      </div>
    );
  },
});

const Pokemon = loadableComponent({
  vertexConfig: example03a_VertexConfig,
  fields: ["pokemon"],
  component: ({ pokemon }) =>
    !pokemon ? null : <PokemonDisplay pokemon={pokemon} />,
});

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
