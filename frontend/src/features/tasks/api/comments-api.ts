import { apiClient } from "../../../shared/api/client";

export interface Comment {
  id: string;
  taskId: string;
  authorId: string;
  body: string;
  createdAt: string;
}

export interface AddCommentPayload {
  body: string;
}

export const commentsApi = {
  add(token: string, taskId: string, payload: AddCommentPayload): Promise<Comment> {
    return apiClient.post(`/tasks/${taskId}/comments`, payload, token);
  }
};
