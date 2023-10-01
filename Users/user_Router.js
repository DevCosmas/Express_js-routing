const express = require('express')
const Auth = require('../Global_middleware/middleware')
const User = require('./user_controller')
const router = express.Router()

router.use(express.json())
router.use(Auth.requestBody)

router.post('/Sign_Up', User.signUp)
module.exports = router