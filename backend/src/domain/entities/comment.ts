import { InvalidCommentBodyError } from "../errors";

export interface CommentProps {
  id: string;
  taskId: string;
  authorId: string;
  body: string;
  createdAt: Date;
}

export class Comment {
  private readonly id: string;
  private readonly taskId: string;
  private readonly authorId: string;
  private body: string;
  private readonly createdAt: Date;

  private constructor(props: CommentProps) {
    this.id = props.id;
    this.taskId = props.taskId;
    this.authorId = props.authorId;
    this.body = props.body;
    this.createdAt = props.createdAt;
  }

  public static create(input: {
    id: string;
    taskId: string;
    authorId: string;
    body: string;
    createdAt: Date;
  }): Comment {
    Comment.ensureBody(input.body);

    return new Comment({
      id: input.id,
      taskId: input.taskId,
      authorId: input.authorId,
      body: input.body.trim(),
      createdAt: input.createdAt
    });
  }

  public updateBody(body: string): void {
    Comment.ensureBody(body);
    this.body = body.trim();
  }

  public getId(): string {
    return this.id;
  }

  public getTaskId(): string {
    return this.taskId;
  }

  public getAuthorId(): string {
    return this.authorId;
  }

  public getBody(): string {
    return this.body;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  private static ensureBody(body: string): void {
    const trimmed = body.trim();
    if (trimmed.length < 1 || trimmed.length > 500) {
      throw new InvalidCommentBodyError();
    }
  }
}
