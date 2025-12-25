import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { LoginUser, RegisterUser } from "../../../application";
import { LoginDto, RegisterDto } from "./dto/auth.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly registerUser: RegisterUser,
    private readonly loginUser: LoginUser
  ) {}

  @Post("register")
  async register(@Body() body: RegisterDto): Promise<{ id: string; email: string }> {
    const result = await this.registerUser.execute({
      email: body.email,
      password: body.password
    });

    return { id: result.id, email: result.email };
  }

  @Post("login")
  async login(@Body() body: LoginDto): Promise<{ accessToken: string }> {
    const result = await this.loginUser.execute({
      email: body.email,
      password: body.password
    });

    return { accessToken: result.accessToken };
  }
}
