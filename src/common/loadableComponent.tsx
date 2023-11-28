import { AnyAction } from "@reduxjs/toolkit";
import { FC, useContext } from "react";
import {
  // TODO VertexType,
  PickedLoadedVertexState,
  VertexConfig,
  VertexInstance,
  VertexStateKey,
} from "verdux";
import { VertexType } from "verdux/lib/VertexType"; // TODO Remove this import
import { GraphContext } from "./GraphContext";
import { loadableStateComponent } from "./loadableStateComponent";

export const loadableComponent =
  <
    Type extends VertexType,
    PickedFields extends VertexStateKey<Type>
  >(options: {
    vertexConfig: VertexConfig<Type>;
    fields: PickedFields[];
    component: FC<
      PickedLoadedVertexState<Type, PickedFields> & {
        dispatch: (action: AnyAction) => void;
      }
    >;
  }): FC<{}> =>
  () => {
    const graph = useContext(GraphContext);
    if (!graph) return null;
    let vertex: VertexInstance<Type> | undefined;
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
    const dispatch = (action: AnyAction) => graph.dispatch(action);
    const loadableState$ = vertex.pick(options.fields);
    const Component = loadableStateComponent(
      loadableState$,
      options.component as any
    );
    return <Component dispatch={dispatch} />;
  };
