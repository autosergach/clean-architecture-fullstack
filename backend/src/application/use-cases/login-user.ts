import { InvalidCredentialsError } from "../errors";
import { PasswordHasher } from "../ports/password-hasher";
import { TokenService } from "../ports/token-service";
import { UserRepository } from "../ports/user-repository";

export interface LoginUserInput {
  email: string;
  password: string;
}

export interface LoginUserOutput {
  accessToken: string;
}

export class LoginUser {
  constructor(
    private readonly users: UserRepository,
    private readonly hasher: PasswordHasher,
    private readonly tokens: TokenService
  ) {}

  public async execute(input: LoginUserInput): Promise<LoginUserOutput> {
    const email = input.email.trim().toLowerCase();
    const user = await this.users.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const valid = await this.hasher.verify(input.password, user.getPasswordHash());
    if (!valid) {
      throw new InvalidCredentialsError();
    }

    const accessToken = await this.tokens.issue({ userId: user.getId() });

    return { accessToken };
  }
}
