const express = require('express')
const router = express.Router()
const databaseController = require('../controller/databaseController')
const middleware = require('../middleware/middleware')

router.get('/createAllTable', middleware.checkAdmin, databaseController.createAllTable)

module.exports = router