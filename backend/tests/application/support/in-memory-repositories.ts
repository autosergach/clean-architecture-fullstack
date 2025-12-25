import { Comment, Task, User } from "../../../src/domain";
import {
  CommentRepository,
  TaskQuery,
  TaskRepository,
  UserRepository
} from "../../../src/application";

export class InMemoryUserRepository implements UserRepository {
  private readonly users: User[] = [];

  async save(user: User): Promise<void> {
    const existingIndex = this.users.findIndex(
      (stored) => stored.getId() === user.getId()
    );

    if (existingIndex >= 0) {
      this.users[existingIndex] = user;
      return;
    }

    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.getEmail() === email) ?? null;
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find((user) => user.getId() === id) ?? null;
  }
}

export class InMemoryTaskRepository implements TaskRepository {
  private readonly tasks: Task[] = [];

  async save(task: Task): Promise<void> {
    const existingIndex = this.tasks.findIndex(
      (stored) => stored.getId() === task.getId()
    );

    if (existingIndex >= 0) {
      this.tasks[existingIndex] = task;
      return;
    }

    this.tasks.push(task);
  }

  async findById(id: string): Promise<Task | null> {
    return this.tasks.find((task) => task.getId() === id) ?? null;
  }

  async findByOwnerId(ownerId: string, query?: TaskQuery): Promise<Task[]> {
    const filtered = this.tasks.filter((task) => task.getOwnerId() === ownerId);
    const withStatus = query?.status
      ? filtered.filter((task) => task.getStatus() === query.status)
      : filtered;

    if (!query?.search) {
      return withStatus;
    }

    const search = query.search.toLowerCase();
    return withStatus.filter((task) => {
      const title = task.getTitle().toLowerCase();
      const description = (task.getDescription() ?? "").toLowerCase();
      return title.includes(search) || description.includes(search);
    });
  }
}

export class InMemoryCommentRepository implements CommentRepository {
  private readonly comments: Comment[] = [];

  async save(comment: Comment): Promise<void> {
    this.comments.push(comment);
  }

  async findByTaskId(taskId: string): Promise<Comment[]> {
    return this.comments.filter((comment) => comment.getTaskId() === taskId);
  }
}
