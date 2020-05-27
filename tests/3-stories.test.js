const request = require("supertest");

const server = require("../server.js");

const db = require("../config/dbConfig");

const storyDb = require("../story/storyDb");

const userDb = require("../users/userDb");

beforeEach(async () => {
  await db("stories").truncate();
  await db("users").truncate();
});

describe("stories/router.js", () => {
  describe("/", () => {
    // correct usage of api - successful response

    test("should successfully get all stories", async () => {
      const expectedStatusCode = 200;
      const user = {
        username: "test3",
        password: "testing",
      };
      const registerResponse = await request(server)
        .post("/api/auth/register")
        .send(user);

      const response = await request(server).get("/api/stories");
      expect(response.status).toEqual(expectedStatusCode);
    });

    test("should successfully create a story", async () => {
      const expectedStatusCode = 201;
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

      const story = {
        title: "Discount Tickets",
        location: "Hong Kong",
        description:
          "I'm back! Nothing could keep me away from that tasty Dim Sum. I've got a problem...",
        image:
          "https://images.unsplash.com/photo-1559329255-2e7cb2e21ca7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
      };

      const response = await request(server)
        .post("/api/stories")
        .send(story)
        .set("Authorization", `Bearer ${loginResponse.body.token}`);
      expect(response.status).toEqual(expectedStatusCode);
    });

    //incorrect usage of api - unsuccessful response

    test("wrong address should return error", async () => {
      const expectedStatusCode = 404;
      const user = {
        username: "test3",
        password: "testing",
      };
      const registerResponse = await request(server)
        .post("/api/auth/register")
        .send(user);
      const response = await request(server).get("/api/story");
      expect(response.status).toEqual(expectedStatusCode);
    });

    test("should error when trying to create a story while not logged in", async () => {
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
      const story = {
        title: "Discount Tickets",
        location: "Hong Kong",
        description:
          "I'm back! Nothing could keep me away from that tasty Dim Sum. I've got a problem...",
        image:
          "https://images.unsplash.com/photo-1559329255-2e7cb2e21ca7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
      };
      const response = await request(server)
        .post("/api/stories")
        .send(story)
        .set("Authorization", `Bearer ${""}`);
      expect(response.status).toEqual(expectedStatusCode);
    });

    test("should error when required fields aren't filled out", async () => {
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
      const story = {
        description:
          "I'm back! Nothing could keep me away from that tasty Dim Sum. I've got a problem...",
        image:
          "https://images.unsplash.com/photo-1559329255-2e7cb2e21ca7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
      };
      const response = await request(server)
        .post("/api/stories")
        .send(story)
        .set("Authorization", `Bearer ${""}`);
      expect(response.status).toEqual(expectedStatusCode);
    });
  });

  describe("/id", () => {
    // correct usage of api - successful response

    test("should successfully get specified story", () => {
      const expectedStatusCode = 200;
      const user = {
        username: "test3",
        password: "testing",
      };
      const story = {
        title: "Discount Tickets",
        location: "Hong Kong",
        description:
          "I'm back! Nothing could keep me away from that tasty Dim Sum. I've got a problem...",
        image:
          "https://images.unsplash.com/photo-1559329255-2e7cb2e21ca7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
      };

      userDb
        .insert(user)
        .then((id) => {
          return storyDb.insert({ ...story, user_id: id[0] });
        })
        .then((storyId) => {
          return request(server).get(`/api/stories/${storyId[0]}`);
        })
        .then((response) => {
          expect(response.status).toEqual(expectedStatusCode);
        })
        .catch((err) => {
          expect(false).toEqual(true);
        });
    });
  });
});
