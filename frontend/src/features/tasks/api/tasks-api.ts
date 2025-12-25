import { apiClient } from "../../../shared/api/client";

export type TaskStatus = "todo" | "in_progress" | "done";

export interface Task {
  id: string;
  ownerId: string;
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskPayload {
  title: string;
  description?: string;
  status?: TaskStatus;
}

export interface UpdateTaskPayload {
  title?: string;
  description?: string;
  status?: TaskStatus;
}

export interface TaskFilters {
  status?: TaskStatus;
  search?: string;
}

export const tasksApi = {
  list(token: string, filters?: TaskFilters): Promise<Task[]> {
    const params = new URLSearchParams();
    if (filters?.status) {
      params.set("status", filters.status);
    }
    if (filters?.search) {
      params.set("search", filters.search);
    }

    const query = params.toString();
    return apiClient.get(`/tasks${query ? `?${query}` : ""}`, token);
  },
  create(token: string, payload: CreateTaskPayload): Promise<Task> {
    return apiClient.post("/tasks", payload, token);
  },
  update(token: string, taskId: string, payload: UpdateTaskPayload): Promise<Task> {
    return apiClient.patch(`/tasks/${taskId}`, payload, token);
  }
};
