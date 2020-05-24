const request = require("supertest");

const server = require("../server.js");

const db = require("../config/dbConfig");

beforeEach(async () => {
  await db("users").truncate();
});


describe("users/router.js", () => {
  describe("/id", () => {

   
    it("should successfully get specified user", async () => {
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

    it("user not found", async () => {
      const expectedStatusCode = 404;
      const response = await request(server).get("/api/users/1");
      expect(response.status).toEqual(expectedStatusCode);
    });

    it("should successfully delete specified user", async () => {
      const expectedStatusCode = 204;
      const user = {
        username: "test3",
        password: "testing",
      };
      const registerResponse = await request(server)
        .post("/api/auth/register")
        .send(user);
      const loginResponse = await request(server).post("/api/auth/login").send(user);
      console.log(loginResponse.body.token)
      const response = await request(server)
         .delete("/api/users/1")
         .set("Authorization", `Bearer ${loginResponse.body.token}`);
      expect(response.status).toEqual(expectedStatusCode);
    });
  });
});