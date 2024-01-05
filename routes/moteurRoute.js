const express = require('express')
const route = express.Router()
const moteurController = require('../controller/moteurController')

route.post('/create', moteurController.create)
route.put('/update/:id', moteurController.update)
route.get('/getAll', moteurController.getAll)
route.get('/get/:id', moteurController.moteurId)

module.exports = route