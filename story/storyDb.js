const db = require("../config/dbConfig");

module.exports = {
  get,
  getById,
  insert,
  update,
  remove
};

function get() {
  return db("stories");
}

function getById(id) {
  return db("stories").where({ id }).first();
}

function insert(story) {
  return db("stories")
    .insert(story)
    .then((ids) => {
      return getById(ids[0]);
    });
}

function update(id, changes) {
  return db("stories").where({ id }).update(changes);
}

function remove(id) {
    return db("stories").where({ id }).del();
}
