import { Task } from "../../domain";
import { TaskQuery, TaskRepository } from "../ports/task-repository";
import { TaskView } from "./create-task";

export interface ListTasksInput {
  ownerId: string;
  status?: string;
  search?: string;
}

export class ListTasks {
  constructor(private readonly tasks: TaskRepository) {}

  public async execute(input: ListTasksInput): Promise<TaskView[]> {
    const query: TaskQuery = {};
    if (input.status) {
      query.status = input.status as TaskQuery["status"];
    }
    if (input.search) {
      query.search = input.search.trim();
    }

    const tasks = await this.tasks.findByOwnerId(input.ownerId, query);

    return tasks.map(ListTasks.toView);
  }

  private static toView(task: Task): TaskView {
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
