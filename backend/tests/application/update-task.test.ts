import { Task } from "../../src/domain";
import {
  TaskAccessDeniedError,
  TaskNotFoundError,
  UpdateTask
} from "../../src/application";
import { FakeClock } from "./support/fakes";
import { InMemoryTaskRepository } from "./support/in-memory-repositories";

describe("UpdateTask", () => {
  it("updates task fields for owner", async () => {
    const tasks = new InMemoryTaskRepository();
    const task = Task.create({
      id: "task-1",
      ownerId: "user-1",
      title: "Draft",
      createdAt: new Date("2024-01-01")
    });
    await tasks.save(task);

    const useCase = new UpdateTask(tasks, new FakeClock(new Date("2024-01-05")));

    const result = await useCase.execute({
      taskId: "task-1",
      ownerId: "user-1",
      title: "Final",
      status: "done"
    });

    expect(result.title).toBe("Final");
    expect(result.status).toBe("done");
  });

  it("rejects missing task", async () => {
    const tasks = new InMemoryTaskRepository();
    const useCase = new UpdateTask(tasks, new FakeClock(new Date("2024-01-05")));

    await expect(
      useCase.execute({
        taskId: "missing",
        ownerId: "user-1",
        title: "Final"
      })
    ).rejects.toBeInstanceOf(TaskNotFoundError);
  });

  it("rejects updates from another user", async () => {
    const tasks = new InMemoryTaskRepository();
    const task = Task.create({
      id: "task-1",
      ownerId: "user-1",
      title: "Draft",
      createdAt: new Date("2024-01-01")
    });
    await tasks.save(task);

    const useCase = new UpdateTask(tasks, new FakeClock(new Date("2024-01-05")));

    await expect(
      useCase.execute({
        taskId: "task-1",
        ownerId: "user-2",
        title: "Final"
      })
    ).rejects.toBeInstanceOf(TaskAccessDeniedError);
  });
});
