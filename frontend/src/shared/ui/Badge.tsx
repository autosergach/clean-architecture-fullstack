import "./badge.css";
import type React from "react";

export function Badge({ children }: React.PropsWithChildren): JSX.Element {
  return <span className="badge">{children}</span>;
}
