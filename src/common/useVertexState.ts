import { ObservableResource, useObservableSuspense } from "observable-hooks";
import { useContext, useMemo } from "react";
import { VertexConfig, VertexFieldsDefinition, VertexInstance } from "verdux";
import { GraphContext } from "./GraphContext";

export const useVertexState = <
  Fields extends VertexFieldsDefinition,
  PickedFields extends keyof Fields
>(options: {
  vertex: VertexConfig<Fields>;
  fields: PickedFields[];
}) => {
  const graph = useContext(GraphContext);
  if (!graph) throw new Error("GraphContext not found");
  let vertex: VertexInstance<Fields, any> | undefined;
  try {
    vertex = graph.getVertexInstance(options.vertex);
  } catch (e: any) {
    console.error(e);
  }
  if (!vertex) {
    throw new Error(
      "Error connecting component to vertex instance: Vertex config " +
        options.vertex.name +
        " was probably not passed to graph constructor"
    );
  }
  const resource = useMemo(
    () =>
      new ObservableResource(
        vertex.pick(options.fields),
        (_: any) => _.status === "loaded"
      ),
    []
  );
  const loadableState = useObservableSuspense(resource);
  if (loadableState.status !== "loaded") throw new Error("SHOULD NEVER HAPPEN");
  return loadableState.state;
};
