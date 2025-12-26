import { render, screen } from "@testing-library/react";
import { TasksPage } from "../../src/pages/TasksPage";
import { vi } from "vitest";

vi.mock("../../src/features/auth/model/auth-store", () => ({
  useAuthStore: () => ({ token: "token-1" })
}));

vi.mock("../../src/features/tasks/model/tasks-store", () => ({
  useTasksStore: () => ({
    items: [],
    status: "ready",
    error: null,
    saving: false,
    load: vi.fn(),
    create: vi.fn(),
    updateStatus: vi.fn(),
    addComment: vi.fn()
  })
}));

describe("TasksPage", () => {
  it("shows empty state", () => {
    render(<TasksPage />);
    expect(screen.getByTestId("tasks-empty")).toBeInTheDocument();
  });
});
