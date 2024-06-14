import { filter, first, mergeMap } from "rxjs";
import { rootVertexConfig } from "../../../rootVertexConfig";
import { createSlice } from "@reduxjs/toolkit";

export const example01a_VertexConfig = rootVertexConfig
  .configureDownstreamVertex({
    slice: createSlice({ name: "example01a", initialState: {}, reducers: {} }),
  })
  .withDependencies(({ router, pokemonService }, config) =>
    config.load({
      pokemon: router.examples[1].a.match$.pipe(
        filter(Boolean), // Positive matches only => route is entered
        first(),
        mergeMap(() => pokemonService.findByName("pikachu"))
      ),
    })
  );
