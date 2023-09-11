import { Route } from "../../../common/Route";
import { loadableComponent } from "../../../common/loadableComponent";
import { router } from "../../../router/createRouter";
import { ExampleDescription } from "../ExampleDescription";
import { ExampleLink } from "../ExampleLink";
import { PokemonDisplay } from "../pokemon/PokemonDisplay";
import { example01a_VertexConfig } from "./vertexConfig";

const Pokemon = loadableComponent({
  vertexConfig: example01a_VertexConfig,
  fields: ["pokemon"],
  component: ({ pokemon }) => <PokemonDisplay pokemon={pokemon!} />,
});

export const Example01a = () => (
  <Route match={router.examples[1].a}>
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
