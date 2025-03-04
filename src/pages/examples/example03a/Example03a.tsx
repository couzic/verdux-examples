import { Suspense } from "react";
import Select from "react-select";
import { Route } from "../../../common/Route";
import { useDispatch } from "../../../common/useDispatch";
import { useVertexState } from "../../../common/useVertexState";
import { router } from "../../../router/createRouter";
import { ExampleDescription } from "../ExampleDescription";
import { ExampleLink } from "../ExampleLink";
import { PokemonDisplay } from "../pokemon/PokemonDisplay";
import { PokemonOption } from "./PokemonOption";
import { example03a_Actions, example03a_VertexConfig } from "./vertexConfig";
import { Spinner } from "../../../common/Spinner";

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

export const Example03a = () => (
  <Route match={route}>
    <h2>Example 3a</h2>
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Description />
      <Suspense fallback={<Spinner />}>
        <PokemonSelect />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <Pokemon />
      </Suspense>
    </div>
  </Route>
);

const Description = () => (
  <ExampleDescription>
    <p>
      We start from a select with a static list of options. Once an option is
      selected, the data for the selected pokemon is loaded.
    </p>
    <ExampleLink filename="example03a/vertexConfig.ts" />
  </ExampleDescription>
);

const PokemonSelect = () => {
  const dispatch = useDispatch();
  const { selectedOption } = useVertexState({
    vertex: example03a_VertexConfig,
    fields: ["selectedOption"],
  });
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
};

const Pokemon = () => {
  const { pokemon } = useVertexState({
    vertex: example03a_VertexConfig,
    fields: ["pokemon"],
  });
  if (!pokemon) return null;
  return <PokemonDisplay pokemon={pokemon} />;
};
