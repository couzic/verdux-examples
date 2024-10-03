import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { of } from "rxjs";
import { rootVertexConfig } from "../../../rootVertexConfig";
import { PokemonOption } from "./PokemonOption";

const slice = createSlice({
  name: "example03a",
  initialState: { selectedOption: null as PokemonOption | null },
  reducers: {
    selectPokemon: (state, action: PayloadAction<PokemonOption | null>) => {
      state.selectedOption = action.payload;
    },
  },
});

export const example03a_Actions = slice.actions;

export const example03a_VertexConfig = rootVertexConfig
  .configureDownstreamVertex({ slice })
  .withDependencies(({ pokemonService }, vertex) =>
    vertex.loadFromFields(["selectedOption"], {
      pokemon: ({ selectedOption }) =>
        !selectedOption
          ? of(null)
          : pokemonService.loadByName(selectedOption.label),
    })
  );
