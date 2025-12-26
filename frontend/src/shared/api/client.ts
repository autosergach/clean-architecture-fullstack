export class ApiClient {
  constructor(private readonly baseUrl: string) {}

  async get<TResponse>(path: string, token?: string): Promise<TResponse> {
    return this.request<TResponse>("GET", path, undefined, token);
  }

  async post<TResponse>(path: string, body: unknown, token?: string): Promise<TResponse> {
    return this.request<TResponse>("POST", path, body, token);
  }

  async patch<TResponse>(path: string, body: unknown, token?: string): Promise<TResponse> {
    return this.request<TResponse>("PATCH", path, body, token);
  }

  private async request<TResponse>(
    method: "GET" | "POST" | "PATCH",
    path: string,
    body?: unknown,
    token?: string
  ): Promise<TResponse> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json"
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseUrl}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => null);
      const message =
        typeof errorBody?.message === "string"
          ? errorBody.message
          : Array.isArray(errorBody?.message)
            ? errorBody.message.join(", ")
            : typeof errorBody?.error === "string"
              ? errorBody.error
              : `Request failed with status ${response.status}.`;
      throw new Error(message);
    }

    return response.json() as Promise<TResponse>;
  }
}

export const apiClient = new ApiClient(import.meta.env.VITE_API_URL || "/api");
