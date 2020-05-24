const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const docs = require("express-mongoose-docs");
const userRouter = require("./users/router.js");
const storyRouter = require("./story/router");
const authRouter = require("./auth/router")
const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
const docs = require("express-docs");
server.use("/api/users", userRouter);
server.use("/api/stories", storyRouter);
server.use("/api/auth", authRouter)

module.exports = server;
