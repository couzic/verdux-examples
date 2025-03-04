import Select from "react-select";
import { Route } from "../../../common/Route";
import { useDispatch } from "../../../common/useDispatch";
import { useVertexState } from "../../../common/useVertexState";
import { router } from "../../../router/createRouter";
import { ExampleDescription } from "../ExampleDescription";
import { ExampleLink } from "../ExampleLink";
import { PokemonDisplay } from "../pokemon/PokemonDisplay";
import { PokemonOption } from "./PokemonOption";
import { example03b_Actions, example03b_VertexConfig } from "./vertexConfig";
import { Suspense } from "react";
import { Spinner } from "../../../common/Spinner";

const route = router.examples["3"].b;

export const Example03b = () => (
  <Route match={route}>
    <h2>Example 3b</h2>
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
      Much like the previous example, the only difference is that the select
      options are loaded from the API.
    </p>
    <ExampleLink filename="example03b/vertexConfig.ts" />
  </ExampleDescription>
);

const PokemonSelect = () => {
  const { pokemonOptions, selectedOption } = useVertexState({
    vertex: example03b_VertexConfig,
    fields: ["pokemonOptions", "selectedOption"],
  });
  const dispatch = useDispatch();
  const onPokemonSelected = (option: PokemonOption | null) =>
    dispatch(example03b_Actions.selectPokemon(option));
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
    vertex: example03b_VertexConfig,
    fields: ["pokemon"],
  });
  if (!pokemon) return null;
  return <PokemonDisplay pokemon={pokemon} />;
};
