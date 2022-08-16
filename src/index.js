const mongoose = require('mongoose')
const express = require('express')

const userRoutes = require('./routes/user')
const taskRoutes = require('./routes/task')

const app = express()
const port = process.env.PORT

app.use(express.json())

mongoose.connect(process.env.API_KEY)

app.use('/users', userRoutes)
app.use('/tasks', taskRoutes)

module.exports = app