const { date } = require("joi");
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 350
    },
    isComplete: Boolean,
    date: {
        type: Date,
        default: new Date()
    }
});

const Tasks = mongoose.model("Task", taskSchema);
module.exports = Tasks