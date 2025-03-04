import { useObservableEagerState } from "observable-hooks";
import { FC, PropsWithChildren } from "react";
import { Observable } from "rxjs";

export const Route: FC<
  PropsWithChildren<{
    match: { match$: Observable<null | { exact: boolean }> };
    exact?: boolean;
  }>
> = ({ match: route, exact, children }) => {
  const match = useObservableEagerState(route.match$);
  if (!match) return null;
  if (exact && !match.exact) return null;
  return <>{children}</>;
};
