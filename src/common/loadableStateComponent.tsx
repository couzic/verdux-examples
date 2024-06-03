import { state as componentState, useStateObservable } from "@react-rxjs/core";
import { UnknownAction } from "@reduxjs/toolkit";
import React from "react";
import { Observable } from "rxjs";
import { VertexLoadableState, VertexLoadedState } from "verdux";
import { VertexFieldsDefinition } from "verdux/lib/config/VertexFieldsDefinition";
import { Spinner } from "./Spinner";

export function loadableStateComponent<Fields extends VertexFieldsDefinition>(
  loadableState$: Observable<VertexLoadableState<Fields>>,
  Component: React.FC<VertexLoadedState<Fields>>
): React.FC<{ dispatch: (action: UnknownAction) => void }> {
  const componentState$ = componentState(loadableState$, null);
  return ({ dispatch }) => {
    const loadableState = useStateObservable(componentState$);
    if (loadableState === null) return null;
    if (loadableState.status === "loading") return <Spinner />;
    if (loadableState.status === "error")
      return (
        <h3>
          Errors:{" "}
          {JSON.stringify(loadableState.errors.map((error) => error.message))}
        </h3>
      );
    return <Component {...loadableState.state} dispatch={dispatch} />;
  };
}
