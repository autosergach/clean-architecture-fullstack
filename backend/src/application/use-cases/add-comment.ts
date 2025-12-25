import { Comment } from "../../domain";
import { TaskNotFoundError } from "../errors";
import { Clock } from "../ports/clock";
import { CommentRepository } from "../ports/comment-repository";
import { IdGenerator } from "../ports/id-generator";
import { TaskRepository } from "../ports/task-repository";

export interface AddCommentInput {
  taskId: string;
  authorId: string;
  body: string;
}

export interface CommentView {
  id: string;
  taskId: string;
  authorId: string;
  body: string;
  createdAt: Date;
}

export class AddComment {
  constructor(
    private readonly tasks: TaskRepository,
    private readonly comments: CommentRepository,
    private readonly ids: IdGenerator,
    private readonly clock: Clock
  ) {}

  public async execute(input: AddCommentInput): Promise<CommentView> {
    const task = await this.tasks.findById(input.taskId);
    if (!task) {
      throw new TaskNotFoundError(input.taskId);
    }

    const comment = Comment.create({
      id: this.ids.generate(),
      taskId: input.taskId,
      authorId: input.authorId,
      body: input.body,
      createdAt: this.clock.now()
    });

    await this.comments.save(comment);

    return {
      id: comment.getId(),
      taskId: comment.getTaskId(),
      authorId: comment.getAuthorId(),
      body: comment.getBody(),
      createdAt: comment.getCreatedAt()
    };
  }
}
