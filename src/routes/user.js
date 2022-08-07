const mongoose = require('mongoose')
const express = require('express')

const User = require('../models/user')

const router = express.Router()

router.post('/', (req,res) => {
    const user = new User(req.body)

    user.save().then(() => {
        res.status(201).send(user)
    }).catch((e) => {
        res.status(500).send(e)
    })
})

router.get('/', (req,res) => {
    User.find().then((users) => {
        res.send(users)
    }).catch((e) => {
        res.send(e)
    })
})

router.get('/:id', (req,res) => {
    const _id = req.params.id

    User.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    }).catch((e) => {
        res.status(500).send()
    })
})

module.exports = router