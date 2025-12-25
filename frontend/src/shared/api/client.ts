export class ApiClient {
  constructor(private readonly baseUrl: string) {}

  async post<TResponse>(path: string, body: unknown): Promise<TResponse> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
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

export const apiClient = new ApiClient(
  import.meta.env.VITE_API_URL || "http://localhost:3001"
);
