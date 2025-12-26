import { Comment } from "../../domain";
import { CommentRepository } from "../ports/comment-repository";

export interface CommentListView {
  id: string;
  taskId: string;
  authorId: string;
  body: string;
  createdAt: Date;
}

export class ListComments {
  constructor(private readonly comments: CommentRepository) {}

  async execute(taskId: string): Promise<CommentListView[]> {
    const items = await this.comments.findByTaskId(taskId);
    return items.map(ListComments.toView);
  }

  private static toView(comment: Comment): CommentListView {
    return {
      id: comment.getId(),
      taskId: comment.getTaskId(),
      authorId: comment.getAuthorId(),
      body: comment.getBody(),
      createdAt: comment.getCreatedAt()
    };
  }
}
