import { Route } from "../../common/Route";
import { router } from "../../router/createRouter";
import { Example01a } from "./example01a/Example01a";
import { Example01b } from "./example01b/Example01b";
import { Example02a } from "./example02a/Example02a";
import { Example02b } from "./example02b/Example02b";
import { Example03a } from "./example03a/Example03a";
import { Example03b } from "./example03b/Example03b";
import { Example03c } from "./example03c/Example03c";
import { RealLifeExample } from "./real-life/RealLifeExample";

const goHome = () => router.home.push();

export const ExamplesPage = () => (
  <Route match={router.examples}>
    <button onClick={goHome}>Home</button>
    <Example01a />
    <Example01b />
    <Example02a />
    <Example02b />
    <Example03a />
    <Example03b />
    <Example03c />
    <RealLifeExample />
  </Route>
);
