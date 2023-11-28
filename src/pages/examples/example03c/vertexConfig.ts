import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { filter, first, map, mergeMap } from "rxjs";
import { asSequence } from "sequency";
import { rootVertexConfig } from "../../../rootVertexConfig";
import { PokemonName } from "../pokemon/Pokemon";
import { PokemonOption } from "./PokemonOption";

const initialState = { selectedOption: null } as {
  selectedOption: PokemonOption | null;
};

const slice = createSlice({
  name: "example03c",
  initialState,
  reducers: {
    selectPokemon: (state, action: PayloadAction<PokemonOption | null>) => {
      state.selectedOption = action.payload;
    },
  },
});

export const example03c_Actions = slice.actions;

export const example03c_VertexConfig = rootVertexConfig
  .configureDownstreamVertex({ slice })
  .load(({ router, pokemonService }) => ({
    pokemonOptions: router.examples[3].c.match$.pipe(
      filter(Boolean),
      first(),
      mergeMap(() => pokemonService.listAll()),
      map((list) =>
        list.map((_): PokemonOption => ({ label: _.name, value: _.url }))
      )
    ),
    selectedPokemonName: router.examples[3].c.match$.pipe(
      filter(Boolean),
      map((match) => match.params["pokemon-name"] as PokemonName)
    ),
  }))
  .sideEffect(example03c_Actions.selectPokemon, (pokemon, vertex) => {
    if (pokemon) {
      vertex.dependencies.router.examples[3].c.push({
        "pokemon-name": pokemon.label,
      });
    }
  })
  .computeFromFields(["pokemonOptions", "selectedPokemonName"], {
    selectedPokemonOption: ({ pokemonOptions, selectedPokemonName }) =>
      asSequence(pokemonOptions || []).find(
        (_) => _.label === selectedPokemonName
      ),
  })
  .loadFromFields(["selectedPokemonName"], ({ pokemonService }) => ({
    pokemon: ({ selectedPokemonName }) =>
      pokemonService.loadByName(selectedPokemonName),
  }));
