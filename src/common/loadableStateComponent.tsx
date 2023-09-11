import { state as componentState, useStateObservable } from "@react-rxjs/core";
import { AnyAction } from "@reduxjs/toolkit";
import React from "react";
import { Observable } from "rxjs";
import { VertexLoadableState, VertexLoadedState } from "verdux";
import { VertexType } from "verdux/lib/VertexType";
import { Spinner } from "./Spinner";

export function loadableStateComponent<Type extends VertexType>(
  loadableState$: Observable<VertexLoadableState<Type>>,
  Component: React.FC<VertexLoadedState<Type>>
): React.FC<{ dispatch: (action: AnyAction) => void }> {
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
    return <Component {...(loadableState.state as any)} dispatch={dispatch} />;
  };
}
