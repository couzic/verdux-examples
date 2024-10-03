import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { distinctUntilChanged, filter, first, map, mergeMap, of } from "rxjs";
import { asSequence } from "sequency";
import { PokemonName } from "../../pokemon/Pokemon";
import { realLifeExampleVertexConfig } from "../vertexConfig";
import { PokemonOption } from "./PokemonOption";

const initialState = { selectedOption: null } as {
  selectedOption: PokemonOption | null;
};

const slice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    selectPokemon: (state, action: PayloadAction<PokemonOption | null>) => {
      state.selectedOption = action.payload;
    },
  },
});

export const pokemonActions = slice.actions;

export const pokemonVertexConfig = realLifeExampleVertexConfig
  .configureDownstreamVertex({
    slice,
    upstreamFields: ["pokemonTabMatch"],
  })
  .withDependencies(({ router, pokemonService }, vertex) =>
    vertex
      .load({
        pokemonDescriptionMatch:
          router.examples.realLife.pokemon.selected.description.match$.pipe(
            map(Boolean)
          ),
        pokemonEvolutionsMatch:
          router.examples.realLife.pokemon.selected.evolutions.match$.pipe(
            map(Boolean)
          ),
      })
      .load({
        pokemonOptions: router.examples.realLife.pokemon.match$.pipe(
          filter(Boolean),
          first(),
          mergeMap(() => pokemonService.listAll()),
          map((list) =>
            list.map((_): PokemonOption => ({ label: _.name, value: _.url }))
          )
        ),
        selectedPokemonName:
          router.examples.realLife.pokemon.selected.match$.pipe(
            // filter(Boolean),
            map((match) =>
              match ? (match.params["pokemon-name"] as PokemonName) : null
            ),
            distinctUntilChanged()
          ),
      })
      .computeFromFields(["pokemonOptions", "selectedPokemonName"], {
        selectedPokemonOption: ({ pokemonOptions, selectedPokemonName }) =>
          asSequence(pokemonOptions || []).find(
            (_) => _.label === selectedPokemonName
          ),
      })
      .sideEffect(pokemonActions.selectPokemon, ({ payload: pokemon }) => {
        if (pokemon) {
          router.examples.realLife.pokemon.selected.description.push({
            "pokemon-name": pokemon.label,
          });
        }
      })
      .loadFromFields(["selectedPokemonName"], {
        selectedPokemon: ({ selectedPokemonName }) =>
          selectedPokemonName
            ? pokemonService.loadByName(selectedPokemonName)
            : of(null),
      })
      .computeFromFields(["selectedPokemon"], {
        selectedPokemonImage: ({ selectedPokemon }) => selectedPokemon?.imgUrl,
      })
  );
