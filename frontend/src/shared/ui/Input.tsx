import "./input.css";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ hasError, className, ...rest }, ref) => {
    const classes = ["input", hasError ? "input--error" : null, className]
      .filter(Boolean)
      .join(" ");
    return <input ref={ref} className={classes} {...rest} />;
  }
);

Input.displayName = "Input";
