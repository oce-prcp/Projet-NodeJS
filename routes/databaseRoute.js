const express = require('express')
const router = express.Router()
const databaseController = require('../controller/databaseController')

router.get('/createAllTable', databaseController.createAllTable)

module.exports = router