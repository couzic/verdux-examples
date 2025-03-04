import { Suspense } from "react";
import Select from "react-select";
import { Route } from "../../../../common/Route";
import { Spinner } from "../../../../common/Spinner";
import { useDispatch } from "../../../../common/useDispatch";
import { useVertexState } from "../../../../common/useVertexState";
import { router } from "../../../../router/createRouter";
import { Tab, Tabs } from "../Tabs";
import { PokemonOption } from "./PokemonOption";
import { PokemonDescriptionPage } from "./description/PokemonDescriptionPage";
import { PokemonEvolutionsPage } from "./evolutions/PokemonEvolutionsPage";
import { pokemonActions, pokemonVertexConfig } from "./vertexConfig";

export const PokemonPage = () => (
  <>
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Suspense fallback={<Spinner />}>
        <PokemonSelect />
      </Suspense>
    </div>
    <Route match={router.examples.realLife.pokemon.selected}>
      <Suspense fallback={<Spinner />}>
        <SelectedPokemonPage />
      </Suspense>
    </Route>
  </>
);

const PokemonSelect = () => {
  const { pokemonOptions, selectedPokemonOption } = useVertexState({
    vertex: pokemonVertexConfig,
    fields: ["pokemonOptions", "selectedPokemonOption"],
  });
  const dispatch = useDispatch();
  const onPokemonSelected = (option: PokemonOption | null) =>
    dispatch(pokemonActions.selectPokemon(option));
  return (
    <div style={{ width: 300, color: "#333" }}>
      <Select
        placeholder="Select a pokemon"
        options={pokemonOptions}
        value={selectedPokemonOption}
        onChange={onPokemonSelected}
      />
    </div>
  );
};

const SelectedPokemonPage = () => {
  const {
    selectedPokemonName,
    pokemonDescriptionMatch,
    pokemonEvolutionsMatch,
  } = useVertexState({
    vertex: pokemonVertexConfig,
    fields: [
      "selectedPokemonName",
      "pokemonDescriptionMatch",
      "pokemonEvolutionsMatch",
    ],
  });
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
};
