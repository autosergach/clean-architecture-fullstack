import { create } from "zustand";
import { commentsApi } from "../api/comments-api";
import { tasksApi, type Task, type TaskFilters, type TaskStatus } from "../api/tasks-api";

interface TasksState {
  items: Task[];
  status: "idle" | "loading" | "ready" | "error";
  error: string | null;
  saving: boolean;
  load: (token: string, filters?: TaskFilters) => Promise<void>;
  create: (
    token: string,
    input: { title: string; description?: string; status?: TaskStatus }
  ) => Promise<void>;
  updateStatus: (token: string, taskId: string, status: TaskStatus) => Promise<void>;
  addComment: (token: string, taskId: string, body: string) => Promise<void>;
}

export const useTasksStore = create<TasksState>((set, get) => ({
  items: [],
  status: "idle",
  error: null,
  saving: false,
  async load(token, filters) {
    set({ status: "loading", error: null });
    try {
      const items = await tasksApi.list(token, filters);
      set({ items, status: "ready" });
    } catch (error) {
      set({
        status: "error",
        error: error instanceof Error ? error.message : "Failed to load tasks."
      });
    }
  },
  async create(token, input) {
    set({ saving: true, error: null });
    try {
      const created = await tasksApi.create(token, input);
      set({ items: [created, ...get().items] });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to create task."
      });
    } finally {
      set({ saving: false });
    }
  },
  async updateStatus(token, taskId, status) {
    const previous = get().items;
    set({
      items: previous.map((task) =>
        task.id === taskId ? { ...task, status } : task
      )
    });
    try {
      const updated = await tasksApi.update(token, taskId, { status });
      set({
        items: get().items.map((task) => (task.id === taskId ? updated : task))
      });
    } catch (error) {
      set({
        items: previous,
        error: error instanceof Error ? error.message : "Failed to update task."
      });
    }
  },
  async addComment(token, taskId, body) {
    set({ saving: true, error: null });
    try {
      await commentsApi.add(token, taskId, { body });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to add comment."
      });
    } finally {
      set({ saving: false });
    }
  }
}));
