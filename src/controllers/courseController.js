require('dotenv').config()
const courseSchema = require("../models/courseSchema")

const getAll = async (req, res) => {
    courseSchema.find(function (err, courses) {
        res.status(200).send(courses)
    }) 
  }

  module.exports = {
    getAll
}
