const express = require('express')
const router = express.Router()
const optionController = require('../controller/optionController')
const middleware = require('../middleware/middleware')

router.post('/create', middleware.checkAdmin, optionController.create)
router.put('/update/:id', middleware.checkAdmin, optionController.update)
router.get('/getAll', middleware.authenticator, optionController.getAll)
router.get('/get/:id', middleware.authenticator, optionController.optionId)
router.delete('/delete/:id', middleware.checkAdmin, optionController.delete)

module.exports = router