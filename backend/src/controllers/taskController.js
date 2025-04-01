import express from 'express';
import {TaskCollection} from '../models/taskModel.js';
import {EntityTask} from '../models/entityModel.js';

const router = express.Router();

const taskModel = new TaskCollection();

router.get('/tasks', (req,res) => {
    taskModel.getTask(req,res);
})

router.get('/tasks/:id', (req,res) => {
    const { id } = req.params
    taskModel.getTaskById(req,res, id);
})

router.post('/tasks', (req,res) => {
    const { title, status, date, desc } = req.body;
    const task = new EntityTask(title, status, date, desc);
    taskModel.createTask(req, res, task);
})


router.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title, status, desc } = req.body; 

    const task = new EntityTask(title, status, desc); 

    taskModel.updateTask(req, res, id, task);
});


router.delete('/tasks/:id', (req,res) => {
    const { id } = req.params;
    taskModel.deleteTask(req,res, id);
})

export {router as routes}