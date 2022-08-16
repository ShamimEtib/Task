const request = require('supertest')
const jwt = require('jsonwebtoken')
const app = require('../src/index')
const User = require('../src/models/user')
const mongoose = require('mongoose')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Mike',
    email: 'mike@example.com',
    password: 'dfhieheuhf',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_KEY)
    }]
}

beforeEach(async () => {
    await User.deleteMany()
    await new  User(userOne).save()
})

afterAll(async () => { await mongoose.connection.close() })

test('Should return a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Shamim',
        email: 'shamim@gmail.com',
        password: 'myspahfue'
    }).expect(201)

    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    expect(response.body).toMatchObject({
        user: {
            name: 'Shamim',
            email: 'shamim@gmail.com'
        },
        token: user.tokens[0].token 
    })
    expect(user.password).not.toBe('myspahfue')
})

test('Should login existing user', async () => { 
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login existing user', async () => { 
    await request(app).post('/users/login').send({
        email: 'shamim@gmail.com',
        password: 'myspahfue'
    }).expect(400)
})

test('Should get profile for user', async () => {
    await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})

test('Should not get profile for unauthenticate user', async () => {
    await request(app)
    .get('/users/me')
    .send()
    .expect(401)
})

test('Should delete user', async () => {
    const response = await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Should not delete for unauthenticate user', async () => {
    await request(app)
    .delete('/users/me')
    .send()
    .expect(401)
})