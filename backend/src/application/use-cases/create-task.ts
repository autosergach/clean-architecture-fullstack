import { Task } from "../../domain";
import { Clock } from "../ports/clock";
import { IdGenerator } from "../ports/id-generator";
import { TaskRepository } from "../ports/task-repository";

export interface CreateTaskInput {
  ownerId: string;
  title: string;
  description?: string;
  status?: string;
}

export interface TaskView {
  id: string;
  ownerId: string;
  title: string;
  description?: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export class CreateTask {
  constructor(
    private readonly tasks: TaskRepository,
    private readonly ids: IdGenerator,
    private readonly clock: Clock
  ) {}

  public async execute(input: CreateTaskInput): Promise<TaskView> {
    const now = this.clock.now();
    const task = Task.create({
      id: this.ids.generate(),
      ownerId: input.ownerId,
      title: input.title,
      description: input.description,
      status: input.status,
      createdAt: now
    });

    await this.tasks.save(task);

    return CreateTask.toView(task);
  }

  public static toView(task: Task): TaskView {
    return {
      id: task.getId(),
      ownerId: task.getOwnerId(),
      title: task.getTitle(),
      description: task.getDescription(),
      status: task.getStatus(),
      createdAt: task.getCreatedAt(),
      updatedAt: task.getUpdatedAt()
    };
  }
}
