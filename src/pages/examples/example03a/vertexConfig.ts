import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { of } from "rxjs";
import { rootVertexConfig } from "../../../rootVertexConfig";
import { PokemonId, PokemonName } from "../pokemon/Pokemon";

interface PokemonOption {
  label: PokemonName;
  value: PokemonId;
}

const initialState = { selectedOption: null } as {
  selectedOption: PokemonOption | null;
};

const slice = createSlice({
  name: "example03a",
  initialState,
  reducers: {
    selectPokemon: (state, action: PayloadAction<PokemonOption | null>) => {
      state.selectedOption = action.payload;
    },
  },
});

export const example03a_Actions = slice.actions;

export const example03a_VertexConfig = rootVertexConfig
  .configureDownstreamVertex({ slice })
  .loadFromFields(["selectedOption"], ({ pokemonService }) => ({
    pokemon: ({ selectedOption }) =>
      !selectedOption
        ? of(null)
        : pokemonService.loadByName(selectedOption.label),
  }));
