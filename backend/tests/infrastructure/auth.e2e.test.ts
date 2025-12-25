import request from "supertest";
import { INestApplication } from "@nestjs/common";
import { createTestApp } from "./support/create-test-app";

describe("Auth API", () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it("registers and logs in a user", async () => {
    await request(app.getHttpServer())
      .post("/auth/register")
      .send({ email: "user@example.com", password: "password123" })
      .expect(201);

    const login = await request(app.getHttpServer())
      .post("/auth/login")
      .send({ email: "user@example.com", password: "password123" })
      .expect(201);

    expect(login.body.accessToken).toBeDefined();
  });
});
