import "./toast.css";
import type React from "react";

interface ToastProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function Toast({ title, description, action }: ToastProps): JSX.Element {
  return (
    <div className="toast" role="status">
      <div>
        <strong>{title}</strong>
        {description ? <div>{description}</div> : null}
      </div>
      {action}
    </div>
  );
}
