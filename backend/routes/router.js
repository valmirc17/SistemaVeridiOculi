const router = require("express").Router()

// User router
const userRouter = require("./user")

router.use("/",userRouter)

module.exports = router