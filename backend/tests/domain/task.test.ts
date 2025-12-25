import {
  InvalidTaskDescriptionError,
  InvalidTaskStatusError,
  InvalidTaskTitleError,
  Task
} from "../../src/domain";

describe("Task", () => {
  it("creates a task with default status", () => {
    const task = Task.create({
      id: "task-1",
      ownerId: "user-1",
      title: "Ship backend",
      createdAt: new Date("2024-01-02")
    });

    expect(task.getStatus()).toBe("todo");
  });

  it("rejects empty title", () => {
    expect(() =>
      Task.create({
        id: "task-1",
        ownerId: "user-1",
        title: " ",
        createdAt: new Date("2024-01-02")
      })
    ).toThrow(InvalidTaskTitleError);
  });

  it("rejects too long description", () => {
    expect(() =>
      Task.create({
        id: "task-1",
        ownerId: "user-1",
        title: "Valid",
        description: "x".repeat(1001),
        createdAt: new Date("2024-01-02")
      })
    ).toThrow(InvalidTaskDescriptionError);
  });

  it("rejects invalid status", () => {
    expect(() =>
      Task.create({
        id: "task-1",
        ownerId: "user-1",
        title: "Valid",
        status: "blocked",
        createdAt: new Date("2024-01-02")
      })
    ).toThrow(InvalidTaskStatusError);
  });

  it("updates status with valid value", () => {
    const task = Task.create({
      id: "task-1",
      ownerId: "user-1",
      title: "Valid",
      createdAt: new Date("2024-01-02")
    });

    task.changeStatus("done", new Date("2024-01-03"));

    expect(task.getStatus()).toBe("done");
  });
});
