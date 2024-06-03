import { createSlice } from "@reduxjs/toolkit";
import { pokemonVertexConfig } from "../vertexConfig";

const slice = createSlice({
  name: "pokemonEvolutions",
  initialState: {},
  reducers: {},
});

export const pokemonEvolutionsVertexConfig =
  pokemonVertexConfig.configureDownstreamVertex({
    slice,
  });
