import { Comment } from "../../domain";

export interface CommentRepository {
  save(comment: Comment): Promise<void>;
  findByTaskId(taskId: string): Promise<Comment[]>;
}
