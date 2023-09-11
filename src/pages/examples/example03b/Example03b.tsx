import Select from "react-select";
import { Route } from "../../../common/Route";
import { loadableComponent } from "../../../common/loadableComponent";
import { router } from "../../../router/createRouter";
import { ExampleDescription } from "../ExampleDescription";
import { ExampleLink } from "../ExampleLink";
import { PokemonDisplay } from "../pokemon/PokemonDisplay";
import { PokemonOption } from "./PokemonOption";
import { example03b_Actions, example03b_VertexConfig } from "./vertexConfig";

const route = router.examples["3"].b;

const PokemonSelect = loadableComponent({
  vertexConfig: example03b_VertexConfig,
  fields: ["pokemonOptions", "selectedOption"],
  component: ({ pokemonOptions, selectedOption, dispatch }) => {
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
  },
});

const Pokemon = loadableComponent({
  vertexConfig: example03b_VertexConfig,
  fields: ["pokemon"],
  component: ({ pokemon }) =>
    !pokemon ? null : <PokemonDisplay pokemon={pokemon} />,
});

export const Example03b = () => (
  <Route match={route}>
    <h2>Example 3b</h2>
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
      Much like the previous example, the only difference is that the select
      options are loaded from the API.
    </p>
    <ExampleLink filename="Example03b.tsx" />
  </ExampleDescription>
);
