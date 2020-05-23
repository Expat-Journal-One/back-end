const db = require("../config/dbConfig");

module.exports = {
  get,
  getById,
  getUserPosts,
  insert
};

function get() {
  return db("users");
}

function getById(id) {
  return db("users").where({ id }).first();
}

function getUserPosts(userId) {
  return db("posts as p")
    .join("users as u", "u.id", "p.user_id")
    .select("p.id", "p.text", "u.name as postedBy")
    .where("p.user_id", userId);
}

function remove(id) {
  return db("users").where("id", id).del();
}



