export class DomainError extends Error {
  public readonly code: string;

  constructor(code: string, message: string) {
    super(message);
    this.code = code;
  }
}

export class InvalidEmailError extends DomainError {
  constructor(email: string) {
    super("INVALID_EMAIL", `Invalid email: ${email}`);
  }
}

export class InvalidPasswordHashError extends DomainError {
  constructor() {
    super("INVALID_PASSWORD_HASH", "Password hash is required.");
  }
}

export class InvalidTaskTitleError extends DomainError {
  constructor() {
    super("INVALID_TASK_TITLE", "Task title must be 1-120 characters.");
  }
}

export class InvalidTaskDescriptionError extends DomainError {
  constructor() {
    super("INVALID_TASK_DESCRIPTION", "Task description must be 0-1000 characters.");
  }
}

export class InvalidTaskStatusError extends DomainError {
  constructor(status: string) {
    super("INVALID_TASK_STATUS", `Invalid task status: ${status}`);
  }
}

export class InvalidCommentBodyError extends DomainError {
  constructor() {
    super("INVALID_COMMENT_BODY", "Comment body must be 1-500 characters.");
  }
}
