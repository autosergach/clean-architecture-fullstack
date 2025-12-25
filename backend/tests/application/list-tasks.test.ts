import { ListTasks } from "../../src/application";
import { InMemoryTaskRepository } from "./support/in-memory-repositories";
import { Task } from "../../src/domain";

describe("ListTasks", () => {
  it("filters tasks by status and search", async () => {
    const tasks = new InMemoryTaskRepository();
    const taskA = Task.create({
      id: "task-1",
      ownerId: "user-1",
      title: "Ship API",
      description: "Backend tasks",
      status: "in_progress",
      createdAt: new Date("2024-01-01")
    });
    const taskB = Task.create({
      id: "task-2",
      ownerId: "user-1",
      title: "Write docs",
      description: "Documentation",
      status: "done",
      createdAt: new Date("2024-01-01")
    });
    await tasks.save(taskA);
    await tasks.save(taskB);

    const useCase = new ListTasks(tasks);

    const result = await useCase.execute({
      ownerId: "user-1",
      status: "done",
      search: "docs"
    });

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("task-2");
  });
});
