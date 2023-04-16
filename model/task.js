const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    Description: {
        type: String,
        required: true
    },
    Date: {
        type: Date,
        default: Date.now
    }
});

const Task = mongoose.model('Task-List', taskSchema);

module.exports = Task;