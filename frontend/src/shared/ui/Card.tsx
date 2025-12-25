import "./card.css";
import type React from "react";

export function Card({ children }: React.PropsWithChildren): JSX.Element {
  return <div className="card">{children}</div>;
}
