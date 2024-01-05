const express = require('express')
const router = express.Router()
const optionController = require('../controller/optionController')

router.post('/create', optionController.create)
router.put('/update/:id', optionController.update)
router.get('/getAll', optionController.getAll)
router.get('/get/:id', optionController.optionId)

module.exports = router