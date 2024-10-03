import { createSlice } from "@reduxjs/toolkit";
import { distinctUntilChanged, filter, map, of } from "rxjs";
import { rootVertexConfig } from "../../../rootVertexConfig";

export const example02b_VertexConfig = rootVertexConfig
  .configureDownstreamVertex({
    slice: createSlice({ name: "example02b", initialState: {}, reducers: {} }),
  })
  .withDependencies(({ router, pokemonService }, vertex) =>
    vertex
      .load({
        pokemonName: router.examples[2].b.match$.pipe(
          filter(Boolean),
          map(({ params }) => params["pokemon-name"]),
          distinctUntilChanged()
        ),
      })
      .loadFromFields(["pokemonName"], {
        pokemon: ({ pokemonName }) => pokemonService.findByName(pokemonName),
      })
      .loadFromFields(["pokemon"], {
        evolvesFrom: ({ pokemon }) =>
          !pokemon ? of(null) : pokemonService.getEvolvesFrom(pokemon.id),
        evolvesTo: ({ pokemon }) =>
          !pokemon ? of([]) : pokemonService.getEvolvesTo(pokemon.id),
      })
  );

// Maybe later
// .loadFromStream(
//   ({ router }) =>
//     router.examples[2].b.match$.pipe(
//       filter(Boolean),
//       map(({ params }) => params["pokemon-name"]),
//       distinctUntilChanged()
//     ),
//   ({ pokemonService }) => ({
//     pokemon: (pokemonName) => pokemonService.findByName(pokemonName),
//   })
// )
