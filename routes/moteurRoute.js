const express = require('express')
const route = express.Router()
const moteurController = require('../controller/moteurController')

route.post('/create', moteurController.create)

module.exports = route