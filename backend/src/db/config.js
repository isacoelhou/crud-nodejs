const db = knex({
    client: "sqlite3",
    connection: {
      filename: path.resolve("database.sqlite"),
    },
    useNullAsDefault: true,
    pool: {
      min: 0,
      max: 1,
    },
  });