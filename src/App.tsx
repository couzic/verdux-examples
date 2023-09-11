import "./App.css";
import { GraphContext } from "./common/GraphContext";
import { graph } from "./graph";
import { ExamplesPage } from "./pages/examples/ExamplesPage";
import { HomePage } from "./pages/home/HomePage";

function App() {
  return (
    <GraphContext.Provider value={graph}>
      <HomePage />
      <ExamplesPage />
    </GraphContext.Provider>
  );
}

export default App;
