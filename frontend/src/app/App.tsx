import "./app.css";
import { Badge, Button, Card, Input, Spinner, Toast } from "../shared/ui";

export function App(): JSX.Element {
  return (
    <div className="app">
      <header className="app__header">
        <div className="app__logo">Task Manager</div>
        <div className="app__meta">Clean Architecture Demo</div>
      </header>
      <main className="app__content">
        <section className="app__panel">
          <Badge>Design tokens online</Badge>
          <h1>Frontend foundation is ready.</h1>
          <p>
            This UI kit is the base for auth, tasks, and collaboration features.
          </p>
          <div className="app__stack">
            <Card>
              <div className="app__row">
                <Input placeholder="Search tasks" />
                <Button variant="ghost">Filter</Button>
                <Button>Create task</Button>
              </div>
            </Card>
            <div className="app__row">
              <Toast
                title="Live API ready"
                description="NestJS backend is running with Swagger docs."
                action={<Button variant="ghost">Open docs</Button>}
              />
              <Spinner />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
