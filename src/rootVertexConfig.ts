import { createSlice } from "@reduxjs/toolkit";
import { configureRootVertex } from "verdux";
import { createPokemonService } from "./pages/examples/pokemon/PokemonService";
import { router } from "./router/createRouter";

export const rootVertexConfig = configureRootVertex({
  slice: createSlice({
    name: "root",
    initialState: {},
    reducers: {},
  }),
  dependencies: {
    router: () => router,
    pokemonService: createPokemonService,
  },
});
