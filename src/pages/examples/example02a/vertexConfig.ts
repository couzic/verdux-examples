import { createSlice } from "@reduxjs/toolkit";
import { distinctUntilChanged, filter, map } from "rxjs";
import { rootVertexConfig } from "../../../rootVertexConfig";

export const example02a_VertexConfig = rootVertexConfig
  .configureDownstreamVertex({
    slice: createSlice({ name: "example02a", initialState: {}, reducers: {} }),
  })
  .withDependencies(({ router, pokemonService }, vertex) =>
    vertex
      .load({
        pokemonName: router.examples[2].a.match$.pipe(
          filter(Boolean),
          map(({ params }) => params["pokemon-name"]),
          distinctUntilChanged()
        ),
      })
      .loadFromFields(["pokemonName"], {
        pokemon: ({ pokemonName }) => pokemonService.findByName(pokemonName),
      })
  );

// Maybe later
// .loadFromStream(
//   ({ router }) =>
//     router.examples[2].a.match$.pipe(
//       filter(Boolean),
//       map(({ params }) => params["pokemon-name"]),
//       distinctUntilChanged()
//     ),
//   ({ pokemonService }) => ({
//     pokemon: (pokemonName) => pokemonService.findByName(pokemonName),
//   })
