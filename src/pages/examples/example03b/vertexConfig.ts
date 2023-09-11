import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { filter, first, map, mergeMap, of } from "rxjs";
import { rootVertexConfig } from "../../../rootVertexConfig";
import { PokemonOption } from "./PokemonOption";

const initialState = { selectedOption: null } as {
  selectedOption: PokemonOption | null;
};

const slice = createSlice({
  name: "example03b",
  initialState,
  reducers: {
    selectPokemon: (state, action: PayloadAction<PokemonOption | null>) => {
      state.selectedOption = action.payload;
    },
  },
});

export const example03b_Actions = slice.actions;

export const example03b_VertexConfig = rootVertexConfig
  .configureDownstreamVertex({ slice })
  .load(({ pokemonService, router }) => ({
    pokemonOptions: router.examples[3].b.match$.pipe(
      filter(Boolean),
      first(),
      mergeMap(() => pokemonService.listAll()),
      map((list) =>
        list.map((_): PokemonOption => ({ label: _.name, value: _.url }))
      )
    ),
  }))
  .loadFromFields(["selectedOption"], ({ pokemonService }) => ({
    pokemon: ({ selectedOption }) =>
      !selectedOption
        ? of(null)
        : pokemonService.loadByName(selectedOption.label),
  }));
