exports.up = function (knex) {
  return (
    knex.schema
      .createTable("users", (tbl) => {
        tbl.increments();
        tbl.string("username", 10).notNullable()
        tbl.string("password", 15).notNullable();
        tbl.string("firstName", 12);
        tbl.string("location", 20);
      })
      .createTable("stories", (tbl) => {
        tbl.increments();
        tbl.string("title", 35).notNullable();
        tbl.string("location", 35).notNullable();
        tbl.string("description", 128);
        tbl.string("date", 12);
        tbl.string("image", 20);
        tbl
          .integer("user_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("users")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
      })
  );
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("stories")
    .dropTableIfExists("users")
};
