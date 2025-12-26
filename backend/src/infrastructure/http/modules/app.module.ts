import { Module } from "@nestjs/common";
import { AuthController } from "../routes/auth.controller";
import { TasksController } from "../routes/tasks.controller";
import { CommentsController } from "../routes/comments.controller";
import { InMemoryUserRepository } from "../persistence/in-memory-user.repository";
import { InMemoryTaskRepository } from "../persistence/in-memory-task.repository";
import { InMemoryCommentRepository } from "../persistence/in-memory-comment.repository";
import { BcryptPasswordHasher } from "../services/bcrypt-password-hasher";
import { JwtTokenService } from "../services/jwt-token-service";
import { SystemClock } from "../services/system-clock";
import { RandomIdGenerator } from "../services/random-id-generator";
import { AuthGuard } from "../support/auth.guard";
import {
  RegisterUser,
  LoginUser,
  CreateTask,
  UpdateTask,
  ListTasks,
  AddComment,
  ListComments
} from "../../../application";

@Module({
  controllers: [AuthController, TasksController, CommentsController],
  providers: [
    InMemoryUserRepository,
    InMemoryTaskRepository,
    InMemoryCommentRepository,
    BcryptPasswordHasher,
    JwtTokenService,
    SystemClock,
    RandomIdGenerator,
    AuthGuard,
    {
      provide: RegisterUser,
      useFactory: (
        users: InMemoryUserRepository,
        hasher: BcryptPasswordHasher,
        ids: RandomIdGenerator,
        clock: SystemClock
      ) => new RegisterUser(users, hasher, ids, clock),
      inject: [InMemoryUserRepository, BcryptPasswordHasher, RandomIdGenerator, SystemClock]
    },
    {
      provide: LoginUser,
      useFactory: (
        users: InMemoryUserRepository,
        hasher: BcryptPasswordHasher,
        tokens: JwtTokenService
      ) => new LoginUser(users, hasher, tokens),
      inject: [InMemoryUserRepository, BcryptPasswordHasher, JwtTokenService]
    },
    {
      provide: CreateTask,
      useFactory: (
        tasks: InMemoryTaskRepository,
        ids: RandomIdGenerator,
        clock: SystemClock
      ) => new CreateTask(tasks, ids, clock),
      inject: [InMemoryTaskRepository, RandomIdGenerator, SystemClock]
    },
    {
      provide: UpdateTask,
      useFactory: (tasks: InMemoryTaskRepository, clock: SystemClock) =>
        new UpdateTask(tasks, clock),
      inject: [InMemoryTaskRepository, SystemClock]
    },
    {
      provide: ListTasks,
      useFactory: (tasks: InMemoryTaskRepository) => new ListTasks(tasks),
      inject: [InMemoryTaskRepository]
    },
    {
      provide: AddComment,
      useFactory: (
        tasks: InMemoryTaskRepository,
        comments: InMemoryCommentRepository,
        ids: RandomIdGenerator,
        clock: SystemClock
      ) => new AddComment(tasks, comments, ids, clock),
      inject: [InMemoryTaskRepository, InMemoryCommentRepository, RandomIdGenerator, SystemClock]
    },
    {
      provide: ListComments,
      useFactory: (comments: InMemoryCommentRepository) =>
        new ListComments(comments),
      inject: [InMemoryCommentRepository]
    }
  ]
})
export class AppModule {}
