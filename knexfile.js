const pgConnection = process.env.DATABASE_URL || {
  database: "d5r1q2fdqr5v41", //postgres by default
  user: "epmjsnwgthszib", //postgres by default
  password: "fb8e860601eb1480a86b57ac1c6f31972b15ca60a52a57c52be0c6fc2d3cad6c", //blank by default
};

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./dev.sqlite3",
    },
    useNullAsDefault: true,
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      },
    },
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },

  production: {
    client: "pg",
    connection: pgConnection,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },
};
