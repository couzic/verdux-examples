import { createSlice } from "@reduxjs/toolkit";
import { pokemonVertexConfig } from "../vertexConfig";

const slice = createSlice({
  name: "pokemonDescription",
  initialState: {},
  reducers: {},
});

export const pokemonDescriptionVertexConfig =
  pokemonVertexConfig.configureDownstreamVertex({
    slice,
    upstreamFields: ["selectedPokemon"],
  });
