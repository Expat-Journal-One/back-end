const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const docs = require("express-mongoose-docs");
const authenticate = require("../auth/middleware.js");
const userRouter = require("../users/router.js");
const storyRouter = require("../story/router.js");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/users", userRouter);
server.use("/api/stories", storyRouter);
docs(app); // 2nd param is optional
module.exports = server;
