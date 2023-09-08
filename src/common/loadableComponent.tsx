import { state as componentState, useStateObservable } from "@react-rxjs/core";
import React from "react";
import { Observable } from "rxjs";
import { VertexLoadableState, VertexLoadedState } from "verdux";
import { VertexType } from "verdux/lib/VertexType";
import { Spinner } from "./Spinner";

export function loadableComponent<Type extends VertexType>(
  loadableState$: Observable<VertexLoadableState<Type>>,
  Component: React.FC<VertexLoadedState<Type>>
): React.FC<{}> {
  const componentState$ = componentState(loadableState$, null);
  return () => {
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
    return <Component {...(loadableState.state as any)} />;
  };
}
