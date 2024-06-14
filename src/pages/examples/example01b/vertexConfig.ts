import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { debounceTime, map, of, pipe, switchMap } from "rxjs";
import { rootVertexConfig } from "../../../rootVertexConfig";

const slice = createSlice({
  name: "example01b",
  initialState: { searchedPokemonName: "" },
  reducers: {
    inputValueChanged: (state, action: PayloadAction<string>) => {
      state.searchedPokemonName = action.payload;
    },
  },
});

export const example01b_actions = slice.actions;

export const example01b_VertexConfig = rootVertexConfig
  .configureDownstreamVertex({ slice })
  .withDependencies(({ pokemonService }, config) =>
    config.loadFromFields$(["searchedPokemonName"], {
      pokemon: pipe(
        map((_) => _.searchedPokemonName),
        map((_) => _.trim().toLowerCase()),
        debounceTime(500),
        switchMap((_) =>
          _.length === 0
            ? of("empty input" as const)
            : pokemonService.findByName(_)
        )
      ),
    })
  );
