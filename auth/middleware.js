const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");
const bcrypt = require("bcryptjs");
const db = require("../story/storyDb")



const validatePostId = (req, res, next) => {
  db.getById(req.params.id)
    .then((result) => {
      if (result) {
        req.post = result;
        next();
      } else {
        res.status(400).json({ message: "invalid post id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "error connecting to database" });
   });
}

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, secrets.jwtSecret, (err, user) => {
      if (err) {
        return res.status(403).send();
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).send();
  }
}

module.exports = {
  validatePostId,
  auth
}