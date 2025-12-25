import { CreateTask } from "../../src/application";
import { FakeClock, FakeIdGenerator } from "./support/fakes";
import { InMemoryTaskRepository } from "./support/in-memory-repositories";

describe("CreateTask", () => {
  it("creates a task for owner", async () => {
    const tasks = new InMemoryTaskRepository();
    const useCase = new CreateTask(
      tasks,
      new FakeIdGenerator(),
      new FakeClock(new Date("2024-01-10"))
    );

    const result = await useCase.execute({
      ownerId: "user-1",
      title: "Ship API",
      description: "Implement core endpoints"
    });

    expect(result.id).toBe("id-1");
    expect(result.ownerId).toBe("user-1");
    expect(result.status).toBe("todo");
  });
});
