const request = require("supertest");

const server = require("../server.js");

const db = require("../config/dbConfig");

beforeEach(async () => {
  await db("users").truncate();
});

describe("auth/router.js", () => {
  describe("register", () => {
    //correct usage of api - successful response

    test("should successfully register user", async () => {
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

    //incorrect usage of api - unsuccessful response

    test("it should error without a password", async () => {
      const user = {
        username: "test3",
      };
      const expectedStatusCode = 500;
      const response = await request(server)
        .post("/api/auth/register")
        .send(user);
      expect(response.status).toEqual(expectedStatusCode);
    });

    test("it should error without a username", async () => {
      const user = {
        password: "testvalues",
      };
      const expectedStatusCode = 500;
      const response = await request(server)
        .post("/api/auth/register")
        .send(user);
      expect(response.status).toEqual(expectedStatusCode);
    });

    test("should error if route is incorrect", async () => {
      const user = {
        username: "test3",
        password: "testvalues",
      };
      const expectedStatusCode = 404;
      const response = await request(server).post("/api/register").send(user);
      expect(response.status).toEqual(expectedStatusCode);
    });

    test("errors when incorrect CRUD method is used, Edit", async () => {
      const user = {
        username: "test3",
        password: "testvalues",
      };
      const expectedStatusCode = 404;
      const response = await request(server)
        .put("/api/auth/register")
        .send(user);
      expect(response.status).toEqual(expectedStatusCode);
    });

    test("errors when incorrect CRUD method is used, Delete", async () => {
      const user = {
        username: "test3",
        password: "testvalues",
      };
      const expectedStatusCode = 404;
      const response = await request(server)
        .delete("/api/auth/register")
        .send(user);
      expect(response.status).toEqual(expectedStatusCode);
    });

    test("errors when incorrect CRUD method is used, Get", async () => {
      const user = {
        username: "test3",
        password: "testvalues",
      };
      const expectedStatusCode = 404;
      const response = await request(server)
        .get("/api/auth/register")
        .send(user);
      expect(response.status).toEqual(expectedStatusCode);
    });
  });

  describe("login", () => {
    //correct usage of api - successful response

    test("should successfully login", async () => {
      const expectedStatusCode = 200;
      const user = {
        username: "test2",
        password: "testvalues",
      };
      const registerResponse = await request(server)
        .post("/api/auth/register")
        .send(user);
      const response = await request(server)
        .post("/api/auth/login").send(user);
      expect(response.status).toEqual(expectedStatusCode);
    });

    //incorrect usage of api - unsuccessful response

    test("it rejects bad password", async () => {
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

    test("it should error without a username", async () => {
      const user = {
        password: "testvalues",
      };
      const expectedStatusCode = 500;
      const response = await request(server).post("/api/auth/login").send(user);
      expect(response.status).toEqual(expectedStatusCode);
    });

    test("should error if route is incorrect", async () => {
      const user = {
        username: "test3",
        password: "testvalues",
      };
      const expectedStatusCode = 404;
      const response = await request(server).post("/api/login").send(user);
      expect(response.status).toEqual(expectedStatusCode);
    });

    test("errors when incorrect CRUD method is used, Edit", async () => {
      const user = {
        username: "test3",
        password: "testvalues",
      };
      const expectedStatusCode = 404;
      const response = await request(server).put("/api/auth/login").send(user);
      expect(response.status).toEqual(expectedStatusCode);
    });

    test("errors when incorrect CRUD method is used, Delete", async () => {
      const user = {
        username: "test3",
        password: "testvalues",
      };
      const expectedStatusCode = 404;
      const response = await request(server)
        .delete("/api/auth/login")
        .send(user);
      expect(response.status).toEqual(expectedStatusCode);
    });

    test("errors when incorrect CRUD method is used, Get", async () => {
      const user = {
        username: "test3",
        password: "testvalues",
      };
      const expectedStatusCode = 404;
      const response = await request(server).get("/api/auth/login").send(user);
      expect(response.status).toEqual(expectedStatusCode);
    });
  });
});
