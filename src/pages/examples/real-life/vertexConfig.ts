import { createSlice } from "@reduxjs/toolkit";
import { map } from "rxjs";
import { rootVertexConfig } from "../../../rootVertexConfig";

const slice = createSlice({
  name: "realLifeExample",
  initialState: {},
  reducers: {},
});

export const realLifeExampleVertexConfig = rootVertexConfig
  .configureDownstreamVertex({
    slice,
  })
  .withDependencies(({ router }, config) =>
    config.load({
      pokemonTabMatch: router.examples.realLife.pokemon.match$.pipe(
        map(Boolean)
      ),
      aboutTabMatch: router.examples.realLife.about.match$.pipe(map(Boolean)),
    })
  );
