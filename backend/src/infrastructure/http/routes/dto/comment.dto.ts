import { IsString, MaxLength } from "class-validator";

export class AddCommentDto {
  @IsString()
  @MaxLength(500)
  body!: string;
}
