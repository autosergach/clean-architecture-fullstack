import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { JwtTokenService } from "../services/jwt-token-service";
import { Request } from "express";

export interface RequestUser {
  id: string;
}

export interface RequestWithUser extends Request {
  user: RequestUser;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly tokens: JwtTokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const header = request.headers["authorization"];
    if (!header || Array.isArray(header)) {
      throw new UnauthorizedException();
    }

    const [scheme, token] = header.split(" ");
    if (scheme !== "Bearer" || !token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.tokens.verify(token);
      (request as RequestWithUser).user = { id: payload.userId };
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
