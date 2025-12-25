export class ApplicationError extends Error {
  public readonly code: string;

  constructor(code: string, message: string) {
    super(message);
    this.code = code;
  }
}

export class InvalidPasswordError extends ApplicationError {
  constructor() {
    super("INVALID_PASSWORD", "Password must be 8-72 characters.");
  }
}

export class EmailAlreadyInUseError extends ApplicationError {
  constructor(email: string) {
    super("EMAIL_ALREADY_IN_USE", `Email already in use: ${email}`);
  }
}

export class InvalidCredentialsError extends ApplicationError {
  constructor() {
    super("INVALID_CREDENTIALS", "Invalid email or password.");
  }
}

export class TaskNotFoundError extends ApplicationError {
  constructor(taskId: string) {
    super("TASK_NOT_FOUND", `Task not found: ${taskId}`);
  }
}

export class TaskAccessDeniedError extends ApplicationError {
  constructor(taskId: string) {
    super("TASK_ACCESS_DENIED", `Access denied to task: ${taskId}`);
  }
}
