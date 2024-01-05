const express = require('express')
const route = express.Router()
const databaseController = require('../controller/databaseController')

route.get('/createAllTable', databaseController.createAllTable)

module.exports = route