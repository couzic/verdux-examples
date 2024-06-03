import { route } from "observable-tree-router";

export const realLifeRoute = route({
  path: "/real-life",
  nested: {
    pokemon: route({
      path: "/pokemon",
      nested: {
        selected: route({
          path: "/:pokemon-name",
          params: ["pokemon-name"],
          nested: {
            description: route({ path: "/description" }),
            evolutions: route({ path: "/evolutions" }),
          },
        }),
      },
    }),
    about: route({ path: "/about" }),
  },
});
