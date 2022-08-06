const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = mongoose.Schema({
    name: {type: String, required: true, trim: true},
    email: {type: String, required: true, trim: true, lowercase: true,
        validate(value){
            if(!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {type: String, required: true, minlength: 7, trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')){
                throw new Error('Password must not contain password')
            }
        }
    },
    age: {type: Number,
        default: 18,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must not a negative value')
            }
        }    
    }
})

module.exports = mongoose.model('User', userSchema)