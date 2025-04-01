import db from "./knex-conf.js";

export async function init() {
  try {
    const exists = await db.schema.hasTable("tasks");
    if (!exists) {
      await db.schema.createTable("tasks", (table) => {
        table.string("id").primary();
        table.string("title");
        table.string("desc");
        table.string("status");
        table.string("date");
      });
      console.log("Tabela 'tasks' criada com sucesso!");
    } else {
      console.log("Tabela 'tasks' já existe.");
    }
  } catch (error) {
    console.error("Erro ao criar tabela:", error);
  }
}