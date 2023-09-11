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
  // TODO implement effects (maybe using RTK listener middleware ?)
  // .sideEffects({
  //   selectPokemon: (option) => {
  //     if (option) {
  //       route.push({ "pokemon-name": option.label });
  //     }
  //   },
  // })
  .computeFromFields(["pokemonOptions", "selectedPokemonName"], {
    // TODO it should be a loadable field, since it is computed based on loadable field values
    selectedPokemonOption: ({ pokemonOptions, selectedPokemonName }) => {
      return asSequence(pokemonOptions || []).find(
        (_) => _.label === selectedPokemonName
      );
    },
  })
  .loadFromFields(["selectedPokemonName"], ({ pokemonService }) => ({
    pokemon: ({ selectedPokemonName }) =>
      pokemonService.loadByName(selectedPokemonName),
  }));
