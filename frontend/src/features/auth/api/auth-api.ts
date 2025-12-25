import { apiClient } from "../../../shared/api/client";

export interface RegisterPayload {
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterResponse {
  id: string;
  email: string;
}

export interface LoginResponse {
  accessToken: string;
}

export const authApi = {
  register(payload: RegisterPayload): Promise<RegisterResponse> {
    return apiClient.post("/auth/register", payload);
  },
  login(payload: LoginPayload): Promise<LoginResponse> {
    return apiClient.post("/auth/login", payload);
  }
};
