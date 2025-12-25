import { authSchema } from "../../src/features/auth/model/auth-schema";

describe("authSchema", () => {
  it("accepts valid credentials", () => {
    const result = authSchema.safeParse({
      email: "user@example.com",
      password: "password123"
    });

    expect(result.success).toBe(true);
  });

  it("rejects invalid email", () => {
    const result = authSchema.safeParse({
      email: "invalid",
      password: "password123"
    });

    expect(result.success).toBe(false);
  });

  it("rejects short password", () => {
    const result = authSchema.safeParse({
      email: "user@example.com",
      password: "short"
    });

    expect(result.success).toBe(false);
  });
});
