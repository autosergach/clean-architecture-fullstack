import { User } from "../../domain";
import { EmailAlreadyInUseError, InvalidPasswordError } from "../errors";
import { Clock } from "../ports/clock";
import { IdGenerator } from "../ports/id-generator";
import { PasswordHasher } from "../ports/password-hasher";
import { UserRepository } from "../ports/user-repository";

export interface RegisterUserInput {
  email: string;
  password: string;
}

export interface RegisterUserOutput {
  id: string;
  email: string;
  createdAt: Date;
}

export class RegisterUser {
  constructor(
    private readonly users: UserRepository,
    private readonly hasher: PasswordHasher,
    private readonly ids: IdGenerator,
    private readonly clock: Clock
  ) {}

  public async execute(input: RegisterUserInput): Promise<RegisterUserOutput> {
    RegisterUser.ensurePassword(input.password);
    const email = input.email.trim().toLowerCase();

    const existing = await this.users.findByEmail(email);
    if (existing) {
      throw new EmailAlreadyInUseError(email);
    }

    const passwordHash = await this.hasher.hash(input.password);
    const createdAt = this.clock.now();
    const user = User.create({
      id: this.ids.generate(),
      email,
      passwordHash,
      createdAt
    });

    await this.users.save(user);

    return {
      id: user.getId(),
      email: user.getEmail(),
      createdAt: user.getCreatedAt()
    };
  }

  private static ensurePassword(password: string): void {
    const trimmed = password.trim();
    if (trimmed.length < 8 || trimmed.length > 72) {
      throw new InvalidPasswordError();
    }
  }
}
