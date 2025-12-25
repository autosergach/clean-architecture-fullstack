import {
  InvalidTaskDescriptionError,
  InvalidTaskTitleError
} from "../errors";
import { TaskStatus, TaskStatusValue } from "../value-objects/task-status";

export interface TaskProps {
  id: string;
  ownerId: string;
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}

export class Task {
  private readonly id: string;
  private readonly ownerId: string;
  private title: string;
  private description?: string;
  private status: TaskStatus;
  private readonly createdAt: Date;
  private updatedAt: Date;

  private constructor(props: TaskProps) {
    this.id = props.id;
    this.ownerId = props.ownerId;
    this.title = props.title;
    this.description = props.description;
    this.status = props.status;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  public static create(input: {
    id: string;
    ownerId: string;
    title: string;
    description?: string;
    status?: string;
    createdAt: Date;
  }): Task {
    Task.ensureTitle(input.title);
    Task.ensureDescription(input.description);

    const status = TaskStatusValue.ensure(input.status ?? "todo");

    return new Task({
      id: input.id,
      ownerId: input.ownerId,
      title: input.title.trim(),
      description: input.description?.trim() || undefined,
      status,
      createdAt: input.createdAt,
      updatedAt: input.createdAt
    });
  }

  public rename(title: string, updatedAt: Date): void {
    Task.ensureTitle(title);
    this.title = title.trim();
    this.updatedAt = updatedAt;
  }

  public updateDescription(description: string | undefined, updatedAt: Date): void {
    Task.ensureDescription(description);
    this.description = description?.trim() || undefined;
    this.updatedAt = updatedAt;
  }

  public changeStatus(status: string, updatedAt: Date): void {
    this.status = TaskStatusValue.ensure(status);
    this.updatedAt = updatedAt;
  }

  public getId(): string {
    return this.id;
  }

  public getOwnerId(): string {
    return this.ownerId;
  }

  public getTitle(): string {
    return this.title;
  }

  public getDescription(): string | undefined {
    return this.description;
  }

  public getStatus(): TaskStatus {
    return this.status;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  private static ensureTitle(title: string): void {
    const trimmed = title.trim();
    if (trimmed.length < 1 || trimmed.length > 120) {
      throw new InvalidTaskTitleError();
    }
  }

  private static ensureDescription(description?: string): void {
    if (description === undefined) {
      return;
    }

    if (description.trim().length > 1000) {
      throw new InvalidTaskDescriptionError();
    }
  }
}
