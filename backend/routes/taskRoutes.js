//import Tasks from "../models/tasks.js";
const Tasks = require("../models/tasks.js");
const express = require("express");
const Joi = require("joi");

const router = express.Router();

router.get("/", async(req, res) => {
    try {
        const tasks = await Tasks.find().sort({ date: -1 });
        res.send(tasks);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Error: " + error.message)
    }
});

router.post("/", async(req, res) => {
    try {
        const schema = Joi.object({
            task: Joi.string().min(3).max(350).required(),
            isComplete: Joi.boolean(),
            date: Joi.date()
        });
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const { task, isComplete, date } = req.body;
        let todo = new Tasks({ task, isComplete, date })

        todo = await todo.save();
        res.send(todo);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Error: " + error.message)
    }
});

router.delete("/:id", async(req, res) => {
    const task = await Tasks.findById(req.params.id);
    if (!task) {
        return res.status(404).send("Task not found")
    }

    const deleted = await Tasks.findByIdAndDelete(req.params.id)
    res.send(deleted)
})

router.put("/:id", async(req, res) => {
    const schema = Joi.object({
        task: Joi.string().min(3).max(350).required(),
        isComplete: Joi.boolean(),
        date: Joi.date()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const todo = await Tasks.findById(req.params.id);
    if (!todo) {
        return res.status(404).send("Todo Task not found ...");
    }
    const { task, author, isComplete, date, uid } = req.body

    const updated = await Tasks.findByIdAndUpdate(req.params.id, { task, author, isComplete, date, uid }, { new: true });
    res.send(updated)
})
module.exports = router