import { InvalidEmailError, InvalidPasswordHashError, User } from "../../src/domain";

describe("User", () => {
  it("creates a user with valid input", () => {
    const user = User.create({
      id: "user-1",
      email: "user@example.com",
      passwordHash: "hash",
      createdAt: new Date("2024-01-01")
    });

    expect(user.getEmail()).toBe("user@example.com");
  });

  it("rejects invalid email", () => {
    expect(() =>
      User.create({
        id: "user-1",
        email: "not-an-email",
        passwordHash: "hash",
        createdAt: new Date("2024-01-01")
      })
    ).toThrow(InvalidEmailError);
  });

  it("rejects empty password hash", () => {
    expect(() =>
      User.create({
        id: "user-1",
        email: "user@example.com",
        passwordHash: " ",
        createdAt: new Date("2024-01-01")
      })
    ).toThrow(InvalidPasswordHashError);
  });
});
