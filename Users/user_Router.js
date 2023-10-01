const express = require('express')
const Auth = require('../Global_middleware/middleware')
const User_controller = require('./user_controller')
const router = express.Router()

router.use(express.json())
router.use(Auth.requestBody)

router.post('/Sign_Up', User_controller.createUser)
module.exports = router