import { InvalidCredentialsError, LoginUser } from "../../src/application";
import { FakePasswordHasher, FakeTokenService } from "./support/fakes";
import { InMemoryUserRepository } from "./support/in-memory-repositories";
import { User } from "../../src/domain";

describe("LoginUser", () => {
  it("issues access token for valid credentials", async () => {
    const users = new InMemoryUserRepository();
    const user = User.create({
      id: "user-1",
      email: "user@example.com",
      passwordHash: "hash:password123",
      createdAt: new Date("2024-01-10")
    });
    await users.save(user);

    const useCase = new LoginUser(
      users,
      new FakePasswordHasher(),
      new FakeTokenService()
    );

    const result = await useCase.execute({
      email: "user@example.com",
      password: "password123"
    });

    expect(result.accessToken).toBe("token:user-1");
  });

  it("rejects invalid password", async () => {
    const users = new InMemoryUserRepository();
    const user = User.create({
      id: "user-1",
      email: "user@example.com",
      passwordHash: "hash:password123",
      createdAt: new Date("2024-01-10")
    });
    await users.save(user);

    const useCase = new LoginUser(
      users,
      new FakePasswordHasher(),
      new FakeTokenService()
    );

    await expect(
      useCase.execute({
        email: "user@example.com",
        password: "wrong"
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("rejects missing user", async () => {
    const users = new InMemoryUserRepository();
    const useCase = new LoginUser(
      users,
      new FakePasswordHasher(),
      new FakeTokenService()
    );

    await expect(
      useCase.execute({
        email: "missing@example.com",
        password: "password123"
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
