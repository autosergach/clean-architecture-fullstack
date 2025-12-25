import { createAuthStore } from "../../src/features/auth/model/auth-store";

const memoryStorage = () => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
    key: (index: number) => Object.keys(store)[index] ?? null,
    get length() {
      return Object.keys(store).length;
    }
  } as Storage;
};

describe("auth store", () => {
  it("stores token after login", async () => {
    const api = {
      login: async () => ({ accessToken: "token-123" }),
      register: async () => ({ id: "id-1", email: "user@example.com" })
    };
    const storage = memoryStorage();
    const store = createAuthStore({ api, storage });

    await store.getState().login({ email: "user@example.com", password: "password123" });

    expect(store.getState().status).toBe("authenticated");
    expect(storage.getItem("task-manager-token")).toBe("token-123");
  });

  it("hydrates token from storage", () => {
    const api = {
      login: async () => ({ accessToken: "token-123" }),
      register: async () => ({ id: "id-1", email: "user@example.com" })
    };
    const storage = memoryStorage();
    storage.setItem("task-manager-token", "token-xyz");
    const store = createAuthStore({ api, storage });

    store.getState().hydrate();

    expect(store.getState().status).toBe("authenticated");
    expect(store.getState().token).toBe("token-xyz");
  });
});
