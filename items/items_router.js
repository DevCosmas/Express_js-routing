const express = require('express')
const Auth = require('../Global_middleware/middleware')
const item_controller = require('./items.controller')
const router = express.Router()

router.get('/get', Auth.apiKeys, item_controller.getAll)
router.get('/get/:id', Auth.basicAuth, item_controller.getOne)
router.post('/post', Auth.checkStaff, item_controller.postData)
router.patch('/patch/:id', Auth.checkStaff, item_controller.update)
router.delete('/delete/:id', Auth.basicAuth,item_controller.deleteData)
module.exports=router