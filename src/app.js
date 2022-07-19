const express = require('express')
const app = express()
const cors = require('cors')
const morgan =require('morgan')

require('dotenv-safe').config();

const db = require('./config/database')
const userRoutes = require('./routes/userRoutes')
const courseRoutes = require('./routes/courseRoutes')

db.connect() 
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))
app.use("/user", userRoutes)
app.use("/courses", courseRoutes)

// teste API
app.get('/', (req, res) => {
    res.status(200).json({msg: 'Teste API!'})
})

module.exports = app



