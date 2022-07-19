const mongoose = require('mongoose')
require('dotenv').config()

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS
const MONGODB_URI = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.59ema.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

const connect = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Banco conectado (:")
    } catch (error) {
        console.error("Erro: ", error.message)
    }
}

module.exports = {
    connect
}
