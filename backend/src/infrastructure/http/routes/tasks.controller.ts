import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import {
  CreateTask,
  ListTasks,
  TaskView,
  UpdateTask
} from "../../../application";
import { AuthGuard, RequestWithUser } from "../support/auth.guard";
import { CreateTaskDto, UpdateTaskDto } from "./dto/task.dto";

@ApiTags("tasks")
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller("tasks")
export class TasksController {
  constructor(
    private readonly createTask: CreateTask,
    private readonly updateTask: UpdateTask,
    private readonly listTasks: ListTasks
  ) {}

  @Post()
  async create(
    @Req() request: RequestWithUser,
    @Body() body: CreateTaskDto
  ): Promise<TaskView> {
    return this.createTask.execute({
      ownerId: request.user.id,
      title: body.title,
      description: body.description,
      status: body.status
    });
  }

  @Patch(":taskId")
  async update(
    @Req() request: RequestWithUser,
    @Body() body: UpdateTaskDto,
    @Param("taskId") taskId: string
  ): Promise<TaskView> {
    return this.updateTask.execute({
      taskId,
      ownerId: request.user.id,
      title: body.title,
      description: body.description,
      status: body.status
    });
  }

  @Get()
  async list(
    @Req() request: RequestWithUser,
    @Query("status") status?: string,
    @Query("search") search?: string
  ): Promise<TaskView[]> {
    return this.listTasks.execute({
      ownerId: request.user.id,
      status,
      search
    });
  }
}
