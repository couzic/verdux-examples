import { useContext } from "react";
import { GraphContext } from "../../../common/GraphContext";
import { Route } from "../../../common/Route";
import { loadableComponent } from "../../../common/loadableComponent";
import { router } from "../../../router/createRouter";
import { ExampleDescription } from "../ExampleDescription";
import { ExampleLink } from "../ExampleLink";
import { PokemonDisplay } from "../pokemon/PokemonDisplay";
import { example01b_VertexConfig, example01b_actions } from "./vertexConfig";

const route = router.examples["1"].b;

const { inputValueChanged } = example01b_actions;

export const Pokemon = loadableComponent({
  vertexConfig: example01b_VertexConfig,
  fields: ["pokemon"],
  component: ({ pokemon }) =>
    pokemon == "empty input" ? null : pokemon === null ? (
      <h4>Pokemon not found</h4>
    ) : (
      <PokemonDisplay pokemon={pokemon} />
    ),
});

export const Example01b = () => {
  const graph = useContext(GraphContext);
  const onNameInputValueChange = (e: any) =>
    graph.dispatch(inputValueChanged(e.target.value));
  return (
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
};

const Description = () => (
  <ExampleDescription>
    <p>
      When input value changes, the value is stored in a field. We then treat
      changes of this field's value as a stream, debouncing and mapping to a
      stream of API results.
    </p>
    <ExampleLink filename="example01b/vertexConfig.ts" />
  </ExampleDescription>
);
