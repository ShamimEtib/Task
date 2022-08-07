const express = require('express')
const mongoose = require('mongoose')

const Task = require('../models/task')

const router = express.Router()

router.post('/', (req,res) => {
    const task = new Task(req.body)

    task.save().then(() => {
        res.status(201).send(task)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

router.get('/', (req,res) => {
    Task.find().then((tasks) => {
        res.send(tasks)
    }).catch((e) => {
        res.send(e)
    })
})

router.get('/:id', (req,res) => {
    const _id = req.params.id

    Task.findById(_id).then((task) => {
        if (!task) {
            console.log(task)
            return res.status(404).send()
        }

        res.send(task)
    }).catch((e) => {
        res.status(500).send()
    })
})

module.exports = router