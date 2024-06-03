import { UnknownAction } from "@reduxjs/toolkit";
import { FC, useContext } from "react";
import { VertexConfig, VertexInstance } from "verdux";
import { VertexFieldsDefinition } from "verdux/lib/config/VertexFieldsDefinition";
import { GraphContext } from "./GraphContext";
import { loadableStateComponent } from "./loadableStateComponent";

export const loadableComponent =
  <
    Fields extends VertexFieldsDefinition,
    PickedFields extends keyof Fields
  >(options: {
    vertexConfig: VertexConfig<Fields>;
    fields: PickedFields[];
    component: FC<
      { [F in PickedFields]: Fields[F]["value"] } & {
        dispatch: (action: UnknownAction) => void;
      }
    >;
  }): FC<{}> =>
  () => {
    const graph = useContext(GraphContext);
    if (!graph) return null;
    let vertex: VertexInstance<Fields, any> | undefined;
    let error: Error | undefined;
    try {
      vertex = graph.getVertexInstance(options.vertexConfig);
    } catch (e: any) {
      error = e;
    }
    if (!vertex) {
      console.error(
        "Error connecting component to vertex instance: Vertex config " +
          options.vertexConfig.name +
          " was probably not passed to graph constructor",
        { error }
      );
      return null;
    }
    const dispatch = (action: UnknownAction) => graph.dispatch(action);
    const loadableState$ = vertex.pick(options.fields);
    const Component = loadableStateComponent(
      loadableState$,
      options.component as any
    );
    return <Component dispatch={dispatch} />;
  };
