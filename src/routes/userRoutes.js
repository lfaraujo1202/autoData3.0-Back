const express = require("express")
const router = express.Router()

const controller = require("../controllers/userController")

    router.get("/all", controller.getAll)
    router.get("/checkId/:id", controller.checkId)
    router.post("/create", controller.createUser)
    router.post('/login', controller.login)
    router.patch("/update/:id", controller.updateUserById)
    router.patch("/update/:id/:courseid", controller.updateUserByIdByCourse)
    router.delete("/delete/:id", controller.deleteUserById)


module.exports = router
