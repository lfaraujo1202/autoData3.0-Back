const mongoose = require('mongoose')
const courses = require('../models/courseSchema')

const userSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    currentClass: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    XP: {
        type: Number,
        required: true
    },
    Img: {
        type: String,
        required: true
    },
    progress: [
        {
            progress: {
                type: String,
            },
            description: {
                type: String,
            },
            title: {
                type: String,
            },
            courseimg: {
                type: String,
            },
            classname: {
                type: String,
            },
            level: {
                type: Number,
            },
            badge: {
                type: String,
            },
          }
    ]
})

module.exports = mongoose.model('users', userSchema)
