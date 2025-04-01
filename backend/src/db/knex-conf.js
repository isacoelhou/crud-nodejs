import knex from "knex";
import path from "path";

const db = knex({
  client: "sqlite3",
  connection: {
    filename: path.resolve("../database.sqlite"), 
  },
  useNullAsDefault: true,
  debug: true
});

export default db;