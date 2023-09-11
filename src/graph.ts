import { createGraph } from "verdux";
import { examplesVertexConfigs } from "./pages/examples/examplesVertexConfigs";

export const graph = createGraph({
  vertices: examplesVertexConfigs,
});
