import { createSlice } from "@reduxjs/toolkit";
import { distinctUntilChanged, filter, map, of } from "rxjs";
import { PokemonName } from "../../../pokemon/Pokemon";
import { pokemonVertexConfig } from "../vertexConfig";

const slice = createSlice({
  name: "pokemonEvolutions",
  initialState: {},
  reducers: {},
});

export const pokemonEvolutionsVertexConfig = pokemonVertexConfig
  .configureDownstreamVertex({
    slice,
    upstreamFields: ["selectedPokemon"],
  })
  .withDependencies(({ pokemonService, router }, config) =>
    config
      .load({
        evolutionsPokemonNameParam:
          router.examples.realLife.pokemon.selected.evolutions.match$.pipe(
            filter(Boolean),
            map(({ params }) => params["pokemon-name"] as PokemonName),
            distinctUntilChanged()
          ),
      })
      .computeFromFields(["evolutionsPokemonNameParam", "selectedPokemon"], {
        selectedPokemonForEvolutions: ({
          evolutionsPokemonNameParam,
          selectedPokemon,
        }) =>
          !selectedPokemon ||
          selectedPokemon.name !== evolutionsPokemonNameParam
            ? null
            : selectedPokemon,
      })
      .loadFromFields(["selectedPokemonForEvolutions"], {
        evolvesFrom: ({ selectedPokemonForEvolutions }) =>
          !selectedPokemonForEvolutions
            ? of(null)
            : pokemonService.getEvolvesFrom(selectedPokemonForEvolutions.id),
        evolvesTo: ({ selectedPokemonForEvolutions }) =>
          !selectedPokemonForEvolutions
            ? of(null)
            : pokemonService.getEvolvesTo(selectedPokemonForEvolutions.id),
      })
  );
