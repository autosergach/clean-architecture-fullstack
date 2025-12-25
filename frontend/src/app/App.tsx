import "./app.css";

export function App(): JSX.Element {
  return (
    <div className="app">
      <header className="app__header">
        <div className="app__logo">Task Manager</div>
        <div className="app__meta">Clean Architecture Demo</div>
      </header>
      <main className="app__content">
        <section className="app__panel">
          <h1>Frontend foundation is ready.</h1>
          <p>
            Next: design system, auth flow, and task management UI wired to the API.
          </p>
        </section>
      </main>
    </div>
  );
}
