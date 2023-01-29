const express = require("express")
const router = express.Router()
const userController = require("../controller/userController")
const courceController =require("../controller/courceController")
const middleware = require("../middleware/middleware")


router.post("/createUser",userController.createUser)

router.post("/login",userController.login)

router.post("/createCource",middleware.auth,middleware.authorise,courceController.createCource)

router.put("/aproveCource",middleware.auth, courceController.aproveCource)

module.exports = router