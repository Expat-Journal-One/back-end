const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");
const bcrypt = require("bcryptjs");
const db = require("../story/storyDb")



const validateStoryId = (req, res, next) => {
  db.getById(req.params.id)
    .then((result) => {
      if (result) {
        req.story = result;
        next();
      } else {
        res.status(400).json({ message: "invalid story id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "error connecting to database" });
   });
}

const validateLoggedIn = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const authToken = authHeader.split(" ")[1];
    jwt.verify(authToken, secrets.jwtSecret, (err, token) => {
      if (err) {
        return res.status(403).send();
      }
      req.token = token;
      next();
    });
  } else {
    res.status(401).send();
  }
}

const validateUserEditStory = (req, res, next) => {
  if (req.token.subject !== req.story.user_id) {
    return res.status(403).json({error: "User doesn't own this story"});
  }
  next();
};

const validateUserEditSelf = (req, res, next) => {
  if (req.token.subject !== Number(req.params.id)) {
    return res.status(403).json({ error: "User only able to edit themselves" });
  }
  next();
};

module.exports = {
  validateStoryId,
  validateLoggedIn,
  validateUserEditSelf,
  validateUserEditStory
}