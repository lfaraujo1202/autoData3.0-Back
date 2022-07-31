const express = require("express")
const router = express.Router()
const authMiddleware = require('../middlewares/auth');

const controller = require("../controllers/userController")

    router.get("/getinfoclasses", authMiddleware, controller.getAllClasses)
    router.get("/getinfousers", authMiddleware, controller.getCounteUsers)
    router.get("/getinfolevels", authMiddleware, controller.getAllProgressLevel)
    router.get("/getcourseprogress", authMiddleware, controller.getAllProgressCourses)
    router.get("/all", authMiddleware, controller.getAll)
    router.get("/checkId/:id", authMiddleware, controller.checkId)
    router.post("/create", controller.createUser)
    router.post('/login', controller.login)
    router.patch("/update/:id", authMiddleware, controller.updateUserById)
    router.patch("/update/:id/:courseid", authMiddleware, controller.updateUserByIdByCourse)
    router.delete("/delete/:id", authMiddleware, controller.deleteUserById)

module.exports = router