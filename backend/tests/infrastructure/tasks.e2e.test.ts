import request from "supertest";
import { INestApplication } from "@nestjs/common";
import { createTestApp } from "./support/create-test-app";

async function registerAndLogin(app: INestApplication): Promise<string> {
  await request(app.getHttpServer())
    .post("/auth/register")
    .send({ email: "owner@example.com", password: "password123" })
    .expect(201);

  const login = await request(app.getHttpServer())
    .post("/auth/login")
    .send({ email: "owner@example.com", password: "password123" })
    .expect(201);

  return login.body.accessToken as string;
}

describe("Tasks API", () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it("creates, lists, and updates tasks", async () => {
    const token = await registerAndLogin(app);

    const created = await request(app.getHttpServer())
      .post("/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Ship API" })
      .expect(201);

    const list = await request(app.getHttpServer())
      .get("/tasks")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(list.body).toHaveLength(1);
    expect(list.body[0].id).toBe(created.body.id);

    await request(app.getHttpServer())
      .patch(`/tasks/${created.body.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ status: "done" })
      .expect(200);
  });
});
