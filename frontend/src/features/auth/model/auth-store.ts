import { create } from "zustand";
import { authApi } from "../api/auth-api";
import type { AuthFormValues } from "./auth-schema";

type AuthStatus = "anonymous" | "authenticated" | "loading";

interface AuthState {
  status: AuthStatus;
  token: string | null;
  error: string | null;
  getToken: () => string | null;
  login: (values: AuthFormValues) => Promise<void>;
  register: (values: AuthFormValues) => Promise<void>;
  logout: () => void;
  hydrate: () => void;
}

interface AuthDependencies {
  api?: typeof authApi;
  storage?: Storage;
}

const STORAGE_KEY = "task-manager-token";

export function createAuthStore(deps: AuthDependencies = {}) {
  const api = deps.api ?? authApi;
  const storage =
    deps.storage ??
    (typeof window !== "undefined" ? window.localStorage : undefined);

  return create<AuthState>((set) => ({
    status: "anonymous",
    token: null,
    error: null,
    getToken() {
      return storage?.getItem(STORAGE_KEY) ?? null;
    },
    async login(values) {
      set({ status: "loading", error: null });
      try {
        const result = await api.login(values);
        storage?.setItem(STORAGE_KEY, result.accessToken);
        set({ status: "authenticated", token: result.accessToken });
      } catch (error) {
        set({
          status: "anonymous",
          error: error instanceof Error ? error.message : "Login failed."
        });
      }
    },
    async register(values) {
      set({ status: "loading", error: null });
      try {
        await api.register(values);
        const result = await api.login(values);
        storage?.setItem(STORAGE_KEY, result.accessToken);
        set({ status: "authenticated", token: result.accessToken });
      } catch (error) {
        set({
          status: "anonymous",
          error: error instanceof Error ? error.message : "Registration failed."
        });
      }
    },
    logout() {
      storage?.removeItem(STORAGE_KEY);
      set({ status: "anonymous", token: null });
    },
    hydrate() {
      const token = storage?.getItem(STORAGE_KEY);
      if (token) {
        set({ status: "authenticated", token });
      }
    }
  }));
}

export const useAuthStore = createAuthStore();
