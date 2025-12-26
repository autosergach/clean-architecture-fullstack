import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./app.css";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { TasksPage } from "../pages/TasksPage";
import { useAuthStore } from "../features/auth/model/auth-store";
import { Button } from "../shared/ui";

function ProtectedRoute({ children }: { children: JSX.Element }): JSX.Element {
  const { status } = useAuthStore();
  if (status !== "authenticated") {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export function App(): JSX.Element {
  const { hydrate, status, logout } = useAuthStore();

  React.useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <BrowserRouter>
      <div className="app">
        <header className="app__header">
          <div className="app__logo">Task Manager</div>
          <div className="app__header-actions">
            <div className="app__meta">Clean Architecture Demo</div>
            {status === "authenticated" ? (
              <Button variant="ghost" onClick={logout}>
                Sign out
              </Button>
            ) : null}
          </div>
        </header>
        <main className="app__content">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <TasksPage />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
