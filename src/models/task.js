const mongoose = require('mongoose')

const taskShema = mongoose.Schema({
    description: {type: String, required: true, trim: true},
    completed: {type: Boolean, default: false}
})

const Task = mongoose.model('Task', taskShema)

module.exports = Task
