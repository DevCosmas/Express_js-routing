const express = require('express')
const Auth = require('../Global_middleware/middleware')
const item_controller = require('./items.controller')
const router = express.Router()

router.use(express.json())


router.get('/items',Auth.basicAuth, item_controller.getAll)
router.get('/items/:id',Auth.basicAuth, item_controller.getOneItem)

// only user that are staff are allowed to use this resources
router.use(Auth.checkStaff)
router.post('/create_items', Auth.requestBody, item_controller.createItem)
router.patch('/update_items/:id', Auth.requestBody, item_controller.updateItem)
router.delete('/delete_item/:id', item_controller.deleteItem)
module.exports = router