import { Route } from "../../common/Route";
import { router } from "../../router/Router";
import { Example01a } from "./Example01a";
import { Example01b } from "./Example01b";
import { Example02a } from "./Example02a";

const goHome = () => router.home.push();

export const ExamplesPage = () => (
  <Route match={router.examples}>
    <button onClick={goHome}>Home</button>
    <Example01a />
    <Example01b />
    <Example02a />
  </Route>
);
