import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AddComment, CommentView, ListComments, CommentListView } from "../../../application";
import { AuthGuard, RequestWithUser } from "../support/auth.guard";
import { AddCommentDto } from "./dto/comment.dto";

@ApiTags("comments")
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller("tasks/:taskId/comments")
export class CommentsController {
  constructor(
    private readonly addComment: AddComment,
    private readonly listComments: ListComments
  ) {}

  @Get()
  async list(@Param("taskId") taskId: string): Promise<CommentListView[]> {
    return this.listComments.execute(taskId);
  }

  @Post()
  async add(
    @Req() request: RequestWithUser,
    @Param("taskId") taskId: string,
    @Body() body: AddCommentDto
  ): Promise<CommentView> {
    return this.addComment.execute({
      taskId,
      authorId: request.user.id,
      body: body.body
    });
  }
}
