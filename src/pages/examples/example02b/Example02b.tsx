import { Route } from "../../../common/Route";
import { loadableComponent } from "../../../common/loadableComponent";
import { router } from "../../../router/createRouter";
import {
  ExampleDescription,
  descriptionButtonStyle,
} from "../ExampleDescription";
import { ExampleLink } from "../ExampleLink";
import { PokemonDisplay } from "../pokemon/PokemonDisplay";
import { example02b_VertexConfig } from "./vertexConfig";

const route = router.examples["2"].b;

const EvolvesFrom = loadableComponent({
  vertexConfig: example02b_VertexConfig,
  fields: ["evolvesFrom"],
  component: ({ evolvesFrom }) =>
    !evolvesFrom ? null : <PokemonDisplay pokemon={evolvesFrom} />,
});

const EvolvesTo = loadableComponent({
  vertexConfig: example02b_VertexConfig,
  fields: ["evolvesTo"],
  component: ({ evolvesTo }) => (
    <>
      {evolvesTo.map((evo) => (
        <PokemonDisplay pokemon={evo} key={evo.id} />
      ))}
    </>
  ),
});

const PokemonAsap = loadableComponent({
  vertexConfig: example02b_VertexConfig,
  fields: ["pokemon"],
  component: ({ pokemon }) =>
    !pokemon ? null : (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <EvolvesFrom />
        <PokemonDisplay pokemon={pokemon} />
        <EvolvesTo />
      </div>
    ),
});

const PokemonFullyLoaded = loadableComponent({
  vertexConfig: example02b_VertexConfig,
  fields: ["pokemon", "evolvesFrom", "evolvesTo"],
  component: ({ evolvesFrom, pokemon, evolvesTo }) => (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {!evolvesFrom ? null : <PokemonDisplay pokemon={evolvesFrom} />}
      {!pokemon ? null : <PokemonDisplay pokemon={pokemon} />}
      {evolvesTo.map((evo) => (
        <PokemonDisplay pokemon={evo} key={evo.id} />
      ))}
    </div>
  ),
});

export const Example02b = () => (
  <Route match={route}>
    <h2>Example 2b</h2>
    <Description />
    <PokemonAsap />
    <h1>OR</h1>
    <PokemonFullyLoaded />
  </Route>
);

const Description = () => (
  <ExampleDescription>
    <p>
      We are still observing URL params for a pokemon name. The difference is
      that once the pokemon is loaded, we then load the forms it can evolve from
      and to. Two different approaches are presented here :
    </p>
    <p>
      In the first one (top), the searched pokemon is displayed as soon as
      possible, and two spinners are then displayed, one for each pending http
      call. Once the evolutions are loaded, they are displayed. The downside of
      this approach is that we don't know beforehand if an evolution exists for
      the searched pokemon, and it feels strange to show a spinner and then make
      it vanish without anything new displayed.
    </p>
    <p>
      In the second one (bottom), we wait until all data is loaded and available
      before displaying it.
    </p>
    <p>
      Have fun and change the URL param manually, or click on one of those
      buttons:{" "}
      <span
        style={{
          marginTop: "10px",
          display: "flex",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <button
          onClick={() => route.push({ "pokemon-name": "pichu" })}
          style={descriptionButtonStyle}
        >
          Pichu
        </button>
        <button
          onClick={() => route.push({ "pokemon-name": "pikachu" })}
          style={descriptionButtonStyle}
        >
          Pikachu
        </button>
        <button
          onClick={() => route.push({ "pokemon-name": "raichu" })}
          style={descriptionButtonStyle}
        >
          Raichu
        </button>
        <button
          onClick={() => route.push({ "pokemon-name": "eevee" })}
          style={{ ...descriptionButtonStyle, fontWeight: "bold" }}
        >
          Eevee
        </button>
      </span>
    </p>
    <ExampleLink filename="example02b/vertexConfig.ts" />
  </ExampleDescription>
);
