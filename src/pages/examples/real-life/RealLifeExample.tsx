import { Route } from "../../../common/Route";
import { loadableComponent } from "../../../common/loadableComponent";
import { router } from "../../../router/createRouter";
import { Tab, Tabs } from "./Tabs";
import { AboutPage } from "./about/AboutPage";
import { PokemonPage } from "./pokemon/PokemonPage";
import { realLifeExampleVertexConfig } from "./vertexConfig";

const route = router.examples.realLife;

const goToPokemonPage = () => route.pokemon.push();
const goToAboutPage = () => route.about.push();

export const RealLifeExample = loadableComponent({
  vertexConfig: realLifeExampleVertexConfig,
  fields: ["pokemonTabMatch", "aboutTabMatch"],
  component: ({ pokemonTabMatch, aboutTabMatch }) => (
    <Route match={route}>
      <div style={{ height: "80vh" }}>
        <h2>Real World (sort of) Example</h2>
        <Tabs>
          <Tab
            onClick={goToPokemonPage}
            active={pokemonTabMatch}
            text="Pokemon"
          />
          <Tab onClick={goToAboutPage} active={aboutTabMatch} text="About" />
        </Tabs>
        <Route match={route.pokemon}>
          <PokemonPage />
        </Route>
        <AboutPage />
      </div>
    </Route>
  ),
});
