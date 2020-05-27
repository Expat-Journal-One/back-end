const request = require("supertest");

const server = require("../server.js");

const db = require("../config/dbConfig");

beforeEach(async () => {
  await db("users").truncate();
});


describe("users/router.js", () => {
  describe("/id", () => {
   // correct usage of api - successful response

    test("should successfully get specified user", async () => {
      const expectedStatusCode = 200;
      const user = {
        username: "test3",
        password: "testing",
      }
      const registerResponse = await request(server)
        .post("/api/auth/register")
        .send(user)
      
      const response = await request(server)
        .get("/api/users/1")
      expect(response.status).toEqual(expectedStatusCode);
    });

    test("should successfully delete specified user", async () => {
      const expectedStatusCode = 204;
      const user = {
        username: "test3",
        password: "testing",
      };
      const registerResponse = await request(server)
        .post("/api/auth/register")
        .send(user);
      const loginResponse = await request(server)
        .post("/api/auth/login")
        .send(user);
      const response = await request(server)
        .delete("/api/users/1")
        .set("Authorization", `Bearer ${loginResponse.body.token}`);
      expect(response.status).toEqual(expectedStatusCode);
    });

    //incorrect usage of api - unsuccessful response

    test("user not found", async () => {
      const expectedStatusCode = 404;
      const response = await request(server).get("/api/users/1");
      expect(response.status).toEqual(expectedStatusCode);
    });

    test("should error when logged in user tries to delete different user", async () => {
      const expectedStatusCode = 403;
      const clientSideError = true;
      const serverSideError = false;
      const user = {
        username: "test3",
        password: "testing",
      };
      const registerResponse = await request(server)
        .post("/api/auth/register")
        .send(user);
      const loginResponse = await request(server)
        .post("/api/auth/login")
        .send(user);
      const response = await request(server)
        .delete("/api/users/51")
        .set("Authorization", `Bearer ${loginResponse.body.token}`);
      expect(response.status).toEqual(expectedStatusCode)
      expect(response.clientError).toEqual(clientSideError);
      expect(response.serverError).toEqual(serverSideError);
      expect(response.text).toContain("User only able to edit themselves");
    });

      test("should error when user tries to delete themselves while not logged in", async () => {
        const expectedStatusCode = 403;
        const user = {
          username: "test3",
          password: "testing",
        };
         const registerResponse = await request(server)
           .post("/api/auth/register")
           .send(user);
         const loginResponse = await request(server)
           .post("/api/auth/login")
           .send(user);
         const response = await request(server)
           .delete("/api/users/1")
           .set("Authorization", `Bearer ${ " " }`);
        expect(response.status).toEqual(expectedStatusCode);
      });

      test("should error when trying to use wrong method", async () => {
        const expectedStatusCode = 404;
        const user = {
          username: "test3",
          password: "testing",
        };
        const registerResponse = await request(server)
          .post("/api/auth/register")
          .send(user);
        const loginResponse = await request(server)
          .post("/api/auth/login")
          .send(user);
        const response = await request(server)
          .post("/api/users/1")
          .set("Authorization", `Bearer ${loginResponse.body.token}`);
        expect(response.status).toEqual(expectedStatusCode);
      });
    
  });
});