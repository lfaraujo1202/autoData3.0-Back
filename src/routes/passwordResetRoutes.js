const express = require("express")
const router = express.Router()

const controller = require("../controllers/passwordResetController")

    router.post("/", controller.forgot_password)
    router.post("/:userId/:token", controller.changePassword)

module.exports = router
