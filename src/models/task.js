const mongoose = require('mongoose')

const taskShema = mongoose.Schema({
    description: {type: String, required: true, trim: true},
    completed: {type: Boolean, default: false}
})

module.exports = mongoose.model('Task', taskShema)