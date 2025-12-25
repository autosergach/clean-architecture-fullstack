import { Task, TaskStatus } from "../../domain";

export interface TaskQuery {
  status?: TaskStatus;
  search?: string;
}

export interface TaskRepository {
  save(task: Task): Promise<void>;
  findById(id: string): Promise<Task | null>;
  findByOwnerId(ownerId: string, query?: TaskQuery): Promise<Task[]>;
}
