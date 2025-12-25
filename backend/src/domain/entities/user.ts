import { InvalidPasswordHashError } from "../errors";
import { Email } from "../value-objects/email";

export interface UserProps {
  id: string;
  email: Email;
  passwordHash: string;
  createdAt: Date;
}

export class User {
  private readonly id: string;
  private readonly email: Email;
  private readonly passwordHash: string;
  private readonly createdAt: Date;

  private constructor(props: UserProps) {
    this.id = props.id;
    this.email = props.email;
    this.passwordHash = props.passwordHash;
    this.createdAt = props.createdAt;
  }

  public static create(input: {
    id: string;
    email: string;
    passwordHash: string;
    createdAt: Date;
  }): User {
    if (input.passwordHash.trim().length === 0) {
      throw new InvalidPasswordHashError();
    }

    return new User({
      id: input.id,
      email: Email.create(input.email),
      passwordHash: input.passwordHash,
      createdAt: input.createdAt
    });
  }

  public getId(): string {
    return this.id;
  }

  public getEmail(): string {
    return this.email.getValue();
  }

  public getPasswordHash(): string {
    return this.passwordHash;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }
}
