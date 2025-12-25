import {
  EmailAlreadyInUseError,
  InvalidPasswordError,
  RegisterUser
} from "../../src/application";
import { FakeClock, FakeIdGenerator, FakePasswordHasher } from "./support/fakes";
import { InMemoryUserRepository } from "./support/in-memory-repositories";

describe("RegisterUser", () => {
  it("registers a new user", async () => {
    const users = new InMemoryUserRepository();
    const useCase = new RegisterUser(
      users,
      new FakePasswordHasher(),
      new FakeIdGenerator(),
      new FakeClock(new Date("2024-01-10"))
    );

    const result = await useCase.execute({
      email: "user@example.com",
      password: "password123"
    });

    expect(result.email).toBe("user@example.com");
    expect(result.id).toBe("id-1");
  });

  it("rejects duplicate email", async () => {
    const users = new InMemoryUserRepository();
    const useCase = new RegisterUser(
      users,
      new FakePasswordHasher(),
      new FakeIdGenerator(),
      new FakeClock(new Date("2024-01-10"))
    );

    await useCase.execute({
      email: "user@example.com",
      password: "password123"
    });

    await expect(
      useCase.execute({
        email: "user@example.com",
        password: "password123"
      })
    ).rejects.toBeInstanceOf(EmailAlreadyInUseError);
  });

  it("rejects weak password", async () => {
    const users = new InMemoryUserRepository();
    const useCase = new RegisterUser(
      users,
      new FakePasswordHasher(),
      new FakeIdGenerator(),
      new FakeClock(new Date("2024-01-10"))
    );

    await expect(
      useCase.execute({
        email: "user@example.com",
        password: "short"
      })
    ).rejects.toBeInstanceOf(InvalidPasswordError);
  });
});
