exports.up = function (knex) {
  return (
    knex.schema
      .createTable("users", (tbl) => {
        tbl.increments();
        tbl.string("username", 50).notNullable()
        tbl.string("password", 200).notNullable();
        tbl.string("firstName", 25);
        tbl.string("location", 50);
      })
      .createTable("stories", (tbl) => {
        tbl.increments();
        tbl.string("title", 100).notNullable();
        tbl.string("location", 100).notNullable();
        tbl.string("description", 2000);
        tbl.string("date", 40);
        tbl.string("image", 400);
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
