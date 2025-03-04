import { Suspense } from "react";
import Select from "react-select";
import { Route } from "../../../common/Route";
import { Spinner } from "../../../common/Spinner";
import { useDispatch } from "../../../common/useDispatch";
import { useVertexState } from "../../../common/useVertexState";
import { router } from "../../../router/createRouter";
import { ExampleDescription } from "../ExampleDescription";
import { ExampleLink } from "../ExampleLink";
import { PokemonDisplay } from "../pokemon/PokemonDisplay";
import { PokemonOption } from "./PokemonOption";
import { example03c_Actions, example03c_VertexConfig } from "./vertexConfig";

const route = router.examples["3"].c;

export const Example03c = () => (
  <Route match={route}>
    <h2>Example 3c</h2>
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Description />
      <Suspense fallback={<Spinner />}>
        <PokemonSelection />
      </Suspense>
    </div>
  </Route>
);

const Description = () => (
  <ExampleDescription>
    <p>
      Again we build from the previous example. This time, we add the selected
      pokemon name as an URL param.
    </p>
    <p>Have fun playing with the browser Back and Forward buttons !</p>
    <ExampleLink filename="example03c/vertexConfig.ts" />
  </ExampleDescription>
);

const PokemonSelection = () => {
  const dispatch = useDispatch();
  const { pokemonOptions, selectedPokemonOption } = useVertexState({
    vertex: example03c_VertexConfig,
    fields: ["pokemonOptions", "selectedPokemonOption"],
  });
  const onPokemonSelected = (option: PokemonOption | null) =>
    dispatch(example03c_Actions.selectPokemon(option));
  return (
    <div style={{ width: 300 }}>
      <div style={{ color: "#333" }}>
        <Select
          placeholder="Select a pokemon"
          options={pokemonOptions}
          value={selectedPokemonOption}
          onChange={onPokemonSelected}
        />
      </div>
      <Suspense fallback={<Spinner />}>
        <Pokemon />
      </Suspense>
    </div>
  );
};

const Pokemon = () => {
  const { pokemon } = useVertexState({
    vertex: example03c_VertexConfig,
    fields: ["pokemon"],
  });
  return <PokemonDisplay pokemon={pokemon} />;
};
