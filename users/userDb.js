const db = require("../config/dbConfig");

module.exports = {
  getById,
  getUserStories,
  getByUsername,
  insert,
  remove,
};

function getById(id) {
  return db("users").where({ id }).first();
}

function getUserStories(userId) {
  return db("stories as s")
    .join("users as u", "u.id", "p.user_id")
    .select("s.id", "s.description", "u.username as postedBy", "s.title", "s.location", "s.image", "s.date")
    .where("p.user_id", userId)
}

function insert(user) {
  return db("users")
    .insert(user)
}

function getByUsername(username) {
  return db("users").where({ username }).first();
}

function remove(id) {
  return db("users").where({ id }).del();
}



