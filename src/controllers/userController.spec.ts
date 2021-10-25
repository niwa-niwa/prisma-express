/**
 * npm test src/controllers/userController.spec.ts
 */

import supertest from "supertest";
import app from "../app";
import { PrismaClient } from ".prisma/client";

const prisma = new PrismaClient();

describe("userController test Start", () => {
  describe("GET /users", () => {
    test("response with success", async () => {
      for (let i = 0; i < 3; i++) {
        await prisma.user.create({ data: { name: `user${i}`, email: `user${i}@example.com` } });
      }
      const users = await prisma.user.findMany();

      const response = await supertest(app).get("/users");
      expect(response.status).toBe(200);
      expect(response.body.users).toEqual(users);
    });
  });

  describe("GET /users/:id", () => {
    test("response with success", async () => {
      const user = await prisma.user.create({ data: { name: "user10", email: "user10@example.com" } });

      const response = await supertest(app).get("/users/10");
      expect(response.status).toBe(200);
      expect(response.body.user).toEqual(user);
    });
  });
});
