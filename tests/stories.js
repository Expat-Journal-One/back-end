const request = require("supertest");

const server = require("./server.js");

const db = require("../config/dbConfig");

beforeEach(async () => {
  await db("stories").truncate();
});
//clears users table before each test


//login and register

describe("auth/router.js", () => {
  describe("register", () => {
    it("should successfully register user", async () => {
      const user = {
        username: "test3",
        password: "testvalues",
      };
      const expectedStatusCode = 201;
      const response = await request(server)
        .post("/api/auth/register")
        .send(user);
      expect(response.status).toEqual(expectedStatusCode);
    });

    it("it should error without password", async () => {
      const user = {
        username: "test3",
      };
      const expectedStatusCode = 500;
      const response = await request(server)
        .post("/api/auth/register")
        .send(user);
      expect(response.status).toEqual(expectedStatusCode);
    });
  });

  describe("login", () => {
    it("should successfully login", async () => {
      const expectedStatusCode = 200;
      const user = {
        username: "test3",
        password: "testvalues",
      };
      const registerResponse = await request(server)
        .post("/api/auth/register")
        .send(user);
      const response = await request(server).post("/api/auth/login").send(user);
      expect(response.status).toEqual(expectedStatusCode);
    });

    it("it rejects bad password", async () => {
      const expectedStatusCode = 401;
      const user = {
        username: "test3",
        password: "aoivjsdvvoijs",
      };
      const registerResponse = await request(server)
        .post("/api/auth/register")
        .send(user);
      const response = await request(server)
        .post("/api/auth/login")
        .send({ ...user, password: "test" });
      expect(response.status).toEqual(expectedStatusCode);
    });
  });
});
