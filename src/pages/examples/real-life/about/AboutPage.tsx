import { Route } from "../../../../common/Route";
import { router } from "../../../../router/createRouter";

export const AboutPage = () => (
  <Route match={router.examples.realLife.about}>
    <h3>AboutPage</h3>
  </Route>
);
