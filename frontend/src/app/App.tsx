import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./app.css";
import { Badge, Button } from "../shared/ui";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { useAuthStore } from "../features/auth/model/auth-store";

function Dashboard(): JSX.Element {
  const { logout } = useAuthStore();
  return (
    <div className="app__panel">
      <Badge>Authenticated</Badge>
      <h1>You're signed in.</h1>
      <p>Next: task list and collaboration features.</p>
      <div className="app__row">
        <Button onClick={logout} variant="ghost">
          Sign out
        </Button>
      </div>
    </div>
  );
}

function ProtectedRoute({ children }: { children: JSX.Element }): JSX.Element {
  const { status } = useAuthStore();
  if (status !== "authenticated") {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export function App(): JSX.Element {
  const { hydrate } = useAuthStore();

  React.useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <BrowserRouter>
      <div className="app">
        <header className="app__header">
          <div className="app__logo">Task Manager</div>
          <div className="app__meta">Clean Architecture Demo</div>
        </header>
        <main className="app__content">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
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
