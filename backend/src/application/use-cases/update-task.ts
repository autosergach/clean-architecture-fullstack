import { Task } from "../../domain";
import { TaskAccessDeniedError, TaskNotFoundError } from "../errors";
import { Clock } from "../ports/clock";
import { TaskRepository } from "../ports/task-repository";
import { TaskView } from "./create-task";

export interface UpdateTaskInput {
  taskId: string;
  ownerId: string;
  title?: string;
  description?: string;
  status?: string;
}

export class UpdateTask {
  constructor(
    private readonly tasks: TaskRepository,
    private readonly clock: Clock
  ) {}

  public async execute(input: UpdateTaskInput): Promise<TaskView> {
    const task = await this.tasks.findById(input.taskId);

    if (!task) {
      throw new TaskNotFoundError(input.taskId);
    }

    if (task.getOwnerId() !== input.ownerId) {
      throw new TaskAccessDeniedError(input.taskId);
    }

    const now = this.clock.now();

    if (input.title !== undefined) {
      task.rename(input.title, now);
    }

    if (input.description !== undefined) {
      task.updateDescription(input.description, now);
    }

    if (input.status !== undefined) {
      task.changeStatus(input.status, now);
    }

    await this.tasks.save(task);

    return UpdateTask.toView(task);
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
