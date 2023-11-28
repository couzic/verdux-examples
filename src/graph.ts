import { createGraph } from "verdux";
import { examplesVertexConfigs } from "./pages/examples/examplesVertexConfigs";

export const graph = createGraph({
  vertices: [...examplesVertexConfigs],
  devtools: (window as any).__VERDUX_DEVTOOLS_EXTENSION__,
});
