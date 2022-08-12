const mongoose = require('mongoose')
const express = require('express')

const userRoutes = require('./routes/user')
const taskRoutes = require('./routes/task')
const multer = require('multer')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

const mongoURL = "mongodb+srv://task-user:task-shop@cluster0.gxakctf.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(mongoURL)
//mongoose.Promise = global.Promise

// const upload = multer({
//     dest: 'images'
// })
// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send()
// })

app.use('/users', userRoutes)
app.use('/tasks', taskRoutes)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})