import Select from "react-select";
import { Route } from "../../../../common/Route";
import { loadableComponent } from "../../../../common/loadableComponent";
import { router } from "../../../../router/createRouter";
import { Tab, Tabs } from "../Tabs";
import { PokemonOption } from "./PokemonOption";
import { PokemonDescriptionPage } from "./description/PokemonDescriptionPage";
import { PokemonEvolutionsPage } from "./evolutions/PokemonEvolutionsPage";
import { pokemonActions, pokemonVertexConfig } from "./vertexConfig";

export const PokemonPage = loadableComponent({
  vertexConfig: pokemonVertexConfig,
  fields: ["pokemonOptions", "selectedPokemonOption"],
  component: ({ pokemonOptions, selectedPokemonOption, dispatch }) => {
    const onPokemonSelected = (option: PokemonOption | null) =>
      dispatch(pokemonActions.selectPokemon(option));
    return (
      <>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: 300, color: "#333" }}>
            <Select
              placeholder="Select a pokemon"
              options={pokemonOptions}
              value={selectedPokemonOption}
              onChange={onPokemonSelected}
            />
          </div>
        </div>
        <Route match={router.examples.realLife.pokemon.selected}>
          <SelectedPokemonPage />
        </Route>
      </>
    );
  },
});

const SelectedPokemonPage = loadableComponent({
  vertexConfig: pokemonVertexConfig,
  fields: [
    "selectedPokemonName",
    "pokemonDescriptionMatch",
    "pokemonEvolutionsMatch",
  ],
  component: ({
    selectedPokemonName,
    pokemonDescriptionMatch,
    pokemonEvolutionsMatch,
  }) => {
    const goToDescriptionPage = () =>
      selectedPokemonName &&
      router.examples.realLife.pokemon.selected.description.push({
        "pokemon-name": selectedPokemonName,
      });
    const goToEvolutionsPage = () =>
      selectedPokemonName &&
      router.examples.realLife.pokemon.selected.evolutions.push({
        "pokemon-name": selectedPokemonName,
      });
    return (
      <>
        <Tabs>
          <Tab
            onClick={goToDescriptionPage}
            active={pokemonDescriptionMatch}
            text="Description"
          />
          <Tab
            onClick={goToEvolutionsPage}
            active={pokemonEvolutionsMatch}
            text="Evolutions"
          />
        </Tabs>
        <PokemonDescriptionPage />
        <PokemonEvolutionsPage />
      </>
    );
  },
});
