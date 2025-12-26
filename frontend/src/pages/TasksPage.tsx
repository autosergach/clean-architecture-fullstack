import { useEffect, useMemo, useState } from "react";
import { useAuthStore } from "../features/auth/model/auth-store";
import { useTasksStore } from "../features/tasks/model/tasks-store";
import { Badge, Button, Card, Input, Toast } from "../shared/ui";
import type { TaskStatus } from "../features/tasks/api/tasks-api";
import "./tasks.css";

const statusLabels: Record<TaskStatus, string> = {
  todo: "To do",
  in_progress: "In progress",
  done: "Done"
};

export function TasksPage(): JSX.Element {
  const token = useAuthStore((state) => state.token);
  const { items, status, error, load, create, updateStatus, addComment } =
    useTasksStore();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "all">("all");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [commentBody, setCommentBody] = useState<Record<string, string>>({});

  useEffect(() => {
    if (token) {
      load(token);
    }
  }, [token, load]);

  const filtered = useMemo(() => {
    return items.filter((task) => {
      if (statusFilter !== "all" && task.status !== statusFilter) {
        return false;
      }
      if (!search) {
        return true;
      }
      const haystack = `${task.title} ${task.description ?? ""}`.toLowerCase();
      return haystack.includes(search.toLowerCase());
    });
  }, [items, search, statusFilter]);

  const onCreate = async () => {
    if (!token || !title.trim()) {
      return;
    }
    await create(token, { title, description });
    setTitle("");
    setDescription("");
  };

  const onComment = async (taskId: string) => {
    if (!token) {
      return;
    }
    const body = commentBody[taskId]?.trim();
    if (!body) {
      return;
    }
    await addComment(token, taskId, body);
    setCommentBody((prev) => ({ ...prev, [taskId]: "" }));
  };

  return (
    <div className="tasks">
      <div className="tasks__header">
        <div>
          <Badge>Tasks</Badge>
          <h1>Delivery board</h1>
          <p>Track execution, change status, and add quick notes.</p>
        </div>
        <Button onClick={() => load(token ?? "")} variant="ghost">
          Refresh
        </Button>
      </div>

      <Card>
        <div className="tasks__filters">
          <Input
            placeholder="Search tasks"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <div className="tasks__filter-row">
            {(["all", "todo", "in_progress", "done"] as const).map((statusKey) => (
              <Button
                key={statusKey}
                variant={statusFilter === statusKey ? "primary" : "ghost"}
                onClick={() => setStatusFilter(statusKey)}
              >
                {statusKey === "all" ? "All" : statusLabels[statusKey]}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      <Card>
        <div className="tasks__create">
          <Input
            placeholder="Task title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <Input
            placeholder="Optional description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <Button onClick={onCreate}>Create task</Button>
        </div>
      </Card>

      {status === "error" && error ? (
        <Toast title="Failed to load tasks" description={error} />
      ) : null}

      <div className="tasks__list">
        {status === "loading" ? <p>Loading...</p> : null}
        {status === "ready" && filtered.length === 0 ? (
          <p>No tasks yet. Create the first one.</p>
        ) : null}
        {filtered.map((task) => (
          <Card key={task.id}>
            <div className="tasks__item">
              <div className="tasks__item-main">
                <strong>{task.title}</strong>
                <span>{task.description}</span>
              </div>
              <div className="tasks__item-actions">
                {(["todo", "in_progress", "done"] as TaskStatus[]).map((statusKey) => (
                  <Button
                    key={statusKey}
                    variant={task.status === statusKey ? "primary" : "ghost"}
                    onClick={() => token && updateStatus(token, task.id, statusKey)}
                  >
                    {statusLabels[statusKey]}
                  </Button>
                ))}
              </div>
            </div>
            <div className="tasks__comment">
              <Input
                placeholder="Add comment"
                value={commentBody[task.id] ?? ""}
                onChange={(event) =>
                  setCommentBody((prev) => ({ ...prev, [task.id]: event.target.value }))
                }
              />
              <Button variant="ghost" onClick={() => onComment(task.id)}>
                Add
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
