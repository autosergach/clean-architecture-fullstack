import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus
} from "@nestjs/common";
import { Response } from "express";
import { ApplicationError } from "../../../application";
import { DomainError } from "../../../domain";

@Catch()
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();

    if (exception instanceof ApplicationError) {
      response.status(this.mapApplicationError(exception)).json({
        code: exception.code,
        message: exception.message
      });
      return;
    }

    if (exception instanceof DomainError) {
      response.status(HttpStatus.BAD_REQUEST).json({
        code: exception.code,
        message: exception.message
      });
      return;
    }

    if (exception instanceof Error) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        code: "UNEXPECTED_ERROR",
        message: exception.message
      });
      return;
    }

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      code: "UNEXPECTED_ERROR",
      message: "Unexpected error."
    });
  }

  private mapApplicationError(error: ApplicationError): HttpStatus {
    switch (error.code) {
      case "INVALID_PASSWORD":
        return HttpStatus.BAD_REQUEST;
      case "EMAIL_ALREADY_IN_USE":
        return HttpStatus.CONFLICT;
      case "INVALID_CREDENTIALS":
        return HttpStatus.UNAUTHORIZED;
      case "TASK_NOT_FOUND":
        return HttpStatus.NOT_FOUND;
      case "TASK_ACCESS_DENIED":
        return HttpStatus.FORBIDDEN;
      default:
        return HttpStatus.BAD_REQUEST;
    }
  }
}
