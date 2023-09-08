import { History, createBrowserHistory } from "history";
import { createBrowserRouter, route } from "observable-tree-router";

export const createRouter = (history: History) =>
  createBrowserRouter(history, {
    home: route({ path: "/" }),
    examples: route({
      path: "/examples",
      nested: {
        "1": route({
          path: "/1",
          nested: {
            a: route({ path: "/a" }),
            b: route({ path: "/b" }),
          },
        }),
        "2": route({
          path: "/2",
          nested: {
            a: route({ path: "/a/:pokemon-name", params: ["pokemon-name"] }),
            b: route({ path: "/b/:pokemon-name", params: ["pokemon-name"] }),
          },
        }),
        "3": route({
          path: "/3",
          nested: {
            a: route({ path: "/a" }),
            b: route({ path: "/b" }),
            c: route({ path: "/c/:pokemon-name", params: ["pokemon-name"] }),
          },
        }),
        optimisticUpdates: route({
          path: "/optimistic-updates",
        }),
        nestedRoutes: route({
          path: "/nested-routes",
          nested: {
            app: route({
              path: "/app",
              nested: {
                services: route({
                  path: "/services",
                  nested: {
                    detail: route({
                      path: "/:serviceId",
                      params: ["serviceId"],
                    }),
                  },
                }),
              },
            }),
          },
        }),
      },
    }),
  });

export type Router = ReturnType<typeof createRouter>;

export const router = createRouter(createBrowserHistory());
