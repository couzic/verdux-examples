import Select from "react-select";
import { Route } from "../../../common/Route";
import { loadableComponent } from "../../../common/loadableComponent";
import { router } from "../../../router/createRouter";
import { ExampleDescription } from "../ExampleDescription";
import { ExampleLink } from "../ExampleLink";
import { PokemonDisplay } from "../pokemon/PokemonDisplay";
import { PokemonOption } from "./PokemonOption";
import { example03c_Actions, example03c_VertexConfig } from "./vertexConfig";

const route = router.examples["3"].c;

const Pokemon = loadableComponent({
  vertexConfig: example03c_VertexConfig,
  fields: ["pokemon"],
  component: ({ pokemon }) => <PokemonDisplay pokemon={pokemon} />,
});

const PokemonSelection = loadableComponent({
  vertexConfig: example03c_VertexConfig,
  fields: ["pokemonOptions", "selectedPokemonOption"],
  component: ({ pokemonOptions, selectedPokemonOption, dispatch }) => {
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
        <Pokemon />
      </div>
    );
  },
});

export const Example03c = () => (
  <Route match={route}>
    <h2>Example 3c</h2>
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Description />
      <PokemonSelection />
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
    <ExampleLink filename="Example03c.tsx" />
  </ExampleDescription>
);
