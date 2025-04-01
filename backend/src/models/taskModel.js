import { EntityTask } from "./entityModel.js";
import db from "../db/knex-conf.js";

export class TaskCollection extends EntityTask {
  constructor(id, title, status, date, desc) {
    super(id, title, status, date, desc);
    this.tasks = [];
  }

  async chargeTasks() {
    try {
      this.tasks = await db("tasks").select("*");
    } catch (error) {
      console.log(error);
    }
  }

  async findTaskById(id) {
    try {
      return await db("tasks").where({ id }).first();
    } catch (error) {
      console.log("Erro ao buscar task");
      console.log(error);
    }
  }

  async getTask(req, res) {
    try {
      await this.chargeTasks();
      if (this.tasks.length === 0) {
        res.status(404).send("Não há tarefas cadastradas");
      } else {
        res.status(200).send(this.tasks);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Erro ao buscar tarefas");
    }
  }

  async getTaskById(req, res, id) {
    try {
      const task = await this.findTaskById(id);
      if (task) {
        res.status(200).send(task);
      } else {
        res.status(404).send("Tarefa não encontrada");
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Erro ao buscar tarefa");
    }
  }

  async createTask(req, res, task) {
    try {
      await db("tasks").insert({
        id: task.id,
        title: task.title,
        status: task.status,
        desc: task.desc,
        date: task.date,
      });
      res.status(201).send(task);
    } catch (error) {
      console.log(error);
      res.status(500).send("Erro ao criar tarefa");
    }
  }


  async updateTask(req, res, id, task) {
    try {
      const updatedRows = await db("tasks")
        .where({ id })
        .update({
          title: task.title,
          status: task.status,
          desc: task.desc,
        });

      if (updatedRows) {
        res.status(200).send(task);
      } else {
        res.status(404).send("Tarefa não encontrada");
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Erro ao atualizar tarefa");
    }
  }

  async deleteTask(req, res, id) {
    try {
      const deletedRows = await db("tasks").where({ id }).del();

      if (deletedRows) {
        res.status(200).send("Tarefa excluída com sucesso");
      } else {
        res.status(404).send("Tarefa não encontrada");
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Erro ao excluir tarefa");
    }
  }
}