import {
  Clock,
  IdGenerator,
  PasswordHasher,
  TokenService
} from "../../../src/application";

export class FakeClock implements Clock {
  constructor(private readonly fixed: Date) {}

  now(): Date {
    return this.fixed;
  }
}

export class FakeIdGenerator implements IdGenerator {
  private current = 1;

  generate(): string {
    const id = `id-${this.current}`;
    this.current += 1;
    return id;
  }
}

export class FakePasswordHasher implements PasswordHasher {
  async hash(plain: string): Promise<string> {
    return `hash:${plain}`;
  }

  async verify(plain: string, hash: string): Promise<boolean> {
    return hash === `hash:${plain}`;
  }
}

export class FakeTokenService implements TokenService {
  async issue(payload: { userId: string }): Promise<string> {
    return `token:${payload.userId}`;
  }

  async verify(token: string): Promise<{ userId: string }> {
    const [, userId] = token.split(":");
    return { userId };
  }
}
