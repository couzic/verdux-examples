import { FC } from "react";

export const Tabs: FC<any> = ({ children }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-evenly",
      marginBottom: 30,
    }}
  >
    {children}
  </div>
);

export const Tab: FC<{
  onClick: () => void;
  active: boolean;
  text: string;
}> = ({ onClick, active, text }) => (
  <div
    onClick={active ? undefined : onClick}
    style={{
      borderBottom: active ? "2px solid grey" : undefined,
      cursor: "pointer",
    }}
  >
    <h3>{text}</h3>
  </div>
);
