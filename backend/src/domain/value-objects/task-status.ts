import { InvalidTaskStatusError } from "../errors";

export type TaskStatus = "todo" | "in_progress" | "done";

const allowedStatuses: TaskStatus[] = ["todo", "in_progress", "done"];

export const TaskStatusValue = {
  ensure(value: string): TaskStatus {
    if (!allowedStatuses.includes(value as TaskStatus)) {
      throw new InvalidTaskStatusError(value);
    }

    return value as TaskStatus;
  }
};
