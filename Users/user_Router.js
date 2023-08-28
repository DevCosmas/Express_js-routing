const express = require('express')
const Auth = require('../Global_middleware/middleware')
const User_controller = require('./user_controller')
const router = express.Router()

router.use(Auth.requestBody)
router.post('/create_user', (req, res) => {
   User_controller.createUser(req, res)
})
module.exports = router