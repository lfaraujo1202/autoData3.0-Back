const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,

    classname: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    courseimg: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('courses', courseSchema)
