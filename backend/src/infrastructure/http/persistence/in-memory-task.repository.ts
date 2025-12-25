import { Task } from "../../../domain";
import { TaskQuery, TaskRepository } from "../../../application";

export class InMemoryTaskRepository implements TaskRepository {
  private readonly tasks: Task[] = [];

  async save(task: Task): Promise<void> {
    const index = this.tasks.findIndex((stored) => stored.getId() === task.getId());
    if (index >= 0) {
      this.tasks[index] = task;
      return;
    }
    this.tasks.push(task);
  }

  async findById(id: string): Promise<Task | null> {
    return this.tasks.find((task) => task.getId() === id) ?? null;
  }

  async findByOwnerId(ownerId: string, query?: TaskQuery): Promise<Task[]> {
    const owned = this.tasks.filter((task) => task.getOwnerId() === ownerId);
    const filtered = query?.status
      ? owned.filter((task) => task.getStatus() === query.status)
      : owned;

    if (!query?.search) {
      return filtered;
    }

    const search = query.search.toLowerCase();
    return filtered.filter((task) => {
      const title = task.getTitle().toLowerCase();
      const description = (task.getDescription() ?? "").toLowerCase();
      return title.includes(search) || description.includes(search);
    });
  }
}
