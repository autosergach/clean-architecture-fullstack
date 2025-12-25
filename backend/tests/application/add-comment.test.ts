import { AddComment, TaskNotFoundError } from "../../src/application";
import { Task } from "../../src/domain";
import { FakeClock, FakeIdGenerator } from "./support/fakes";
import { InMemoryCommentRepository, InMemoryTaskRepository } from "./support/in-memory-repositories";

describe("AddComment", () => {
  it("adds a comment to existing task", async () => {
    const tasks = new InMemoryTaskRepository();
    const comments = new InMemoryCommentRepository();
    const task = Task.create({
      id: "task-1",
      ownerId: "user-1",
      title: "Ship API",
      createdAt: new Date("2024-01-01")
    });
    await tasks.save(task);

    const useCase = new AddComment(
      tasks,
      comments,
      new FakeIdGenerator(),
      new FakeClock(new Date("2024-01-10"))
    );

    const result = await useCase.execute({
      taskId: "task-1",
      authorId: "user-2",
      body: "Looks good."
    });

    expect(result.id).toBe("id-1");
    expect(result.body).toBe("Looks good.");
  });

  it("rejects missing task", async () => {
    const tasks = new InMemoryTaskRepository();
    const comments = new InMemoryCommentRepository();
    const useCase = new AddComment(
      tasks,
      comments,
      new FakeIdGenerator(),
      new FakeClock(new Date("2024-01-10"))
    );

    await expect(
      useCase.execute({
        taskId: "missing",
        authorId: "user-2",
        body: "Looks good."
      })
    ).rejects.toBeInstanceOf(TaskNotFoundError);
  });
});
