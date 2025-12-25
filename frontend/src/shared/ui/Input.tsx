import "./input.css";
import type React from "react";

export function Input(
  props: React.InputHTMLAttributes<HTMLInputElement>
): JSX.Element {
  return <input className="input" {...props} />;
}
