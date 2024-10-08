import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { filter, first, map, mergeMap, of } from "rxjs";
import { rootVertexConfig } from "../../../rootVertexConfig";
import { PokemonOption } from "./PokemonOption";

const slice = createSlice({
  name: "example03b",
  initialState: { selectedOption: null as PokemonOption | null },
  reducers: {
    selectPokemon: (state, action: PayloadAction<PokemonOption | null>) => {
      state.selectedOption = action.payload;
    },
  },
});

export const example03b_Actions = slice.actions;

export const example03b_VertexConfig = rootVertexConfig
  .configureDownstreamVertex({ slice })
  .withDependencies(({ router, pokemonService }, vertex) =>
    vertex
      .load({
        pokemonOptions: router.examples[3].b.match$.pipe(
          filter(Boolean),
          first(),
          mergeMap(() => pokemonService.listAll()),
          map((list) =>
            list.map((_): PokemonOption => ({ label: _.name, value: _.url }))
          )
        ),
      })
      .loadFromFields(["selectedOption"], {
        pokemon: ({ selectedOption }) =>
          !selectedOption
            ? of(null)
            : pokemonService.loadByName(selectedOption.label),
      })
  );
