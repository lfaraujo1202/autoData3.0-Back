const express = require("express")
const router = express.Router()
const authMiddleware = require('../middlewares/auth');

const controller = require("../controllers/projectController")

    router.get("/", authMiddleware, controller.getAll)
    
module.exports = router
