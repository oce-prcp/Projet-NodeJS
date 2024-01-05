const express = require('express')
const route = express.Router()
const optionController = require('../controller/optionController')

route.post('/create', optionController.create)
route.put('/update/:id', optionController.update)
route.get('/getAll', optionController.getAll)
route.get('/get/:id', optionController.optionId)

module.exports = route