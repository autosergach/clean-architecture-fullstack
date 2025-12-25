import { Comment } from "../../../domain";
import { CommentRepository } from "../../../application";

export class InMemoryCommentRepository implements CommentRepository {
  private readonly comments: Comment[] = [];

  async save(comment: Comment): Promise<void> {
    this.comments.push(comment);
  }

  async findByTaskId(taskId: string): Promise<Comment[]> {
    return this.comments.filter((comment) => comment.getTaskId() === taskId);
  }
}
