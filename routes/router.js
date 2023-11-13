const router = require("express").Router()

// User router
const userRouter = require("./users")

router.use("/",userRouter)

module.exports = router